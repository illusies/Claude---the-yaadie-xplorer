export const ADMIN_EMAILS = new Set(
  (import.meta.env.VITE_ADMIN_EMAILS as string | undefined ?? '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)
)

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false
  return ADMIN_EMAILS.has(email.trim().toLowerCase())
}
