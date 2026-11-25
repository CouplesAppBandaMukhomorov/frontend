import { apiRequest } from "./client";
import type { Couple } from "./createCloud";

export interface Invitation {
  code: string;
  expires_at: string;
  status: string;
  couple_id: string;
  inviter: { id: string; display_name: string };
}

export interface InvitationPreview extends Invitation {
  couple_title: string | null;
}

export function createInvitation(): Promise<Invitation> {
  return apiRequest<Invitation>("/invitations", { method: "POST" });
}

export function getInvitation(code: string): Promise<InvitationPreview> {
  return apiRequest<InvitationPreview>(`/invitations/${encodeURIComponent(code)}`);
}

export function acceptInvitation(code: string): Promise<{ couple: Couple }> {
  return apiRequest<{ couple: Couple }>(`/invitations/${encodeURIComponent(code)}/accept`, {
    method: "POST",
  });
}
