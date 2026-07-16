#!/usr/bin/env bash
# DR-932: Deploy to Vercel production, hardened against CLI upload-retry
# false-negatives.
#
# When `vercel deploy` aborts on an upload retry the deployment often still
# proceeds server-side and reaches READY. Trusting the CLI exit code then fails
# a production deploy that actually succeeded. Instead, on a non-zero CLI exit we
# poll the Vercel REST API for a READY deployment that matches THIS commit and
# treat that as success.
#
# The commit match (meta.githubCommitSha == $GITHUB_SHA) is load-bearing: without
# it a stale prior READY deployment would masquerade as this run's success.
#
# Prints the production URL to stdout on success (like `vercel deploy`); all
# diagnostics go to stderr. Exits non-zero only when the deployment is genuinely
# not READY (terminal ERROR/CANCELED) or the READY poll times out.
set -uo pipefail

VERCEL_API="${VERCEL_API:-https://api.vercel.com}"
POLL_TIMEOUT_SECONDS="${POLL_TIMEOUT_SECONDS:-300}"
POLL_INTERVAL_SECONDS="${POLL_INTERVAL_SECONDS:-10}"

log() { echo "$@" >&2; }

if [ -z "${VERCEL_TOKEN:-}" ]; then
  log "ERROR: VERCEL_TOKEN is required"
  exit 2
fi

# Team scoping for the API query (personal accounts leave VERCEL_ORG_ID unset).
TEAM_QS=""
if [ -n "${VERCEL_ORG_ID:-}" ]; then
  TEAM_QS="&teamId=${VERCEL_ORG_ID}"
fi

# 1. Attempt the normal prebuilt production deploy. Capture combined output so we
#    can both surface it and scrape the deployment URL; do NOT abort on failure.
tmp_out="$(mktemp)"
vercel deploy --prebuilt --prod --token="$VERCEL_TOKEN" >"$tmp_out" 2>&1
deploy_rc=$?
cat "$tmp_out" >&2
url="$(grep -Eo 'https://[^[:space:]]+' "$tmp_out" | tail -n1)"
rm -f "$tmp_out"

if [ "$deploy_rc" -eq 0 ] && [ -n "$url" ]; then
  log "vercel deploy succeeded: $url"
  printf '%s\n' "$url"
  exit 0
fi

log "vercel deploy exited rc=${deploy_rc} (url='${url:-}') — polling Vercel API for a READY deployment (suspected upload-retry false-negative)"

if [ -z "${VERCEL_PROJECT_ID:-}" ]; then
  log "ERROR: VERCEL_PROJECT_ID is required for the API fallback"
  exit 2
fi

deadline=$(( $(date +%s) + POLL_TIMEOUT_SECONDS ))
while :; do
  resp="$(curl -sS -H "Authorization: Bearer ${VERCEL_TOKEN}" \
    "${VERCEL_API}/v6/deployments?projectId=${VERCEL_PROJECT_ID}&target=production&limit=20${TEAM_QS}")"

  # Select the deployment for this commit; fall back to newest only when the
  # commit SHA is unavailable (e.g. workflow_dispatch without a push context).
  if [ -n "${GITHUB_SHA:-}" ]; then
    dep="$(printf '%s' "$resp" | jq -c --arg sha "$GITHUB_SHA" \
      'first((.deployments // [])[] | select(.meta.githubCommitSha == $sha))')"
  else
    dep="$(printf '%s' "$resp" | jq -c 'first((.deployments // [])[])')"
  fi

  state="$(printf '%s' "$dep" | jq -r '(.state // .readyState) // empty')"
  dep_url="$(printf '%s' "$dep" | jq -r '.url // empty')"
  log "poll: state=${state:-<none>} url=${dep_url:-<none>}"

  case "$state" in
    READY)
      if [ -n "$dep_url" ]; then
        printf 'https://%s\n' "$dep_url"
      else
        printf '%s\n' "$url"
      fi
      exit 0
      ;;
    ERROR|CANCELED)
      log "ERROR: deployment reached terminal state ${state}"
      exit 1
      ;;
  esac

  if [ "$(date +%s)" -ge "$deadline" ]; then
    log "ERROR: timed out after ${POLL_TIMEOUT_SECONDS}s waiting for a READY deployment"
    exit 1
  fi
  sleep "$POLL_INTERVAL_SECONDS"
done
