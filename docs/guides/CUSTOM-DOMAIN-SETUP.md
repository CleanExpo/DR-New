# Custom Domain Setup — nrpg.com.au

Step-by-step guide for connecting `nrpg.com.au` to the Disaster Recovery NRPG Vercel deployment.

## Prerequisites

- Domain registrar access for `nrpg.com.au` (e.g. VentraIP, Crazy Domains, Namecheap)
- Vercel project admin access (disaster-recovery-seven.vercel.app)
- DNS changes take 5 minutes to 48 hours to propagate

## Step 1: Add Domain in Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select the **disaster-recovery** project
3. Navigate to **Settings** > **Domains**
4. Click **Add Domain**
5. Enter `nrpg.com.au`
6. Vercel will show the required DNS records. Keep this page open.

## Step 2: Configure DNS Records

Log in to your domain registrar and set the following DNS records for `nrpg.com.au`:

### Option A: Apex Domain (nrpg.com.au)

| Type  | Host/Name | Value               | TTL  |
|-------|-----------|---------------------|------|
| A     | @         | 76.76.21.21         | 3600 |

> **Note**: The `A` record IP `76.76.21.21` is Vercel's global anycast IP.

### Option B: www Subdomain (www.nrpg.com.au)

| Type  | Host/Name | Value                | TTL  |
|-------|-----------|----------------------|------|
| CNAME | www       | cname.vercel-dns.com | 3600 |

### Recommended: Set Up Both

Configure both the apex domain and `www` subdomain. Vercel automatically redirects one to the other (configurable in dashboard).

| Type  | Host/Name | Value                | TTL  |
|-------|-----------|----------------------|------|
| A     | @         | 76.76.21.21          | 3600 |
| CNAME | www       | cname.vercel-dns.com | 3600 |

## Step 3: Remove Conflicting Records

Before adding the new records, remove any existing:

- A records pointing to other IPs for `@`
- CNAME records for `www` pointing elsewhere
- Any AAAA records for `@` (unless Vercel requests them)

**Do NOT remove**: MX records (email), TXT records (SPF/DKIM/DMARC), NS records.

## Step 4: Verify in Vercel

1. Return to Vercel **Settings** > **Domains**
2. Vercel will automatically check DNS propagation
3. Status should change from "Pending" to "Valid Configuration"
4. Vercel automatically provisions an SSL certificate via Let's Encrypt

### Verification Checklist

- [ ] Domain shows "Valid Configuration" in Vercel
- [ ] SSL certificate is provisioned (padlock icon)
- [ ] `https://nrpg.com.au` loads the site
- [ ] `https://www.nrpg.com.au` redirects correctly
- [ ] No mixed content warnings in browser

## Step 5: Configure Primary Domain

1. In Vercel **Settings** > **Domains**, set `nrpg.com.au` as the **Primary Domain**
2. This ensures `www.nrpg.com.au` and `disaster-recovery-seven.vercel.app` both redirect to `nrpg.com.au`

## Step 6: Update Environment Variables

Update any environment variables that reference the old domain:

```
NEXTAUTH_URL=https://nrpg.com.au
NEXT_PUBLIC_APP_URL=https://nrpg.com.au
```

These can be updated in Vercel **Settings** > **Environment Variables**.

## Step 7: Update OAuth Redirect URIs

If using Google OAuth or other social login:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** > **Credentials**
3. Edit the OAuth 2.0 Client ID
4. Add `https://nrpg.com.au/api/auth/callback/google` to Authorised redirect URIs
5. Keep the old Vercel URL as a fallback during transition

## Troubleshooting

### DNS not propagating

```bash
# Check current DNS resolution
dig nrpg.com.au A
dig www.nrpg.com.au CNAME

# Check from Google DNS
dig @8.8.8.8 nrpg.com.au A
```

Use [dnschecker.org](https://dnschecker.org) to verify global propagation.

### SSL certificate not provisioning

- Ensure no CAA records are blocking Let's Encrypt
- Check that DNS records are correct
- Wait up to 24 hours for propagation
- In Vercel, try removing and re-adding the domain

### Domain shows "Invalid Configuration"

- Double-check the A record IP: `76.76.21.21`
- Ensure no conflicting A records exist
- If using Cloudflare as DNS, set the proxy to **DNS only** (grey cloud), not proxied (orange cloud)

## Timeline

| Step | Duration |
|------|----------|
| Vercel domain config | 5 minutes |
| DNS record changes | 10 minutes |
| DNS propagation | 5 min - 48 hours |
| SSL provisioning | Automatic (minutes) |
| OAuth updates | 10 minutes |

## Contact

For domain registrar issues, contact the registrar support.
For Vercel deployment issues, contact support@disasterrecovery.com.au.
