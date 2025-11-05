# Claude Skills Configuration for Bot Building

**⚠️ PROJECT: Disaster Recovery & NRPG (NOT RestoreAssist)**

This file defines the Claude skills and agents to be used during the bot development stage for **Phill McGurk's Disaster Recovery** business in Brisbane/Ipswich/Logan.

## Purpose
Configure efficient skill usage for bot building tasks specific to Disaster Recovery & NRPG project to avoid random, unfocused work.

## Project Context

- **Project Name:** Disaster Recovery Brisbane/Ipswich/Logan
- **Business:** Phill McGurk - IICRC & RAI Master Restorer
- **Parent System:** NRPG (National Restoration Procurement Group)
- **Location:** D:\DR New
- **Branch:** bot-branch

**THIS IS NOT A SEPARATE "RestoreAssist" PROJECT**

## Available Skills for Bot Development

### 1. Disaster Recovery Voice Handler
**Location:** `/skills/dr-voice-handler/`
**Purpose:** Voice interaction processing for emergency disaster recovery calls for Phill McGurk's business
**Capabilities:**
- Voice recognition and transcription
- Emergency keyword detection (flood, fire, mould, sewage, storm)
- Intent classification
- Automated response generation
- Emergency routing to 1300 309 361

**Status:** ✅ Initialised (2025-11-05)
**Project:** Disaster Recovery & NRPG ONLY

## Usage Guidelines

1. **Focus Area**: Bot building and automation for Disaster Recovery business
2. **Business Context**: Phill McGurk's disaster recovery services
3. **Service Areas**: Brisbane, Ipswich, Logan
4. **Primary Goals**:
   - Efficient task execution for DR business
   - Consistent bot behavior aligned with DR brand
   - Proper skill allocation for emergency services
   - Emergency response prioritisation (1300 309 361)

## Configured Skills

### Disaster Recovery Voice Handler
- **Type:** Voice interaction skill
- **Priority:** High
- **Context:** Disaster recovery emergency services for Phill McGurk
- **Service Areas:** Brisbane, Ipswich, Logan
- **Emergency Contact:** 1300 309 361
- **Emergency Detection:** Flood, fire, mould, sewage, storm keywords
- **Routing:** Connects to Phill McGurk's emergency team
- **Credentials Context:** IICRC Master | RAI Master | Xactimate Master | Hazmat Licensed | Asbestos Assessor

## Skill Structure

```
skills/
└── dr-voice-handler/                    (Disaster Recovery, NOT RestoreAssist)
    ├── skill.json          # Configuration
    ├── handler.py          # Main Python handler (DisasterRecoveryVoiceHandler)
    ├── README.md           # Documentation
    └── requirements.txt    # Dependencies
```

## Next Skills to Add

<!-- User will provide additional skills as needed -->
<!-- All skills must be for Disaster Recovery & NRPG project ONLY -->

---

*Last Updated: 2025-11-05*
*Branch: bot-branch*
*Project: Disaster Recovery & NRPG*
*Skills: 1 active (Disaster Recovery Voice Handler)*
*⚠️ NOT for RestoreAssist - Only for Disaster Recovery business*
