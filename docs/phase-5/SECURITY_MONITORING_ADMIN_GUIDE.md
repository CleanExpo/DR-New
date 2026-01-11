# Security Monitoring & Alerts Admin Guide

## Overview

The NRPG platform includes a comprehensive security monitoring system that detects suspicious activities in real-time and sends alerts to administrators. This guide explains how to monitor, analyze, and respond to security events.

## Architecture

### Components

1. **Security Monitor** - Real-time threat detection engine
2. **Alert Service** - Multi-channel alert delivery system
3. **Audit Trail** - Complete action logging system
4. **Health Check** - System health monitoring

### Detection Methods

The system monitors for:
- **Brute Force Attacks**: Multiple failed login attempts
- **Account Takeover Attempts**: Unusual access patterns
- **Suspicious File Uploads**: Dangerous file types
- **Unusual Access Patterns**: Access from new locations/devices

## Accessing the Security Dashboard

### Navigation

1. Log in as an **Administrator** account
2. Click **Dashboard** in the main menu
3. Navigate to **Admin** → **Security Monitoring**

### Dashboard Overview

The security dashboard displays:
- **Real-time Alerts**: Active security events
- **Failed Login Attempts**: 24-hour trend chart
- **Active Sessions**: Current user sessions
- **Suspicious Activity**: Flagged activities requiring review
- **System Health**: Service status overview

## Understanding Security Alerts

### Alert Types

#### 1. Brute Force Detection

**What it detects**:
- 5+ failed login attempts within 15 minutes
- Same email or IP address
- Multiple wrong password attempts

**Alert Details**:
```
Type: BRUTE_FORCE
Severity: HIGH
Email: user@example.com
IP Address: 192.168.1.100
Failed Attempts: 7
Time Window: Last 15 minutes
Action Taken: Account locked for 30 minutes
```

**Response**:
1. Review the IP address—is it a known/trusted location?
2. Contact the user to confirm it wasn't them
3. If confirmed as attack: Monitor for escalation
4. If false positive: User can reset password and try again after 30 min

#### 2. Unusual Access Detection

**What it detects**:
- Login from new location/IP (outside normal pattern)
- Access from multiple countries within short timeframe
- Device change (different browser/OS)
- Access from blacklisted countries/VPNs

**Alert Details**:
```
Type: UNUSUAL_ACCESS
Severity: MEDIUM
User: john.contractor@example.com
Previous Location: Sydney, NSW
New Location: London, UK
Time Since Last Access: 2 hours
Device: Safari on iPhone (new device)
Risk Score: 7.5/10
```

**Response**:
1. Check if user is traveling or working from a new location
2. Contact user if high-risk access is detected
3. Require password change or additional verification
4. Monitor for additional access attempts from new location

#### 3. File Upload Threat Detection

**What it detects**:
- Executable files (.exe, .bat, .cmd, .sh, .dll)
- Script files (.js, .vbs, .ps1)
- Archive files with dangerous content (.zip, .rar)
- Files with mismatched extensions (e.g., .exe renamed to .pdf)
- Files detected as malicious by VirusTotal

**Alert Details**:
```
Type: FILE_UPLOAD_BLOCKED
Severity: CRITICAL
User: user@example.com
Filename: invoice.exe
Detected Type: Windows Executable
Reason: Dangerous file type
Action Taken: File blocked and removed
```

**Response**:
1. File is automatically blocked—no manual action needed
2. If user reports legitimate file rejection:
   - Request file in alternative format
   - Verify file legitimacy before allowing
3. Monitor user for pattern of malicious uploads

#### 4. Custom Alerts

**Manual Alerts** created by administrators for custom threats:

**Alert Details**:
```
Type: CUSTOM
Severity: HIGH
Created By: admin@example.com
Reason: Suspicious account activity
Subject: Possible credential compromise
Description: Multiple API key requests within 1 hour
Affected Users: contractor-123, contractor-456
```

**Response**:
- Assigned to security team for investigation
- User account may be temporarily disabled
- Force password reset required

### Alert Severity Levels

| Severity | Response Time | Action | Escalation |
|----------|---------------|--------|------------|
| **CRITICAL** | Immediate (< 1 min) | Block action, Disable account | Security team alerted |
| **HIGH** | Urgent (< 15 min) | Require verification, Monitor | Admin notified |
| **MEDIUM** | Important (< 1 hour) | Log event, Track pattern | Admin alerted |
| **LOW** | Normal (< 24 hours) | Record, No action needed | Logged only |

## Monitoring Dashboard Metrics

### Real-time Metrics

**Active Users**
- Count of users currently logged in
- Updates every 5 seconds
- Useful for detecting mass login events

**Active Sessions**
- Total number of active user sessions
- Multi-device sessions counted separately
- Helps identify concurrent session abuse

**Messages Per Minute**
- Rate of real-time messages being sent
- Spike detection for unusual activity
- Normal range: 10-50 messages/min

**System Latency**
- Average response time for API requests
- Health indicator for system performance
- Target: < 200ms

**Error Rate**
- Percentage of failed requests
- Alerts if > 5% (anomaly)
- Helps identify service degradation

**Memory Usage**
- Server heap memory consumption
- Alert if > 80% of available memory
- Useful for capacity planning

### Historical Data

Access historical data via query parameters:

```
GET /api/analytics/realtime?format=json&timerange=24h
GET /api/analytics/realtime?format=json&timerange=7d
```

Available timeranges:
- `1h` - Last hour
- `24h` - Last 24 hours (default)
- `7d` - Last 7 days
- `30d` - Last 30 days

## Account Lockout Management

### Automatic Lockout Triggers

Accounts are automatically locked after:
- **5 failed login attempts** within **15 minutes**
- **Lockout duration**: 30 minutes
- **User notification**: Email sent when account is locked

### Lockout Reasons

```
Failed Login Attempt 1 - 2:15 PM
Failed Login Attempt 2 - 2:16 PM
Failed Login Attempt 3 - 2:17 PM
Failed Login Attempt 4 - 2:18 PM
Failed Login Attempt 5 - 2:20 PM
>>> ACCOUNT LOCKED <<<
Available again: 2:50 PM
```

### Manual Unlock

To manually unlock an account:

1. Go to **Admin** → **User Management**
2. Find the locked user
3. Click **Actions** → **Unlock Account**
4. Confirm the unlock
5. User will receive email notification
6. User can attempt login again

### Failed Login Tracking

**View failed login attempts**:

1. Go to **Admin** → **Security Monitoring** → **Failed Logins**
2. View chart of failed attempts over time
3. Click on specific bars to see details
4. Sort by:
   - Email address
   - IP address
   - Time
   - Attempt count

## Threat Investigation Workflow

### Step 1: Alert Received

1. Receive alert via:
   - Dashboard notification
   - Email (for HIGH/CRITICAL)
   - SMS (for CRITICAL, if configured)

2. Click alert to open details panel

### Step 2: Analyze Event

```
Alert: BRUTE_FORCE
Severity: HIGH
Time: 2026-01-11 14:35:22 UTC
Email: suspicious.user@example.com
IP: 203.45.67.89
Location: China (GeoIP)
ISP: China Telecom
ASN: AS4134
Failed Attempts: 8
Time Window: 12 minutes
User Agent: Chrome 120 (Windows 10)
Account Status: LOCKED
```

**Investigation Questions**:
- Is this a known/trusted user?
- Is the IP location consistent with user profile?
- Are there other recent alerts from this IP?
- Is there a pattern of similar attacks?

### Step 3: Check User Profile

Click **View User** to see:
- User's location history
- Recent login locations
- IP addresses used
- Devices used
- Account creation date
- Last login before event
- Account status (active/suspended/locked)

### Step 4: Take Action

#### Option A: False Positive (Legitimate User)

1. Click **Actions** → **Mark as False Positive**
2. Add note: "User is traveling in China this week"
3. **Unlock Account** if necessary
4. User will receive email: "Your account was temporarily locked"
5. Send user email with login link to retry

#### Option B: Confirmed Attack

1. Click **Actions** → **Disable Account**
2. Force password reset on next login
3. Notify user: "We detected unusual activity. Your password has been reset."
4. Send user password reset link via email
5. Add note: "Confirmed brute force attack from China"

#### Option C: Investigate Further

1. Click **Actions** → **Monitor Account**
2. Flag account for enhanced monitoring
3. Set notification preferences:
   - Alert on any login attempt
   - Alert on multiple logins
   - Alert on login from new IP
4. Monitor for 24-48 hours
5. Take action if pattern continues

### Step 5: Update Threat Intelligence

1. Document the incident:
   - IP address (if attack)
   - Attack type
   - Timeline
   - User impact

2. Add to blocklist if necessary:
   - Go to **Admin** → **Security** → **IP Blocklist**
   - Add IP address with reason: "Confirmed brute force attack"
   - Set duration: **24 hours** (adjustable)

3. Add to allowlist if necessary:
   - For known user locations that triggered false positives
   - Go to **Admin** → **Security** → **Trusted IPs**
   - Add user email + IP combination

## Responding to Incidents

### Incident Severity Levels

**Level 1: Low Risk**
- Single failed login attempt
- User trying from slightly different location
- Action: Log event, monitor

**Level 2: Medium Risk**
- Brute force attempt (3-4 attempts)
- Unusual access pattern
- Action: Lock account, contact user within 1 hour

**Level 3: High Risk**
- 5+ failed login attempts
- Access from impossible locations (time-wise)
- Multiple users attacked simultaneously
- Action: Immediate lock, contact user within 15 min, notify security team

**Level 4: Critical Risk**
- Confirmed account compromise
- Malware/malicious file upload
- Data breach detected
- Action: Disable account immediately, preserve evidence, escalate to security team

### Incident Response Checklist

**Immediate (< 1 hour)**
- [ ] Lock or disable affected accounts
- [ ] Contact user via phone + email
- [ ] Review user's recent activity/access logs
- [ ] Check for data exfiltration signs
- [ ] Document incident with timestamp and details

**Short-term (< 24 hours)**
- [ ] Force password reset for affected users
- [ ] Review access logs for compromise period
- [ ] Check for privilege escalation attempts
- [ ] Update security rules/blocklists
- [ ] Brief security team on incident

**Follow-up (< 7 days)**
- [ ] Monitor affected accounts for re-compromise
- [ ] Educate user on security best practices
- [ ] Update password policy if needed
- [ ] Review and improve detection rules
- [ ] Create incident report

## Configuration

### Environment Variables

```bash
# Security Monitoring
SECURITY_ALERT_EMAIL=security@disasterrecovery.com.au
FAILED_LOGIN_THRESHOLD=5                    # Failed attempts before lock
FAILED_LOGIN_WINDOW=15                      # Time window in minutes
ACCOUNT_LOCKOUT_DURATION=30                 # Duration in minutes
SUSPICIOUS_ACTIVITY_ALERT=true              # Enable/disable alerts

# Alert Channels
ALERT_EMAIL_ENABLED=true
ALERT_SMS_ENABLED=false                     # Requires Twilio config
ALERT_IN_APP_ENABLED=true

# Threat Detection
FILE_UPLOAD_SCANNING=true
VIRUS_SCAN_API_KEY=your_virustotal_key     # Optional VirusTotal integration
GEOLOCATION_BLOCKING=false                  # Block access from specific countries
BLOCKED_COUNTRIES=KP,IR                     # ISO country codes
```

### Alert Thresholds

These can be adjusted in settings:

**Brute Force**:
- Threshold: 5 failed attempts
- Time window: 15 minutes
- Lockout duration: 30 minutes

**Unusual Access**:
- Trigger: Access from new location after < 2 hours from previous location
- Distance: > 1000 km between login locations
- Impossible travel: Same user from 2 countries within 1 hour

**File Upload**:
- Block dangerous extensions: exe, bat, cmd, sh, dll, vbs, com, sys
- Scan with VirusTotal if API key configured
- Max file size: 10 MB

## Regular Maintenance

### Daily Tasks

- Review overnight alerts in morning
- Check failed login attempts trend
- Verify no critical systems down
- Check disk/memory usage

### Weekly Tasks

- Review user access logs for anomalies
- Update IP blocklist/allowlist
- Audit account lockouts (false positives?)
- Check Sentry for application errors

### Monthly Tasks

- Generate security incident report
- Review and update security policies
- Audit admin user access logs
- Test backup and disaster recovery

### Quarterly Tasks

- Review and update threat detection rules
- Conduct security awareness training
- Test incident response procedures
- Update compliance documentation

## Troubleshooting

### "Alert Service Unavailable"

**Cause**: Email/SMS service down
**Solution**:
1. Check email/SMS configuration
2. Verify API credentials are correct
3. Test email connectivity: `telnet smtp.sendgrid.net 587`
4. Verify SMS API key (if Twilio used)
5. Check firewall/network rules

### "False Positive Alerts from Known IP"

**Solution**:
1. Add IP to allowlist: **Admin** → **Security** → **Trusted IPs**
2. Add user email + IP combination
3. Set expiration (optional)
4. Future logins from this IP won't trigger alerts

### "User Locked Out, Can't Reset Password"

**Solution**:
1. Go to **Admin** → **User Management**
2. Find user and click **Unlock Account**
3. User can now login with existing password
4. Or click **Force Password Reset** to reset password

### "Not Receiving Email Alerts"

**Check**:
1. Is `SECURITY_ALERT_EMAIL` set correctly?
2. Is email in admin list?
3. Check email spam folder
4. Verify SendGrid API key is valid
5. Check email delivery logs in SendGrid dashboard

## Support & Escalation

**For security concerns**:
- Email: security@disasterrecovery.com.au
- Response time: Within 2 hours (critical), 24 hours (other)

**For technical support**:
- Email: support@disasterrecovery.com.au
- Slack: #security-monitoring (if configured)

---

**Last Updated**: January 2026
**Version**: 1.0
**Security Level**: CONFIDENTIAL (Admin Only)
