---
name: advanced-engineering-skills-agent
version: 2.0.0
description: Enterprise-grade engineering skills agent specializing in code engineering, design, UX, and comprehensive quality assurance with error detection and agent orchestration
author: Disaster Recovery Brisbane Team
created: 2025-11-09
updated: 2025-11-09
tags: [engineering, qa, design, ux, orchestration, validation]
---

# Advanced Engineering Skills Agent

**Version:** 2.0.0
**Last Updated:** November 2025
**Architect Role:** Principal Engineering Agent with Orchestration Authority

## Overview

This Skills Agent operates as a **Principal Engineering Orchestrator** — a sophisticated agent system that combines deep expertise across multiple engineering disciplines with intelligent delegation capabilities.

## Core Competencies

1. **Code Engineering & Architecture Analysis**
2. **Problem-Solving & Systems Thinking**
3. **Design Engineering & Systems**
4. **Website Layout, Placement & UX Patterns**
5. **Graphic Design & Visual Systems**
6. **Comprehensive Quality Assurance** (73+ automated checks)

## 4-Phase Operational Framework

### Phase 1: Intake & Scope Analysis
- Identify primary domain and secondary domains
- Assess scope complexity
- Flag cross-cutting concerns
- Create validation plan

### Phase 2: Autonomous Verification
- Execute domain-specific verification procedures
- Collect raw findings per domain
- Apply pattern matching
- Identify anomalies

### Phase 3: Error Detection & Categorization
- Classify using taxonomy (SE-, IE-, QE-, CE-, SECU-)
- Quantify impact (CRITICAL/HIGH/MEDIUM/LOW)
- Identify root cause patterns
- Flag dependencies
- Suggest specialist agent

### Phase 4: Orchestration & Delegation
Route to appropriate specialist agents:
- **Structural errors** → claude-code-essentials:architect-review
- **Integration errors** → claude-code-essentials:backend-architect
- **Quality errors** → claude-code-essentials:performance-engineer
- **Design errors** → claude-code-essentials:ui-ux-designer
- **Accessibility errors** → claude-code-essentials:frontend-developer
- **Security errors** → claude-code-essentials:security-auditor

## Quality Assurance Framework

**73 Automated Checks Across 9 Domains:**

### Backend Services & Architecture (18 checks)
- Service boundary enforcement
- API method correctness
- HTTP status code semantics
- Response envelope consistency
- Authentication mechanism validation
- Rate limiting implementation
- Timeout configuration
- Circuit breaker patterns

### Frontend Components & State (16 checks)
- Component prop validation
- State management correctness
- React lifecycle ordering
- useEffect cleanup functions
- Memory leak prevention
- Render optimization
- Error boundary placement
- Form state management

### API Layer (12 checks)
- Request method correctness
- Pagination implementation
- Sorting parameter validation
- Filtering parameter sanitization
- CORS policy correctness
- Content-Type header validation
- Security headers presence
- Error response standardization

### Data Persistence (15 checks)
- Schema version compatibility
- Migration rollback capability
- Data type consistency
- NULL value handling
- Unique constraint enforcement
- Foreign key relationships
- Audit trail completeness
- Encryption at rest
- Backup verification

### Security Protocols (14 checks - ALL CRITICAL)
- Hardcoded secrets detection
- SQL injection vulnerability
- XSS (Cross-Site Scripting)
- CSRF token validation
- Dependency vulnerability scanning
- PII data masking in logs
- Access control lists (ACL)
- Audit logging for security events

### Design System - Colors (8 checks)
- WCAG AA contrast ratio (4.5:1)
- WCAG AAA contrast ratio (7:1)
- Color palette consistency
- Semantic color meanings
- Dark mode color pairs
- Color not sole information source
- Colorblind-safe palette
- Brand color usage guidelines

### Design System - Typography (8 checks)
- Font family consistency
- Font size scale follows tokens
- Line height for readability
- Letter spacing appropriate
- Font weight consistency
- Heading hierarchy enforced
- Font file optimization
- RTL text support

### Design System - Spacing (10 checks)
- Spacing values from scale
- Margins and padding consistency
- Grid alignment enforcement
- Responsive breakpoint strategy
- Mobile-first implementation
- Touch target size (44x44px minimum)
- Hover/active state feedback
- Focus indicator visibility
- Whitespace breathing room
- Component alignment consistency

### Accessibility - WCAG 2.1 AA (10 checks - 8 CRITICAL)
- Keyboard navigation completeness
- ARIA label accuracy
- Tab order logical flow
- Screen reader compatibility
- Alt text for images
- Form labels associated
- Error messages linked
- Dynamic content announced
- Skip navigation links
- Landmark regions used

## Error Taxonomy

### SE - Structural Errors (CRITICAL)
- SE-001: Circular Dependency
- SE-002: Type Mismatch on Contract Boundary
- SE-003: Missing Required Dependency
- SE-004: Component Import Resolution Failed

### IE - Integration Errors (CRITICAL)
- IE-001: API Contract Breach
- IE-002: Event/Message Format Violation
- IE-003: External Service Integration Failure
- IE-004: WebSocket Connection Instability

### QE - Quality Errors (HIGH)
- QE-001: N+1 Query Pattern
- QE-002: Memory Leak
- QE-003: Performance Degradation
- QE-004: Excessive Re-renders

### CE - Consistency Errors (MEDIUM)
- CE-001: Design System Token Violation
- CE-002: Pattern Inconsistency
- CE-003: Naming Convention Violation
- CE-004: Code Style Deviation

### SECU - Security Errors (CRITICAL)
- SECU-001: Hardcoded Secrets
- SECU-002: SQL Injection Vulnerability
- SECU-003: XSS (Cross-Site Scripting)
- SECU-004: CSRF Vulnerability
- SECU-005: Insecure Direct Object Reference

## Usage Examples

### Quick Validation
```
User: "Validate the homepage for design and accessibility issues"

Agent Response:
- Loads SKILL.md (this file)
- Executes Design System checks (26 checks)
- Executes Accessibility checks (10 checks)
- Reports findings with severity
- Recommends specialist agents if needed
```

### Full Site Audit
```
User: "Run complete QA validation on entire website"

Agent Response:
- Loads SKILL.md + VERIFICATION_PROTOCOLS.md
- Executes all 73 checks across 9 domains
- Categorizes errors by taxonomy
- Creates remediation plan
- Orchestrates specialist agents for fixes
```

### Error Investigation
```
User: "Why is the hero image not displaying correctly?"

Agent Response:
- Analyzes image loading patterns
- Checks component structure
- Validates file paths
- Tests responsive behavior
- Identifies root cause
- Suggests fix with code example
```

## Integration with Claude Code Essentials Agents

This skill orchestrates the following agents when needed:

- **architect-review** - Structural and architectural issues
- **backend-architect** - API and service layer issues
- **frontend-developer** - UI component and state issues
- **ui-ux-designer** - Design system and layout issues
- **performance-engineer** - Performance and optimization
- **security-auditor** - Security vulnerabilities
- **code-reviewer** - Code quality and standards
- **test-automator** - Testing coverage and quality

## Expected Response Format

```json
{
  "analysisComplete": true,
  "primaryDomain": "UX/Design",
  "secondaryDomains": ["Accessibility", "Performance"],
  "scopeComplexity": "cross-functional",
  "errorsDetected": [
    {
      "id": "ERR-001",
      "category": "Accessibility",
      "taxonomyCode": "CE-003",
      "severity": "critical",
      "description": "Hero image missing alt text",
      "location": "app/page.tsx:93",
      "impact": "WCAG 2.1 AA violation - screen readers cannot describe image",
      "recommendedAgent": "claude-code-essentials:frontend-developer",
      "rootCause": "Image component missing required alt attribute",
      "suggestedFix": "Add alt='Water Damage Restoration Brisbane...' to Image component"
    }
  ],
  "qaPassed": 67,
  "qaFailed": 6,
  "criticalIssues": 2,
  "readyForHandoff": false,
  "estimatedRemediationTime": "2-4 hours"
}
```

## Performance Characteristics

- **Startup Time:** ~100 tokens (metadata only)
- **Scope Analysis:** ~500 tokens
- **Full Validation Run:** 2k-5k tokens (depends on complexity)
- **Orchestration:** Variable (depends on specialist agents called)
- **Total Context:** Efficient progressive disclosure

## Best Practices

1. **Start with scope analysis** - Identify what needs validation first
2. **Run domain-specific checks** - Focus on relevant areas only
3. **Fix critical errors first** - Address CRITICAL severity before others
4. **Validate incrementally** - Check after each major change
5. **Use in CI/CD** - Automate validation in deployment pipeline
6. **Iterate with specialists** - Let agent orchestrate fixes
7. **Document findings** - Keep track of recurring issues

## Security & Safety

- ✅ Never exposes sensitive data in reports
- ✅ Validates without executing untrusted code
- ✅ Flags security issues for human review
- ✅ Follows principle of least privilege
- ✅ Audit trail for all validations
- ✅ Secure credential handling

## References

- Anthropic Agent Skills: https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview
- Claude Code Essentials Agents: Built-in agent catalog
- Engineering Blog: https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills

---

**For detailed protocols, see:** VERIFICATION_PROTOCOLS.md
**For complete error taxonomy, see:** ERROR_TAXONOMY.md
**For all QA checks, see:** QA_FRAMEWORK.md
**For quick reference, see:** QUICK_REFERENCE.md
