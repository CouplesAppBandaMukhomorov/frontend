import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Outlet, useLocation } from "react-router";
import { Alert, Button, Flex, Spin } from "antd";
import { ApiError, getCloudError } from "../api/client";
import { getMyCouple } from "../api/createCloud";

type CheckStatus = "loading" | "available" | "hasCouple" | "unauthorized" | "error";

interface CheckResult {
  path: string;
  status: CheckStatus;
  error?: string;
}

const NoCoupleGuard = () => {
  const { t } = useTranslation("cloud");
  const location = useLocation();
  const path = location.pathname + location.search;
  const [retry, setRetry] = useState(0);
  const [result, setResult] = useState<CheckResult>({ path: "", status: "loading" });

  useEffect(() => {
    let active = true;

    getMyCouple().then(
      () => {
        if (active) setResult({ path, status: "hasCouple" });
      },
      (error: unknown) => {
        if (!active) return;
        if (error instanceof ApiError && error.status === 404 && error.code === "couple_not_found") {
          setResult({ path, status: "available" });
        } else if (error instanceof ApiError && error.status === 401) {
          setResult({ path, status: "unauthorized" });
        } else {
          setResult({ path, status: "error", error: getCloudError(error) });
        }
      },
    );

    return () => { active = false; };
  }, [path, retry]);

  if (result.path !== path || result.status === "loading") {
    return <Flex align="center" justify="center" style={{ minHeight: "100vh" }}><Spin size="large" /></Flex>;
  }

  if (result.status === "hasCouple") return <Navigate to="/" replace />;
  if (result.status === "unauthorized") {
    return <Navigate to={`/login?next=${encodeURIComponent(path)}`} replace />;
  }
  if (result.status === "available") return <Outlet />;

  return (
    <Flex vertical align="center" justify="center" gap={16} style={{ minHeight: "100vh", padding: 24 }}>
      <Alert type="error" showIcon message={result.error} />
      <Button onClick={() => {
        setResult({ path, status: "loading" });
        setRetry(value => value + 1);
      }}>{t("actions.retryCheck")}</Button>
    </Flex>
  );
};

export default NoCoupleGuard;
