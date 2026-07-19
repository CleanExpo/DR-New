# Secret Rotation Status — Operator Verification Required

**Started:** 2026-02-03
**Status:** Unverified historical record; no deployment, rotation, revocation, or provider validation is established by this repository document.

## Scope and truth boundary

This file previously included literal fake CSRF values and unsupported claims that credentials had been generated, deployed, revoked, and verified. Those claims are not evidence. Credential state must be checked out of band by an authorised operator against the current provider and deployment configuration.

No credential value, fragment, or hash belongs in this file.

## Required operator actions

### 1. Supply and validate a CSRF secret

Use secure operator input. Do not generate or paste the value into documentation, shell history, source control, chat, or logs.

```bash
if [ -z "${CSRF_SECRET:-}" ]; then
  echo "CSRF_SECRET must be supplied through secure operator input" >&2
  exit 1
fi
if ! [[ "${CSRF_SECRET}" =~ ^[a-fA-F0-9]{64}$ ]]; then
  echo "CSRF_SECRET must contain exactly 64 hexadecimal characters" >&2
  exit 1
fi
export CSRF_SECRET
CSRF_SECRET=${CSRF_SECRET}
```

Non-executable documentation placeholder: `<64-hex-secret>`.

### 2. Verify Gemini credential replacement

Require old and new credentials from secure environment input and fail before network use if either is absent. Verification output must contain status only, never values or fragments.

```bash
if [ -z "${OLD_GEMINI_API_KEY:-}" ] || [ -z "${NEW_GEMINI_API_KEY:-}" ]; then
  echo "Both OLD_GEMINI_API_KEY and NEW_GEMINI_API_KEY must be set" >&2
  exit 1
fi

old_status=$(curl -sS -o /dev/null -w '%{http_code}' \
  "https://generativelanguage.googleapis.com/v1beta/models?key=${OLD_GEMINI_API_KEY}")
new_status=$(curl -sS -o /dev/null -w '%{http_code}' \
  "https://generativelanguage.googleapis.com/v1beta/models?key=${NEW_GEMINI_API_KEY}")

if [ "$old_status" != "403" ] || [ "$new_status" != "200" ]; then
  echo "Gemini revocation/replacement verification failed" >&2
  exit 1
fi
echo "Gemini credential status verified without printing values"
```

### 3. Verify Supabase credential state

An authorised operator must use the Supabase dashboard or support channel to establish current JWT/anon-key state. Record only the date, operator, provider status, and ticket/reference ID in the approved security system. Do not put credential material here.

### 4. Update deployment configuration

Provider and deployment changes are human-gated. Supply values through the deployment platform's protected secret input. Do not place values on command lines or in `.env` examples.

### 5. Verify production separately

A production smoke test, provider audit, and error-rate review are required after an authorised rotation and deployment. This repository document does not assert those actions occurred.

## Evidence checklist

- [ ] Authorised operator confirmed provider-side credential state.
- [ ] Old Gemini credential returned the expected revoked status.
- [ ] Replacement Gemini credential returned the expected active status.
- [ ] CSRF secret passed the 64-hex shape check without being printed.
- [ ] Supabase credential state was confirmed out of band.
- [ ] Deployment configuration change received explicit approval.
- [ ] Production smoke and monitoring evidence was captured outside this repository.
- [ ] No credential values, fragments, or hashes were committed.

## Current release status

**Blocked pending authorised out-of-band verification.** Do not infer that credentials are active, revoked, deployed, or production-verified from this document. Merge, deployment, provider mutation, and secret rotation remain human-gated actions.
