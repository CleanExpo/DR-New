# Two-Factor Authentication (2FA) User Guide

## Overview

Two-Factor Authentication (2FA) adds an extra layer of security to your NRPG account by requiring two forms of identification to log in: your password and a unique code from your phone.

## Why 2FA?

2FA protects your account from:
- **Credential Theft**: Even if someone obtains your password, they can't access your account without the second factor
- **Phishing Attacks**: Attackers can't gain access with stolen credentials alone
- **Account Takeover**: Two separate authentication methods make your account significantly more secure

## Supported 2FA Methods

### 1. Time-based One-Time Password (TOTP)

**What is TOTP?**
- TOTP generates a new 6-digit code every 30 seconds
- Works with authenticator apps on your phone
- No internet required—codes are generated locally on your device

**Recommended Authenticator Apps**:
- Google Authenticator (iOS/Android)
- Microsoft Authenticator (iOS/Android)
- Authy (iOS/Android)
- 1Password (iOS/Android)
- LastPass Authenticator (iOS/Android)

### 2. Backup Codes

**What are Backup Codes?**
- 10 emergency codes provided during 2FA setup
- Each code can be used once to log in if you lose access to your authenticator app
- Formatted as: `XXXX-XXXX-XXXX`

**When to Use Backup Codes**:
- You've lost your phone
- Your authenticator app is uninstalled
- You can't access your authenticator app temporarily

## Setting Up 2FA

### Step 1: Access Security Settings

1. Log in to your NRPG account
2. Navigate to **Dashboard** → **Settings** → **Security**
3. Scroll to the **Two-Factor Authentication** section
4. Click **Enable 2FA**

### Step 2: Choose Your Authenticator App

1. Open your authenticator app of choice:
   - Google Authenticator
   - Microsoft Authenticator
   - Authy
   - Or another TOTP-compatible app

2. Look for the option to **add a new account** or **scan QR code**

### Step 3: Scan the QR Code

1. On the security settings page, you'll see a **QR code**
2. In your authenticator app, tap **Scan QR Code**
3. Point your phone's camera at the QR code
4. The app will automatically add your NRPG account

**Can't scan the QR code?**
- Click **Can't scan?** or **Enter manually**
- Copy the manual entry key displayed
- In your authenticator app, select "Enter setup key"
- Paste the manual entry key
- Ensure the authenticator type is set to **Time-based (TOTP)**
- Time step: **30 seconds**
- Digits: **6**

### Step 4: Verify Your Setup

1. In your authenticator app, find your NRPG account
2. Note the 6-digit code currently displayed
3. On the security settings page, enter this code in the verification field
4. Click **Verify & Enable 2FA**

### Step 5: Save Your Backup Codes

1. After verification, you'll see **10 backup codes**
2. **Important**: Save these codes in a safe place:
   - Write them down and store in a safe
   - Save them in a password manager
   - Store a photo in your secure cloud storage
   - Do NOT share these codes with anyone

3. Confirm you've saved the codes by checking the acknowledgment box
4. Click **Complete Setup**

**Congratulations!** Your 2FA is now enabled.

## Logging In With 2FA

### First Time Login

1. Go to the NRPG login page
2. Enter your email address
3. Enter your password
4. You'll be redirected to the **2FA Verification** page
5. Open your authenticator app
6. Find your NRPG account and note the 6-digit code
7. Enter the code in the verification field
8. Click **Verify**

### Using Backup Codes Instead

If you don't have access to your authenticator app:

1. At the 2FA verification page, click **"Use a backup code instead"**
2. Enter one of your 10 backup codes
3. Click **Verify**
4. The code will be marked as used and cannot be reused

## Managing Your 2FA

### Disable 2FA

**If you need to disable 2FA**:

1. Go to **Dashboard** → **Settings** → **Security**
2. Scroll to **Two-Factor Authentication**
3. Click **Disable 2FA**
4. You'll be asked to confirm your password
5. Click **Confirm Disable**

**Note**: Disabling 2FA reduces your account security. We recommend keeping it enabled.

### View Remaining Backup Codes

1. Go to **Dashboard** → **Settings** → **Security**
2. Under **Two-Factor Authentication**, click **View Backup Codes**
3. Enter your password to confirm
4. Your remaining backup codes will be displayed

### Regenerate Backup Codes

If you're running low on backup codes or believe they've been compromised:

1. Go to **Dashboard** → **Settings** → **Security**
2. Click **Regenerate Backup Codes**
3. You'll receive 10 new codes
4. Old codes will no longer work
5. Save these new codes in your secure location

## Troubleshooting

### "Invalid Code" Error

**The code expired**
- TOTP codes are only valid for 30 seconds
- If the code expires while you're entering it, wait for a new code to generate
- Try again with the new code

**Clock Sync Issues**
- Your phone's clock must be in sync with internet time
- On your authenticator app's phone:
  - Go to **Settings** → **Date & Time**
  - Enable **Automatic date & time**
  - Verify the current time is correct

**Wrong App Selected**
- Ensure you're using the correct authenticator app
- If you have multiple accounts, verify you're looking at the NRPG account

### Lost Your Authenticator App

1. You can still log in using a **backup code**
2. Once logged in, go to **Dashboard** → **Settings** → **Security**
3. **Disable 2FA** to set it up again
4. Set up 2FA again with your new authenticator app

### Lost All Backup Codes

1. If you lose all backup codes and can't access your authenticator:
   - Contact NRPG support at support@disasterrecovery.com.au
   - Provide verification of your identity
   - We can help you regain access to your account

### "Setup Key Invalid" Error

- Ensure you copied the entire key correctly
- No spaces should be included
- The setup key is case-insensitive but be careful with similar characters (0 vs O, 1 vs l)
- Try scanning the QR code again instead of manually entering the key

## Best Practices for 2FA Security

✅ **DO**:
- Keep your backup codes in a secure location
- Use a strong, unique password in addition to 2FA
- Keep your authenticator app up to date
- Verify your phone's clock is accurate
- Save backup codes in multiple locations

❌ **DON'T**:
- Share your 2FA backup codes with anyone
- Take screenshots of your QR code (scan it instead)
- Write down the setup key where others can see it
- Disable 2FA unless absolutely necessary
- Use the same backup codes across multiple accounts

## Security Questions

**Q: What if someone has my backup codes?**
- Backup codes can only be used at the 2FA verification page
- They cannot be used to change your password or account settings
- Each code can only be used once
- If you believe your backup codes are compromised, regenerate them immediately

**Q: Can I use 2FA on multiple devices?**
- Yes! You can use the same authenticator account on multiple phones
- Add your NRPG account to your primary phone and a backup phone
- This way, you'll have 2FA access even if one phone is unavailable

**Q: What if I change my phone?**
- Before switching phones, save your backup codes
- On your new phone, install an authenticator app
- Go to **Dashboard** → **Settings** → **Security**
- Click **Regenerate 2FA Setup** (or disable and re-enable 2FA)
- Add your NRPG account to the new phone's authenticator

**Q: Is 2FA required?**
- No, 2FA is optional but highly recommended
- We encourage all users, especially contractors and administrators, to enable it

## Support

**For technical issues with 2FA**:
- Email: support@disasterrecovery.com.au
- Response time: Within 24 hours (business days)
- Include: Your account email and a description of the issue

**For account access issues**:
- If you're locked out of your account, contact support with verification of your identity
- We can help you regain access through a secure verification process

---

**Last Updated**: January 2026
**Version**: 1.0
