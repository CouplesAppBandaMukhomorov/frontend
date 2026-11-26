const CURRENT_EMAIL_KEY = "current_user_email";

function normalizedEmail(email: string): string {
  return email.trim().toLowerCase();
}

function nameKey(email: string): string {
  return `display_name:${email}`;
}

export function selectCurrentUser(email: string): void {
  localStorage.setItem(CURRENT_EMAIL_KEY, normalizedEmail(email));
}

export function rememberRegisteredUser(email: string, displayName: string): void {
  const normalized = normalizedEmail(email);
  localStorage.setItem(CURRENT_EMAIL_KEY, normalized);
  localStorage.setItem(nameKey(normalized), displayName.trim());
}

export function getRememberedDisplayName(): string | null {
  const email = localStorage.getItem(CURRENT_EMAIL_KEY);
  return email ? localStorage.getItem(nameKey(email)) : null;
}
