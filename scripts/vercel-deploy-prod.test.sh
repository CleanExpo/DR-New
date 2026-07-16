#!/usr/bin/env bash
# DR-932: behaviour tests for scripts/vercel-deploy-prod.sh.
#
# Stubs `vercel` and `curl` on PATH so no network/credentials are touched, then
# asserts each branch of the deploy-with-READY-poll fallback. Run: bash this file.
set -uo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
SUT="${HERE}/vercel-deploy-prod.sh"
PASS=0
FAIL=0

# Build a throwaway PATH with stub `vercel` + `curl` driven by env vars.
make_stubs() {
  STUB_DIR="$(mktemp -d)"
  cat >"${STUB_DIR}/vercel" <<'EOF'
#!/usr/bin/env bash
[ -n "${VERCEL_STUB_STDOUT:-}" ] && printf '%s\n' "$VERCEL_STUB_STDOUT"
[ -n "${VERCEL_STUB_STDERR:-}" ] && printf '%s\n' "$VERCEL_STUB_STDERR" >&2
exit "${VERCEL_STUB_RC:-0}"
EOF
  cat >"${STUB_DIR}/curl" <<'EOF'
#!/usr/bin/env bash
# Ignore all args; emit the canned API response.
printf '%s' "${CURL_STUB_RESPONSE:-}"
exit 0
EOF
  chmod +x "${STUB_DIR}/vercel" "${STUB_DIR}/curl"
}

run_sut() {
  # Runs the SUT with stubs first on PATH; captures stdout + rc.
  OUT="$(PATH="${STUB_DIR}:${PATH}" bash "$SUT" 2>/dev/null)"
  RC=$?
}

check() {
  local name="$1" cond="$2"
  if [ "$cond" = "1" ]; then
    echo "PASS: $name"
    PASS=$((PASS + 1))
  else
    echo "FAIL: $name (rc=${RC:-?} out='${OUT:-}')"
    FAIL=$((FAIL + 1))
  fi
}

# --- Scenario 1: CLI succeeds → trust it, no API poll ------------------------
make_stubs
export VERCEL_TOKEN=tok VERCEL_PROJECT_ID=prj GITHUB_SHA=sha123
export VERCEL_STUB_RC=0 VERCEL_STUB_STDOUT="https://dr-nrpg-good.vercel.app"
unset CURL_STUB_RESPONSE 2>/dev/null || true
run_sut
check "CLI success returns its URL, rc 0" \
  "$([ "$RC" -eq 0 ] && [ "$OUT" = "https://dr-nrpg-good.vercel.app" ] && echo 1 || echo 0)"

# --- Scenario 2: CLI upload-abort false-negative, API READY for our SHA ------
make_stubs
export VERCEL_TOKEN=tok VERCEL_PROJECT_ID=prj GITHUB_SHA=sha123
export VERCEL_STUB_RC=1 VERCEL_STUB_STDOUT="" VERCEL_STUB_STDERR="Error: aborting upload retry"
export POLL_TIMEOUT_SECONDS=2 POLL_INTERVAL_SECONDS=1
export CURL_STUB_RESPONSE='{"deployments":[{"uid":"d1","url":"dr-nrpg-poll.vercel.app","state":"READY","meta":{"githubCommitSha":"sha123"}}]}'
run_sut
check "CLI fail + API READY(our sha) succeeds with API url, rc 0" \
  "$([ "$RC" -eq 0 ] && [ "$OUT" = "https://dr-nrpg-poll.vercel.app" ] && echo 1 || echo 0)"

# --- Scenario 3: CLI abort, deployment terminal ERROR → fail fast ------------
make_stubs
export VERCEL_TOKEN=tok VERCEL_PROJECT_ID=prj GITHUB_SHA=sha123
export VERCEL_STUB_RC=1 VERCEL_STUB_STDOUT=""
export POLL_TIMEOUT_SECONDS=5 POLL_INTERVAL_SECONDS=1
export CURL_STUB_RESPONSE='{"deployments":[{"uid":"d1","url":"x.vercel.app","state":"ERROR","meta":{"githubCommitSha":"sha123"}}]}'
run_sut
check "CLI fail + API ERROR fails, rc 1" \
  "$([ "$RC" -eq 1 ] && echo 1 || echo 0)"

# --- Scenario 4: CLI abort, only a DIFFERENT commit is READY → no false pass -
make_stubs
export VERCEL_TOKEN=tok VERCEL_PROJECT_ID=prj GITHUB_SHA=sha123
export VERCEL_STUB_RC=1 VERCEL_STUB_STDOUT=""
export POLL_TIMEOUT_SECONDS=1 POLL_INTERVAL_SECONDS=1
export CURL_STUB_RESPONSE='{"deployments":[{"uid":"old","url":"stale.vercel.app","state":"READY","meta":{"githubCommitSha":"OTHERSHA"}}]}'
run_sut
check "CLI fail + READY only for a different sha times out, rc 1 (no false success)" \
  "$([ "$RC" -eq 1 ] && [ -z "$OUT" ] && echo 1 || echo 0)"

echo "-----"
echo "PASS=${PASS} FAIL=${FAIL}"
[ "$FAIL" -eq 0 ]
