# SendGrid DNS Configuration Setup Guide

> **Status**: Required before email campaign can proceed
> **Timeline**: 15 minutes to 48 hours (typically 1-4 hours)
> **Complexity**: Non-technical - follow steps exactly as written

---

## What You Need to Do

You need to add **4 DNS records** at the company that manages your domain registration (GoDaddy, Namecheap, Cloudflare, etc.). These records tell email systems that SendGrid is authorised to send emails on behalf of your domain.

**Domain**: `disasterrecovery.com.au`

---

## Step-by-Step Instructions

### Step 1: Log Into Your Domain Registrar

1. Open your web browser
2. Go to the website where you registered your domain:
   - **GoDaddy**: https://www.godaddy.com/
   - **Namecheap**: https://www.namecheap.com/
   - **Cloudflare**: https://dash.cloudflare.com/
   - **Other registrar**: Go to that company's website
3. Log in with your credentials (username/password or SSO)
4. Look for a link like "Dashboard", "My Account", or "Products"

### Step 2: Find DNS Management

Once logged in:

1. Look for a menu option like:
   - "DNS Management"
   - "DNS Settings"
   - "Name Servers"
   - "Domain Settings"
   - "Manage Domain"

2. Select the domain `disasterrecovery.com.au`

3. Click on **DNS Management** or similar option

You should see a list of existing DNS records (there may already be some there).

### Step 3: Add the DNS Records

You need to add **4 new records**. For each record below, click **"Add Record"** or **"New Record"** and fill in the fields:

#### Record 1: Email Routing

| Field | Value |
|-------|-------|
| Type | CNAME |
| Name/Host | em7959 |
| Points to / Value | u49942585.wl086.sendgrid.net |
| TTL | 3600 (or Auto) |

**How to fill it:**
- **Type**: Select "CNAME" from dropdown
- **Name**: Type `em7959`
- **Points to**: Type `u49942585.wl086.sendgrid.net`
- **TTL**: Leave as default or set to 3600
- Click **Save** or **Add**

---

#### Record 2: Email Signing (DKIM) - Part 1

| Field | Value |
|-------|-------|
| Type | CNAME |
| Name/Host | s1._domainkey |
| Points to / Value | s1.domainkey.u49942585.wl086.sendgrid.net |
| TTL | 3600 (or Auto) |

**How to fill it:**
- **Type**: Select "CNAME"
- **Name**: Type `s1._domainkey` (exactly as shown, including underscore)
- **Points to**: Type `s1.domainkey.u49942585.wl086.sendgrid.net`
- **TTL**: Leave as default or set to 3600
- Click **Save** or **Add**

---

#### Record 3: Email Signing (DKIM) - Part 2

| Field | Value |
|-------|-------|
| Type | CNAME |
| Name/Host | s2._domainkey |
| Points to / Value | s2.domainkey.u49942585.wl086.sendgrid.net |
| TTL | 3600 (or Auto) |

**How to fill it:**
- **Type**: Select "CNAME"
- **Name**: Type `s2._domainkey` (exactly as shown, including underscore)
- **Points to**: Type `s2.domainkey.u49942585.wl086.sendgrid.net`
- **TTL**: Leave as default or set to 3600
- Click **Save** or **Add**

---

#### Record 4: Email Authentication Policy

| Field | Value |
|-------|-------|
| Type | TXT |
| Name/Host | _dmarc |
| Value | v=DMARC1; p=none; |
| TTL | 3600 (or Auto) |

**How to fill it:**
- **Type**: Select "TXT"
- **Name**: Type `_dmarc` (exactly as shown, with underscore)
- **Value**: Type `v=DMARC1; p=none;` (exactly as shown)
- **TTL**: Leave as default or set to 3600
- Click **Save** or **Add**

---

## Verification

### How to Confirm Records Were Added

After adding all 4 records, wait **2-5 minutes** for the system to process your changes, then:

1. **In your registrar**, refresh the DNS page to verify all 4 records appear in the list
2. **In the command line** (if you're comfortable with it):

```bash
nslookup -type=CNAME em7959.disasterrecovery.com.au
nslookup -type=CNAME s1._domainkey.disasterrecovery.com.au
nslookup -type=CNAME s2._domainkey.disasterrecovery.com.au
nslookup -type=TXT _dmarc.disasterrecovery.com.au
```

Expected results should show the values you entered (above commands work on Windows, Mac, Linux).

### What You'll See in SendGrid

1. Go to https://app.sendgrid.com/settings/sender_authentication
2. Scroll to "Authenticate your domain"
3. Look for `disasterrecovery.com.au` in the list
4. Once all 4 records are configured, it should show: **"Authenticated ✓"** (may take up to 48 hours)

---

## Timeline

| Time | What to Expect |
|------|-----------------|
| **0-5 minutes** | Your registrar processes the records |
| **5-30 minutes** | Records may be checked by verification script |
| **30 minutes - 4 hours** | Most DNS providers propagate records (typical) |
| **4-24 hours** | Extended propagation for some providers |
| **24-48 hours** | Maximum propagation time (rare cases) |

**Most common**: Your records will be live within **1-4 hours**.

---

## Troubleshooting

### Records Not Appearing
- **Refresh the page** in your registrar (press F5)
- **Wait 5-10 minutes** - the system may be processing
- **Check the exact spelling** - especially underscores in `s1._domainkey` and `_dmarc`

### SendGrid Still Shows "Not Authenticated"
- **Wait 24-48 hours** - DNS propagation takes time
- **Verify all 4 records** are in your registrar's DNS settings
- **Use the verification script** to check DNS status (run `npm run email:verify-dns`)

### Can't Find DNS Settings
- **Contact your domain registrar's support** - different providers have different interfaces
- **Search their help site** for "DNS management" or "DNS settings"
- **Common registrar support sites**:
  - GoDaddy: https://www.godaddy.com/help
  - Namecheap: https://www.namecheap.com/support/
  - Cloudflare: https://support.cloudflare.com/

---

## What These Records Do

**In plain English:**

1. **em7959 (CNAME)**: Tells email systems to route emails through SendGrid's servers
2. **s1._domainkey & s2._domainkey (CNAME)**: Digitally signs emails so they're trusted and not marked as spam
3. **_dmarc (TXT)**: Sets email authentication policy (tells email systems what to do if something looks wrong)

**Why they matter**: Without these records, emails sent through SendGrid:
- ❌ May be marked as SPAM
- ❌ May be rejected entirely
- ❌ Won't show as officially from your domain
- ❌ Won't have digital signature verification

---

## Next Steps

### Once Records Are Added:

1. **Wait for propagation** (1-4 hours typically)
2. **Run verification script**:
   ```bash
   npm run email:verify-dns
   ```
   This will check if DNS records are configured correctly

3. **If verification passes** → Proceed with environment setup (see `SENDGRID_SETUP.md`)

4. **If verification fails** → Check the error message, wait longer, or contact support

---

## Support

**If you get stuck:**
1. Check the **Troubleshooting** section above
2. Review the exact DNS record values (don't add extra spaces, check underscores)
3. Wait at least 1-2 hours before assuming something is wrong (DNS propagation takes time)
4. Contact your domain registrar's support for DNS-specific questions

**Email**: support@disasterrecovery.com.au

---

## Summary

| What | Details |
|------|---------|
| **Records to add** | 4 (3 CNAME, 1 TXT) |
| **Domain** | disasterrecovery.com.au |
| **Time required** | 10-15 minutes to add records |
| **Propagation time** | 1-48 hours (typically 1-4 hours) |
| **Verification** | Check SendGrid dashboard or run `npm run email:verify-dns` |
| **Success indicator** | SendGrid shows "Authenticated ✓" for your domain |

---

**Created**: January 9, 2026
**Version**: 1.0
**Status**: Ready for implementation
