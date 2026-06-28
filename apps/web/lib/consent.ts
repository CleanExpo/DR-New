/**
 * Consent versioning (DR-881).
 *
 * Bump CURRENT_CONSENT_VERSION whenever the Terms of Service (/terms) or
 * Privacy Policy (/privacy) change in a way that requires re-consent. The
 * value recorded on User.consentVersion is server-authoritative — the client
 * only signals that the box was ticked; the server stamps the version and time.
 *
 * Format: ISO date of the terms revision the user accepted.
 */
export const CURRENT_CONSENT_VERSION = '2026-06-28';
