---
name: australian-business-validator
description: "Validate Australian phone numbers, addresses, postcodes, ABN/ACN numbers, and state/territory references. Use when reviewing any content with Australian business data."
user-invocable: true
allowed-tools: WebSearch WebFetch Read Grep Glob
context: fork
paths:
  - "**/components/**"
  - "**/app/**"
  - "content/**"
  - "data/**"
---

# Australian Business Validator

## Phone Number Formats
- 1300: `1300 XXX XXX` (10 digits total)
- 1800: `1800 XXX XXX` (10 digits total)
- Mobile: `04XX XXX XXX` (10 digits, starts with 04)
- Landline: `(0X) XXXX XXXX` (NSW=02, VIC=03, QLD=07, SA/WA/NT=08)

## Postcode Ranges
- NSW: 1000-2599, 2619-2899, 2921-2999
- VIC: 3000-3999
- QLD: 4000-4999
- SA: 5000-5799
- WA: 6000-6797
- TAS: 7000-7999
- ACT: 0200-0299, 2600-2618, 2900-2920
- NT: 0800-0899

## ABN/ACN
- ABN: 11 digits, format XX XXX XXX XXX. Verify at abr.business.gov.au
- ACN: 9 digits, format XXX XXX XXX

## Validation Checks
1. All phone numbers in valid Australian format
2. All postcodes match correct states
3. All addresses geographically accurate
4. All business numbers properly formatted
5. City/state pairings are correct (Sydney=NSW, Melbourne=VIC, Brisbane=QLD, Perth=WA, Adelaide=SA, Hobart=TAS, Canberra=ACT, Darwin=NT)
