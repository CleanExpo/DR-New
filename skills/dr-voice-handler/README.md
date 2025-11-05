# Disaster Recovery Voice Handler

Voice interaction skill for **Phill McGurk's Disaster Recovery** emergency bot.

## ⚠️ IMPORTANT - PROJECT SCOPE

**THIS IS NOT "RestoreAssist"**

This skill is ONLY for:
- **Project:** Disaster Recovery Brisbane/Ipswich/Logan
- **Business:** Phill McGurk - IICRC Master Restorer
- **Parent System:** NRPG (National Restoration Procurement Group)
- **Location:** D:\DR New

This is a bot component for the Disaster Recovery & NRPG project, NOT a standalone RestoreAssist application.

## Overview

This skill handles voice commands and interactions for Phill McGurk's Disaster Recovery emergency bot, specifically designed for disaster recovery emergency services in Brisbane, Ipswich, and Logan.

## Features

- ✅ Voice input processing
- ✅ Emergency keyword detection
- ✅ Intent classification
- ✅ Automated response generation
- ✅ Emergency routing to 1300 309 361

## Emergency Keywords Detected

- Flood/Flooding
- Water damage
- Fire/Smoke damage
- Mould/Mold
- Sewage
- Storm damage
- Emergency

## Intents Supported

1. **water_damage_emergency** - Flood, burst pipes, water intrusion
2. **fire_damage_emergency** - Fire and smoke damage
3. **mould_remediation** - Mould removal and remediation
4. **quote_request** - Pricing enquiries
5. **booking_request** - Appointment scheduling
6. **general_enquiry** - General questions

## Usage

```python
from handler import DisasterRecoveryVoiceHandler

# Initialise handler
handler = DisasterRecoveryVoiceHandler()

# Process voice input
result = handler.process_voice_input("I have flooding in my basement")

# Generate response
response = handler.generate_response(result['intent'])
print(response)
```

## Configuration

Edit `skill.json` to configure:
- Priority level
- Enabled status
- Context settings
- Service areas (Brisbane, Ipswich, Logan)

## Testing

Run the handler directly:

```bash
python handler.py
```

## Integration

This skill integrates with:
- Phill McGurk's Disaster Recovery services (NOT RestoreAssist)
- NRPG platform
- 24/7 emergency response system
- IICRC certified restoration protocols
- Brisbane/Ipswich/Logan service areas

## Service Details

- **Business:** Phill McGurk Disaster Recovery
- **Emergency:** 1300 309 361
- **Office:** 4/17 Tile St, Wacol QLD
- **Service Areas:** Brisbane, Ipswich, Logan

## Credentials

- IICRC Master Restorer
- Xactimate Master
- Hazmat Licensed
- Asbestos Assessor

---

*Created: 2025-11-05*
*Branch: bot-branch*
*Project: Disaster Recovery & NRPG (NOT RestoreAssist)*
