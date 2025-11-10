# Agent Decision Matrix

**Version:** 1.0.0
**Last Updated:** November 2025
**Purpose:** Intelligent routing guide for task-to-agent assignment

---

## Overview

This document provides a comprehensive decision matrix for determining which skills, agents, and sub-agents to invoke for different types of tasks. It includes triggers, patterns, and orchestration strategies.

## Decision Framework

```
┌─────────────────────────────────────────────────────────────────┐
│                  INTELLIGENT TASK ROUTING                        │
└─────────────────────────────────────────────────────────────────┘

Step 1: COMPLEXITY ANALYSIS
├─ Is this a simple, single-domain task?
│  ├─ YES → Direct route to specialist agent
│  └─ NO → Continue to Step 2
│
Step 2: DOMAIN IDENTIFICATION
├─ How many domains are involved?
│  ├─ 1 domain → Single agent
│  ├─ 2 domains → Coordinate 2 agents
│  └─ 3+ domains → Full orchestration
│
Step 3: RISK ASSESSMENT
├─ Does this involve:
│  ├─ Security? → MUST include Security Agent
│  ├─ Architecture changes? → MUST include Architecture Agent
│  ├─ User experience? → SHOULD include Design Agent
│  └─ Performance impact? → SHOULD include Performance Agent
│
Step 4: PATTERN SELECTION
├─ Sequential (dependencies): A → B → C
├─ Parallel (independent): A + B + C
├─ Iterative (feedback): A ⇄ B ⇄ C
└─ Consultation (decision): A ∩ B ∩ C → Decision
│
Step 5: QUALITY GATES
└─ Apply appropriate quality gates based on task criticality
```

---

## Task Classification

### Class 1: Simple Tasks (Direct Route)
**Characteristics:**
- Single domain
- Clear, unambiguous requirements
- Low risk
- No dependencies
- Well-defined scope

**Examples:**
- Update copyright year
- Fix typo in documentation
- Change button color
- Add CSS class
- Update environment variable

**Routing:** Direct to single specialist agent

---

### Class 2: Moderate Tasks (2-Agent Coordination)
**Characteristics:**
- 2 domains involved
- Clear requirements
- Moderate risk
- Some dependencies
- Defined scope

**Examples:**
- Add contact form (Frontend + Backend)
- Create new service page (Frontend + Content)
- Implement simple API endpoint (Backend + Database)
- Add image gallery (Frontend + Performance)

**Routing:** Coordinate 2 specialist agents

---

### Class 3: Complex Tasks (Full Orchestration)
**Characteristics:**
- 3+ domains involved
- May have ambiguous requirements
- High risk or impact
- Multiple dependencies
- Broad scope

**Examples:**
- Implement authentication system
- Redesign homepage
- Add payment processing
- Migrate database
- Implement real-time features

**Routing:** Full orchestration with Master Orchestrator

---

## Agent Selection Matrix

### By Task Type

| Task Type | Primary Agent | Supporting Agents | Orchestration |
|-----------|---------------|-------------------|---------------|
| **System Design** | Architecture | Backend, Frontend, Performance | Consultation |
| **Security Review** | Security | Architecture, Backend, Frontend | Sequential |
| **New Feature** | Architecture | All relevant specialists | Sequential |
| **Bug Fix** | Depends on bug location | Testing, QA | Direct/Simple |
| **Performance Issue** | Performance | Frontend, Backend, Database | Investigation |
| **UI/UX Change** | Design | Frontend, Accessibility | Sequential |
| **API Development** | Backend | Architecture, Security, Testing | Sequential |
| **Database Change** | Database | Backend, Architecture | Sequential |
| **Content Update** | Frontend | None | Direct |
| **Testing** | Testing | Depends on scope | Variable |

### By Keyword/Trigger

| Keyword/Phrase | Likely Agent(s) | Notes |
|----------------|-----------------|-------|
| "design" | Architecture, Design | Clarify: system or visual design |
| "secure" / "auth" | Security | Always include Security Agent |
| "slow" / "performance" | Performance | Profile first, then route |
| "user experience" | Design | May need Accessibility Agent |
| "API" | Backend | Consider Security Agent |
| "database" / "query" | Database | May need Backend Agent |
| "test" | Testing | Specify unit/E2E/integration |
| "bug" | Depends | Investigate first |
| "refactor" | Architecture | Multiple agents likely needed |
| "accessibility" | Design | WCAG compliance |

---

## Slow-Down Triggers (⚠️ CRITICAL)

When ANY of these are detected, STOP and invoke Master Orchestrator:

### 🔴 Security-Sensitive
```
Triggers:
- Authentication/authorization
- User data handling (PII)
- Payment processing
- File uploads
- External API integrations
- Environment variables with secrets

Action: ALWAYS include Security Agent
```

### 🔴 Architectural Impact
```
Triggers:
- New feature affecting multiple pages
- Database schema changes
- New dependencies or libraries
- Major refactoring
- Tech stack changes
- API design

Action: ALWAYS include Architecture Agent
```

### 🔴 Cross-Domain Complexity
```
Triggers:
- Task description mentions 3+ domains
- Multiple "and" statements in requirements
- Unclear scope or requirements
- Multiple valid approaches
- High uncertainty

Action: Full orchestration with planning phase
```

### 🔴 User-Facing Impact
```
Triggers:
- Homepage changes
- Critical user flows
- Checkout/payment flows
- Emergency response features
- Contact forms

Action: Include Design, Accessibility, Performance Agents
```

---

## Orchestration Patterns

### Pattern 1: Sequential Orchestration

**When to Use:**
- Tasks have clear dependencies
- B cannot start until A completes
- Linear workflow

**Flow:**
```
A (Design) → B (Implement) → C (Test) → D (Review)
```

**Examples:**
- Implement new authentication system
- Redesign component with testing
- API development with documentation

**Template:**
```typescript
interface SequentialPlan {
  phase1: { agent: string, task: string, output: string };
  phase2: { agent: string, task: string, dependsOn: string };
  phase3: { agent: string, task: string, dependsOn: string };
  // ...
}
```

---

### Pattern 2: Parallel Orchestration

**When to Use:**
- Tasks are independent
- No dependencies between tasks
- Can execute simultaneously

**Flow:**
```
    ┌─ A (Frontend) ─┐
    ├─ B (Backend) ──┤
    └─ C (Database) ─┘
          ↓
    Merge Results
```

**Examples:**
- Performance optimization (multiple areas)
- Multiple bug fixes
- Parallel feature development

**Template:**
```typescript
interface ParallelPlan {
  tasks: Array<{
    agent: string;
    task: string;
    independent: true;
  }>;
  mergeStrategy: string;
}
```

---

### Pattern 3: Iterative Orchestration

**When to Use:**
- Requires feedback loops
- Refinement needed
- Design → Review → Refine cycles

**Flow:**
```
A → B → Review → A (refine) → B (update) → Review → Done
```

**Examples:**
- UI/UX design with feedback
- Performance optimization iterations
- API design refinement

**Template:**
```typescript
interface IterativePlan {
  iteration: number;
  maxIterations: number;
  currentPhase: string;
  feedbackLoop: {
    designer: string;
    implementer: string;
    reviewer: string;
  };
  convergenceCriteria: string[];
}
```

---

### Pattern 4: Consultation Orchestration

**When to Use:**
- Decision needed before proceeding
- Multiple valid approaches
- Requires expert input from multiple domains

**Flow:**
```
Question → A (input) + B (input) + C (input) → Synthesis → Decision
```

**Examples:**
- "Should we use GraphQL or REST?"
- "Which state management library?"
- "Monolith vs microservices?"

**Template:**
```typescript
interface ConsultationPlan {
  question: string;
  consultants: Array<{
    agent: string;
    perspective: string;
  }>;
  decisionCriteria: string[];
  recommendation: string;
}
```

---

## Quality Gate Assignment

### Gate Level 1 (Simple Tasks)
- [ ] Requirements met
- [ ] Code compiles
- [ ] Basic testing

**Time:** ~5 minutes

### Gate Level 2 (Moderate Tasks)
- [ ] Requirements met
- [ ] Code compiles and type-checks
- [ ] Unit tests passing
- [ ] Code review (basic)
- [ ] Documentation updated

**Time:** ~15-30 minutes

### Gate Level 3 (Complex Tasks)
- [ ] All requirements met
- [ ] Code compiles and type-checks
- [ ] Unit tests passing
- [ ] E2E tests passing
- [ ] Security review completed
- [ ] Performance validation
- [ ] Accessibility validation
- [ ] Code review (thorough)
- [ ] Documentation complete
- [ ] Deployment plan ready

**Time:** ~1-4 hours

---

## Real-World Scenarios

### Scenario 1: "Add a contact form to the contact page"

**Analysis:**
- Complexity: Moderate
- Domains: Frontend, Backend
- Risk: Medium (user data handling)
- Security: Yes (form input, email)

**Decision:**
```
Primary: Frontend Agent (form UI)
Secondary: Backend Agent (API endpoint)
Mandatory: Security Agent (input validation, XSS prevention)
Optional: Testing Agent (E2E tests)

Pattern: Sequential
1. Frontend Agent → Build form UI
2. Backend Agent → Create API endpoint with validation
3. Security Agent → Review for vulnerabilities
4. Testing Agent → Write E2E tests
```

---

### Scenario 2: "The homepage is loading slowly"

**Analysis:**
- Complexity: Complex (unknown root cause)
- Domains: Unknown until investigated
- Risk: High (user experience)
- Investigation: Required

**Decision:**
```
Step 1: Performance Agent → Profile and identify bottlenecks
Step 2: Based on findings, route to:
  - Frontend Agent (if client-side issues)
  - Backend Agent (if API issues)
  - Database Agent (if query issues)
  - Performance Agent (if caching/CDN issues)
Step 3: Coordinate fixes
Step 4: Performance Agent → Validate improvements

Pattern: Iterative Investigation
```

---

### Scenario 3: "Implement user authentication with OAuth"

**Analysis:**
- Complexity: Complex
- Domains: Architecture, Security, Backend, Frontend, Testing
- Risk: CRITICAL (security)
- Dependencies: Multiple

**Decision:**
```
⚠️ SLOW DOWN TRIGGER ACTIVATED ⚠️

Master Orchestrator → Full orchestration required

Phase 1: Planning
1. Architecture Agent → Design auth architecture
2. Security Agent → Security requirements analysis

Phase 2: Implementation
3. Backend Agent → Implement OAuth flow
4. Frontend Agent → Build login/signup UI

Phase 3: Validation
5. Security Agent → Security audit
6. Testing Agent → Comprehensive tests

Phase 4: Documentation
7. Documentation Agent → Implementation guide

Pattern: Sequential with Security Gates
Quality Gates: Level 3 (Full validation)
```

---

### Scenario 4: "Update the footer copyright year"

**Analysis:**
- Complexity: Simple
- Domains: Frontend only
- Risk: Low
- Dependencies: None

**Decision:**
```
Direct route to Frontend Agent

No orchestration needed
Quality Gates: Level 1
Estimated time: < 5 minutes
```

---

## Multi-Agent Collaboration Rules

### Rule 1: Security Agent Veto Power
Security Agent can BLOCK any implementation that introduces vulnerabilities. This is non-negotiable.

### Rule 2: Architecture Agent Authority on Design
Architecture Agent has final say on architectural decisions. Other agents can provide input but Architecture Agent decides.

### Rule 3: Performance Budget Enforcement
Performance Agent can REJECT implementations that exceed performance budgets without justification.

### Rule 4: Accessibility is Mandatory
Design Agent must ensure WCAG 2.1 AA compliance for all user-facing changes. No exceptions.

### Rule 5: Testing is Non-Negotiable
Testing Agent must validate all changes with appropriate tests (unit/E2E) before deployment.

---

## Agent Communication Protocol

### Handoff Format

```typescript
interface AgentHandoff {
  from: string;              // Sending agent
  to: string;                // Receiving agent
  task: string;              // Task description
  context: {                 // Required context
    requirements: string[];
    constraints: string[];
    dependencies: string[];
  };
  outputs: {                 // Expected outputs
    deliverables: string[];
    format: string;
    quality_criteria: string[];
  };
  priority: 'P0' | 'P1' | 'P2' | 'P3';
}
```

### Collaboration Format

```typescript
interface AgentCollaboration {
  participants: string[];      // All agents involved
  coordinator: string;         // Who's coordinating
  pattern: 'sequential' | 'parallel' | 'iterative' | 'consultation';
  communicationPlan: Array<{
    stage: string;
    participants: string[];
    purpose: string;
  }>;
  integrationStrategy: string;
}
```

---

## Performance Characteristics

### Routing Overhead

| Scenario | Overhead | Worth It? |
|----------|----------|-----------|
| Simple task, direct route | ~50 tokens | ✅ Yes - minimal |
| Moderate task, 2 agents | ~200 tokens | ✅ Yes - better quality |
| Complex task, orchestration | ~500-1500 tokens | ✅ Yes - prevents errors |
| Over-orchestration | ~2000+ tokens | ❌ No - diminishing returns |

### Optimization Strategies

1. **Direct Route Simple Tasks** - Don't over-engineer
2. **Cache Agent Context** - Reuse knowledge within session
3. **Progressive Disclosure** - Start simple, escalate if needed
4. **Parallel Execution** - When tasks are independent
5. **Early Termination** - Stop if clear path forward

---

## Troubleshooting

### Issue: Over-Orchestration
**Symptom:** Too much planning, not enough action
**Solution:** Simplify for straightforward tasks, use direct routing

### Issue: Under-Orchestration
**Symptom:** Missing critical aspects, errors in production
**Solution:** Review slow-down triggers, improve domain identification

### Issue: Agent Conflicts
**Symptom:** Contradictory recommendations from different agents
**Solution:** Use consultation pattern, establish hierarchy

### Issue: Slow Response
**Symptom:** Taking too long to complete tasks
**Solution:** Review pattern selection, consider parallel execution

---

## Success Metrics

Track these metrics to evaluate orchestration effectiveness:

- **Task Completion Rate:** % of tasks successfully completed
- **First-Time Quality:** % of tasks passing all quality gates first try
- **Security Issues:** # of security vulnerabilities caught before production
- **Performance Regressions:** # of performance issues prevented
- **Orchestration Accuracy:** % of correct agent selections
- **Time to Completion:** Average time by task complexity
- **User Satisfaction:** Feedback on deliverable quality

---

## References

- Master Orchestrator: `.claude/skills/master-orchestrator/SKILL.md`
- Advanced Engineering Skills: `.claude/skills/advanced-engineering-skills-agent/SKILL.md`
- Specialist Agents: `.claude/skills/*/SKILL.md`
- Project Guidelines: `/home/user/DR-New/CLAUDE.md`

---

**Remember:** The goal is intelligent routing, not complex routing. Choose the simplest path that ensures quality.
