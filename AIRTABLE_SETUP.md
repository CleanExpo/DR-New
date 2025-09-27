# Airtable Setup Guide for Disaster Recovery CRM

## Step 1: Create Your Airtable Base

1. Go to [airtable.com](https://airtable.com) and create a new base
2. Name it "Disaster Recovery CRM" or similar
3. Delete any default tables and create the following tables:

## Step 2: Create Required Tables

### Table 1: "Leads"

Create a table called **"Leads"** with these fields:

| Field Name | Field Type | Options |
|------------|------------|---------|
| **Name** | Single line text | Required |
| **Email** | Email | Required |
| **Phone** | Phone number | Optional |
| **Property Type** | Single select | Options: Residential, Commercial, Industrial, Institutional |
| **Emergency Type** | Single select | Options: water_damage, fire_damage, mould, storm_damage, sewage, biohazard, vandalism |
| **Location** | Single line text | Required |
| **Suburb** | Single line text | Required |
| **State** | Single select | Options: QLD, NSW, VIC, WA, SA, TAS, NT, ACT |
| **Postcode** | Number | Optional |
| **Description** | Long text | Required |
| **Urgency** | Single select | Options: emergency, urgent, standard, quote_request |
| **Status** | Single select | Options: new, contacted, qualified, converted, closed |
| **Source** | Single select | Options: website, phone, referral, social_media, google_ads |
| **Estimated Value** | Currency | Optional |
| **Insurance Company** | Single line text | Optional |
| **Claim Number** | Single line text | Optional |
| **Created At** | Created time | Auto-generated |
| **Last Updated** | Last modified time | Auto-generated |

### Table 2: "Marketing Campaigns"

Create a table called **"Marketing Campaigns"** with these fields:

| Field Name | Field Type | Options |
|------------|------------|---------|
| **Campaign Name** | Single line text | Required |
| **Type** | Single select | Options: emergency_response, before_after, prevention_tips, seasonal, custom |
| **Platform** | Single select | Options: facebook, instagram, linkedin, youtube, google, email |
| **Status** | Single select | Options: draft, scheduled, active, paused, completed |
| **Content** | Long text | Required |
| **Target Audience** | Long text | Required |
| **Budget** | Currency | Optional |
| **Start Date** | Date | Required |
| **End Date** | Date | Optional |
| **Created At** | Created time | Auto-generated |
| **Performance Metrics** | Long text | Optional |

### Table 3: "Contacts"

Create a table called **"Contacts"** with these fields:

| Field Name | Field Type | Options |
|------------|------------|---------|
| **Name** | Single line text | Required |
| **Email** | Email | Required |
| **Phone** | Phone number | Optional |
| **Company** | Single line text | Optional |
| **Role** | Single line text | Optional |
| **Type** | Single select | Options: lead, customer, contractor, supplier, partner |
| **Status** | Single select | Options: active, inactive, prospect |
| **Notes** | Long text | Optional |
| **Created At** | Created time | Auto-generated |
| **Last Contact** | Date | Optional |

## Step 3: Get Your API Credentials

### Get Personal Access Token:
1. Go to [airtable.com/create/tokens](https://airtable.com/create/tokens)
2. Click "Create new token"
3. Name: "Disaster Recovery Website"
4. Scopes needed:
   - ✅ `data.records:read`
   - ✅ `data.records:write`
   - ✅ `schema.bases:read`
5. Select your base
6. Create and copy the token

### Get Base ID:
1. Go to your Airtable base
2. Click "Help" → "API documentation"
3. Copy the Base ID (starts with `app...`)

## Step 4: Update Environment Variables

Replace the placeholders in your `.env.local` file:

```bash
# Replace these values with your actual credentials
AIRTABLE_ACCESS_TOKEN=patXXXXXXXXXXXXXXXX
AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
AIRTABLE_LEADS_TABLE=Leads
AIRTABLE_CAMPAIGNS_TABLE=Marketing Campaigns
AIRTABLE_CONTACTS_TABLE=Contacts
```

## Step 5: Test the Connection

Once you've set up your Airtable base and updated the environment variables:

1. Restart your development server: `npm run dev`
2. Go to `/crm` on your website
3. Try creating a test lead through the emergency form
4. Check your Airtable base to see if the data appears

## Sample Data (Optional)

You can add some sample data to test with:

### Sample Lead:
- Name: John Smith
- Email: john@example.com
- Phone: 0412345678
- Property Type: Residential
- Emergency Type: water_damage
- Location: 123 Test Street, Hamilton QLD 4007
- Suburb: Hamilton
- State: QLD
- Postcode: 4007
- Description: Burst pipe in kitchen causing water damage
- Urgency: emergency
- Status: new
- Source: website

### Sample Campaign:
- Campaign Name: Emergency Water Damage Response
- Type: emergency_response
- Platform: facebook
- Status: active
- Content: 24/7 Emergency Water Damage Response in Brisbane
- Target Audience: Homeowners in Brisbane metro area
- Budget: 500
- Start Date: Today's date

## Troubleshooting

### Common Issues:

1. **"Invalid API key"**: Check your Personal Access Token
2. **"Base not found"**: Verify your Base ID
3. **"Table not found"**: Ensure table names match exactly (case-sensitive)
4. **"Field not found"**: Check field names match the schema above

### Testing API Connection:

You can test the API connection by going to:
`http://localhost:3000/api/airtable/leads`

This should return your leads data if everything is connected properly.

## Security Notes

- ⚠️ **NEVER commit your `.env.local` file to Git**
- ⚠️ **Keep your Personal Access Token secure**
- ⚠️ **Use environment variables for production deployment**

## Production Deployment

For Vercel deployment, add these environment variables in your Vercel dashboard:
- Settings → Environment Variables
- Add the same AIRTABLE_* variables from your `.env.local`