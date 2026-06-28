/**
 * Server-only SHA-256 hashing for the ICA canonical text (DR-885).
 *
 * Kept separate from `./ica` so the content/data module stays client-safe.
 * Import this only from server code (API routes, server actions).
 */
import { createHash } from 'crypto';
import { getIcaCanonicalText } from './ica';

/** SHA-256 hex digest of the canonical ICA text. Stored on each acceptance row. */
export function getIcaDocumentHash(): string {
  return createHash('sha256').update(getIcaCanonicalText(), 'utf8').digest('hex');
}
