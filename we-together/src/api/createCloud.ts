import { apiRequest } from "./client";

export type CoupleRole = "creator" | "invitee";

export interface Couple {
  id: string;
  title: string;
  together_since: string;
  wedding_date: string | null;
  timezone: string;
  days_together: number | null;
  my_role: CoupleRole;
  members: { id: string; display_name: string; role: CoupleRole }[];
}

export interface CreateCloudSettings {
  title: string;
  together_since: string;
  wedding_date?: string;
  timezone: string;
}

export function createCloud(settings: CreateCloudSettings): Promise<Couple> {
  return apiRequest<Couple>("/couples", {
    method: "POST",
    body: JSON.stringify(settings),
  });
}

export function getMyCouple(): Promise<Couple> {
  return apiRequest<Couple>("/couples/me");
}
