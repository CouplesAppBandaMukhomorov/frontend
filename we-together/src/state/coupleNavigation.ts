import type { Couple, CoupleRole } from "../api/createCloud";

export type CouplePreview = Pick<Couple, "my_role" | "members"> &
  Partial<Pick<Couple, "days_together">>;

export type CoupleNavigationState = {
  role?: CoupleRole;
  members?: Couple["members"];
  daysTogether?: number | null;
  displayName?: string;
};

export function getCouplePreview(state: unknown): CouplePreview | undefined {
  if (!state || typeof state !== "object") return undefined;

  const { role, members, daysTogether } = state as CoupleNavigationState;
  if (role !== "creator" && role !== "invitee") return undefined;

  return {
    my_role: role,
    members: Array.isArray(members) ? members : [],
    days_together: typeof daysTogether === "number" ? daysTogether : null,
  };
}
