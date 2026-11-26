import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router";
import { Alert, Button, Flex, Spin } from "antd";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import { ApiError, getCloudError } from "../../api/client";
import { getMyCouple } from "../../api/createCloud";
import type { Couple } from "../../api/createCloud";
import { filledButton } from "../../styles/components-styles/button.css";
import { page } from "../../styles/components-styles/background.css";
import Background from "../Background";
import Footer from "../Footer";

type HomeState =
  | { status: "loading" }
  | { status: "ready"; couple: Couple }
  | { status: "noCouple" }
  | { status: "unauthorized" }
  | { status: "error"; message: string };

type CoupleHomeProps = {
  section?: "home" | "calendar" | "products";
};

const CoupleHome = ({ section = "home" }: CoupleHomeProps) => {
  const { t } = useTranslation("cloud");
  const [state, setState] = useState<HomeState>({ status: "loading" });
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let active = true;

    getMyCouple().then(
      couple => {
        if (active) setState({ status: "ready", couple });
      },
      (error: unknown) => {
        if (!active) return;
        if (error instanceof ApiError && error.status === 404 && error.code === "couple_not_found") {
          setState({ status: "noCouple" });
        } else if (error instanceof ApiError && error.status === 401) {
          setState({ status: "unauthorized" });
        } else {
          setState({ status: "error", message: getCloudError(error) });
        }
      },
    );

    return () => { active = false; };
  }, [retry]);

  if (state.status === "noCouple") return <Navigate to="/cloud/actions" replace />;
  if (state.status === "unauthorized") return <Navigate to="/login" replace />;

  if (state.status === "loading") {
    return <Flex align="center" justify="center" style={{ minHeight: "100vh" }}><Spin size="large" /></Flex>;
  }

  if (state.status === "error") {
    return (
      <Flex vertical align="center" justify="center" gap={16} style={{ minHeight: "100vh", padding: 24 }}>
        <Alert type="error" showIcon message={state.message} />
        <Button className={filledButton} onClick={() => {
          setState({ status: "loading" });
          setRetry(value => value + 1);
        }}>{t("home.retry")}</Button>
      </Flex>
    );
  }

  const { couple } = state;
  const [first, second] = couple.members;

  return (
    <div className={page}>
      <Background page={couple.my_role} />
      <Flex vertical align="center" justify="center" gap={16} style={{ minHeight: "100vh", padding: "24px 16px 96px", textAlign: "center" }}>
        {section === "home" ? (
          <>
            <Title level={1} style={{ margin: 0, fontSize: 28 }}>
              {second
                ? t("home.greetingTwo", { first: first.display_name, second: second.display_name })
                : first
                  ? t("home.greetingOne", { first: first.display_name })
                  : t("home.greeting")}
            </Title>
            {second && typeof couple.days_together === "number" && (
              <Text style={{ fontSize: 20 }}>{t("home.daysTogether", { count: couple.days_together })}</Text>
            )}
          </>
        ) : (
          <Title level={1} style={{ margin: 0, fontSize: 28 }}>
            {t(section === "calendar" ? "home.calendarTitle" : "home.productsTitle")}
          </Title>
        )}
      </Flex>
      <Footer role={couple.my_role} displayName={couple.members.find(member => member.role === couple.my_role)?.display_name} members={couple.members} withNavigation />
    </div>
  );
};

export default CoupleHome;
