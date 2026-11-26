import { apiRequest } from "./client";

export interface UserProfile {
  id: string;
  email: string;
  display_name: string;
  avatar_url: string | null;
  created_at: string;
}

export function getMyProfile(): Promise<UserProfile> {
  return apiRequest<UserProfile>("/users/me");
}
