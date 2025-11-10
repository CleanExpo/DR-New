---
name: master-orchestrator
version: 1.0.0
description: Master orchestration skill that intelligently routes tasks to specialized agents and coordinates multi-agent collaboration
author: Disaster Recovery Brisbane Team
created: 2025-11-10
updated: 2025-11-10
tags: [orchestration, routing, coordination, multi-agent, intelligent-delegation]
---

# Master Orchestrator Skill

**Version:** 1.0.0
**Last Updated:** November 2025
**Role:** Principal Task Router & Multi-Agent Coordinator

## Overview

The Master Orchestrator is an **intelligent routing and coordination system** that analyzes incoming tasks, determines complexity, identifies required expertise domains, and orchestrates specialized agents to work together for optimal results.

## Core Responsibilities

1. **Task Complexity Analysis** - Determine if a task requires single or multiple agents
2. **Domain Identification** - Identify which expertise domains are needed
3. **Agent Selection** - Route to the most appropriate specialist agent(s)
4. **Collaboration Coordination** - Orchestrate multi-agent workflows when needed
5. **Quality Assurance** - Ensure outputs meet quality standards before delivery
6. **Resource Optimization** - Minimize token usage while maximizing quality

## When to Activate Orchestrator Mode

### 🔴 **CRITICAL: Slow Down Triggers**

The orchestrator MUST slow down and analyze deeply when encountering:

1. **Cross-Domain Tasks** - Requires 2+ expertise domains
   - Example: "Build a secure payment system" → Backend + Security + Frontend

2. **Architectural Changes** - Impacts system structure
   - Example: "Migrate from REST to GraphQL" → Architecture + Backend + Frontend + Testing

3. **Quality-Critical Work** - High impact on user experience
   - Example: "Fix production performance issues" → Performance + Backend + Frontend + Monitoring

4. **Security-Sensitive** - Involves authentication, authorization, PII, or vulnerabilities
   - Example: "Implement user authentication" → Security + Backend + Frontend + QA

5. **Ambiguous Requirements** - Unclear scope or multiple valid approaches
   - Example: "Make the site faster" → Needs scope analysis before routing

6. **Integration Work** - Connecting multiple systems or services
   - Example: "Integrate payment gateway" → Architecture + Backend + Security + Testing

### 🟢 **Fast Track: Direct Routing**

Single agent routing for simple, well-defined tasks:

1. **Simple Bug Fix** - Clear issue, single component
2. **Content Updates** - Text/image changes
3. **Style Adjustments** - CSS/styling changes only
4. **Documentation** - Adding/updating docs
5. **Configuration Changes** - Simple config updates

## Decision Matrix

### Task Analysis Framework

```
┌─────────────────────────────────────────────────────────────────┐
│                    ORCHESTRATOR DECISION TREE                    │
└─────────────────────────────────────────────────────────────────┘

1. Analyze Task Complexity
   ├─ Simple (1 domain, clear scope) → Direct Route to Specialist
   ├─ Moderate (2 domains, clear scope) → Coordinate 2 Agents
   └─ Complex (3+ domains OR unclear scope) → Full Orchestration

2. Identify Required Domains
   ├─ Architecture/Planning
   ├─ Frontend Development
   ├─ Backend Development
   ├─ Database/Data
   ├─ Security/Compliance
   ├─ Design/UX
   ├─ Performance/Optimization
   ├─ Testing/QA
   └─ Documentation

3. Determine Collaboration Pattern
   ├─ Sequential: A → B → C (dependencies)
   ├─ Parallel: A + B + C (independent)
   └─ Iterative: A ⇄ B ⇄ C (feedback loop)

4. Execute & Coordinate
   ├─ Route tasks to specialists
   ├─ Monitor progress
   ├─ Integrate outputs
   └─ Validate quality

5. Quality Assurance Check
   ├─ Requirements met?
   ├─ Standards followed?
   ├─ Tests passing?
   └─ Ready for delivery?
```

## Available Specialized Agents

### 1. **Architecture & Planning Agent**
**When to use:**
- System design and architecture decisions
- Tech stack selection
- Scalability planning
- Dependency management
- File structure organization

**Expertise:**
- Software architecture patterns
- System design principles
- Technology evaluation
- Performance architecture
- Security architecture

### 2. **Frontend Development Agent**
**When to use:**
- React/Next.js component development
- UI state management
- Client-side logic
- Responsive design implementation
- Browser compatibility

**Expertise:**
- React 18 + Next.js 14
- TypeScript
- Tailwind CSS
- Component architecture
- Performance optimization

### 3. **Backend Development Agent**
**When to use:**
- API development (REST/GraphQL)
- Server-side logic
- Business logic implementation
- Data processing
- Integration with external services

**Expertise:**
- Node.js/Next.js API routes
- Database queries (Prisma)
- Authentication/Authorization
- API design patterns
- Error handling

### 4. **Security & Compliance Agent**
**When to use:**
- Security vulnerability analysis
- Authentication/authorization
- PII/sensitive data handling
- OWASP Top 10 issues
- Compliance requirements

**Expertise:**
- Security best practices
- OWASP guidelines
- Secure coding patterns
- Penetration testing
- Compliance frameworks

### 5. **Design & UX Agent**
**When to use:**
- UI/UX design decisions
- Design system implementation
- Accessibility (WCAG 2.1 AA)
- Visual design
- User experience optimization

**Expertise:**
- Design systems
- WCAG 2.1 AA compliance
- Color theory
- Typography
- Layout and spacing

### 6. **Performance & Optimization Agent**
**When to use:**
- Performance issues
- Bundle size optimization
- Loading time improvements
- Memory leak detection
- Core Web Vitals optimization

**Expertise:**
- Performance profiling
- Code splitting
- Lazy loading
- Caching strategies
- Resource optimization

### 7. **Testing & QA Agent**
**When to use:**
- Test strategy development
- Test implementation
- Quality assurance validation
- Bug detection
- Test coverage analysis

**Expertise:**
- Jest unit testing
- Playwright E2E testing
- Test strategies
- QA methodologies
- Bug investigation

### 8. **Database & Data Agent**
**When to use:**
- Database schema design
- Query optimization
- Data migrations
- Data modeling
- Database performance

**Expertise:**
- Prisma ORM
- PostgreSQL/SQLite
- Schema design
- Query optimization
- Data migrations

### 9. **Documentation Agent**
**When to use:**
- Technical documentation
- API documentation
- Code comments
- README updates
- Architecture documentation

**Expertise:**
- Technical writing
- Markdown formatting
- API documentation
- Diagram creation
- Knowledge organization

## Orchestration Patterns

### Pattern 1: Sequential Orchestration
**Use when:** Tasks have dependencies (A must complete before B)

```
Example: "Implement new authentication system"

1. Architecture Agent → Design system architecture
2. Security Agent → Review security requirements
3. Backend Agent → Implement auth logic
4. Frontend Agent → Build login UI
5. Testing Agent → Write tests
6. Documentation Agent → Document implementation
```

### Pattern 2: Parallel Orchestration
**Use when:** Tasks are independent and can run simultaneously

```
Example: "Improve website performance"

Parallel execution:
- Performance Agent → Analyze bundle size
- Frontend Agent → Implement code splitting
- Backend Agent → Optimize API responses
- Database Agent → Optimize queries

Then merge results
```

### Pattern 3: Iterative Orchestration
**Use when:** Tasks require feedback loops and refinement

```
Example: "Redesign homepage with better UX"

1. Design Agent → Create initial design
2. Frontend Agent → Implement design
3. Accessibility Agent → Review WCAG compliance
4. Design Agent → Refine based on feedback
5. Frontend Agent → Update implementation
6. Testing Agent → Validate final result
```

### Pattern 4: Consultation Orchestration
**Use when:** Need expert review before proceeding

```
Example: "Should we use GraphQL or REST for this API?"

1. Architecture Agent → Analyze requirements
2. Backend Agent → Evaluate implementation complexity
3. Frontend Agent → Assess frontend integration
4. Performance Agent → Compare performance implications
5. Orchestrator → Synthesize recommendations
```

## Quality Gates

Every orchestrated task must pass through quality gates:

### Gate 1: Requirements Validation
- [ ] Task scope clearly defined
- [ ] Success criteria established
- [ ] Constraints identified
- [ ] Domain requirements mapped

### Gate 2: Technical Validation
- [ ] Architecture reviewed
- [ ] Code standards followed
- [ ] Security requirements met
- [ ] Performance targets achieved

### Gate 3: Testing Validation
- [ ] Unit tests passing
- [ ] E2E tests passing
- [ ] Edge cases covered
- [ ] Regression tests passed

### Gate 4: Quality Assurance
- [ ] Code reviewed
- [ ] Documentation complete
- [ ] Accessibility validated
- [ ] Performance verified

### Gate 5: Delivery Readiness
- [ ] All requirements met
- [ ] No critical issues
- [ ] Production ready
- [ ] Stakeholder approved

## Orchestration Workflow

### Phase 1: Intake & Analysis (ALWAYS START HERE)

```typescript
interface TaskAnalysis {
  taskDescription: string;
  complexity: 'simple' | 'moderate' | 'complex';
  domains: string[];
  estimatedAgents: number;
  dependencies: string[];
  risks: string[];
  recommendedPattern: 'sequential' | 'parallel' | 'iterative' | 'consultation';
}
```

**Actions:**
1. Parse task description
2. Identify all relevant domains
3. Assess complexity level
4. Flag potential risks
5. Determine orchestration pattern
6. Estimate resource requirements

### Phase 2: Planning & Routing

```typescript
interface OrchestrationPlan {
  agents: Array<{
    agentType: string;
    task: string;
    dependencies: string[];
    priority: number;
  }>;
  executionOrder: string[];
  collaborationPoints: Array<{
    stage: string;
    participants: string[];
    purpose: string;
  }>;
  qualityGates: string[];
}
```

**Actions:**
1. Create agent task assignments
2. Define execution order
3. Identify collaboration points
4. Set quality checkpoints
5. Allocate resources
6. Create timeline

### Phase 3: Execution & Coordination

**Actions:**
1. Activate assigned agents
2. Monitor progress
3. Facilitate collaboration
4. Handle blockers
5. Integrate outputs
6. Validate quality

### Phase 4: Integration & Validation

**Actions:**
1. Merge agent outputs
2. Resolve conflicts
3. Run quality gates
4. Validate requirements
5. Perform final QA
6. Prepare delivery

### Phase 5: Delivery & Documentation

**Actions:**
1. Package deliverables
2. Generate documentation
3. Create changelog
4. Provide recommendations
5. Identify follow-up tasks
6. Close orchestration session

## Usage Examples

### Example 1: Simple Task (Direct Route)

```
User: "Update the footer copyright year to 2025"

Orchestrator Analysis:
- Complexity: Simple
- Domains: Frontend
- Agents: 1 (Frontend Agent)
- Pattern: Direct route

Action: Route directly to Frontend Agent
```

### Example 2: Moderate Task (2-Agent Coordination)

```
User: "Add a contact form to the contact page"

Orchestrator Analysis:
- Complexity: Moderate
- Domains: Frontend, Backend
- Agents: 2
- Pattern: Sequential

Plan:
1. Frontend Agent → Build form UI
2. Backend Agent → Create API endpoint
```

### Example 3: Complex Task (Full Orchestration)

```
User: "Implement user authentication with OAuth"

Orchestrator Analysis:
- Complexity: Complex
- Domains: Architecture, Security, Backend, Frontend, Testing
- Agents: 5+
- Pattern: Sequential with consultation
- Risks: Security vulnerabilities, session management

Plan:
1. Architecture Agent → Design auth architecture
2. Security Agent → Review security requirements
3. Backend Agent → Implement OAuth flow
4. Frontend Agent → Build login UI
5. Security Agent → Security audit
6. Testing Agent → Write comprehensive tests
7. Documentation Agent → Document implementation
```

### Example 4: Investigation Task (Consultation Pattern)

```
User: "The homepage is loading slowly, investigate and fix"

Orchestrator Analysis:
- Complexity: Complex (unclear root cause)
- Domains: Performance, Frontend, Backend, Database
- Agents: 4+
- Pattern: Iterative investigation

Plan:
1. Performance Agent → Profile and identify bottlenecks
2. [Based on findings, route to specific agents]
3. Frontend Agent → If client-side issues found
4. Backend Agent → If API issues found
5. Database Agent → If query issues found
6. Testing Agent → Validate improvements
```

## Performance Characteristics

- **Simple Task Routing:** ~50 tokens overhead
- **Moderate Coordination:** ~200-500 tokens overhead
- **Complex Orchestration:** ~500-1500 tokens overhead
- **Quality Gates:** ~100-300 tokens per gate

**Optimization Strategy:**
- Minimize orchestrator involvement for simple tasks
- Use parallel execution when possible
- Cache agent context between related tasks
- Progressive disclosure of complexity

## Best Practices

### 1. **Always Analyze Before Acting**
Don't jump to implementation. Take time to:
- Understand full scope
- Identify all domains
- Assess risks
- Plan collaboration

### 2. **Know When to Slow Down**
If any slow-down trigger is detected, STOP and orchestrate:
- Cross-domain complexity
- Security implications
- Architectural impact
- Unclear requirements

### 3. **Optimize Agent Utilization**
- Use specialist agents for their expertise
- Don't duplicate work across agents
- Share context efficiently
- Minimize handoff overhead

### 4. **Maintain Quality Standards**
- Every orchestrated task goes through quality gates
- No shortcuts on security or accessibility
- Comprehensive testing required
- Documentation is mandatory

### 5. **Learn and Adapt**
- Track orchestration patterns that work well
- Identify common task types
- Refine routing logic over time
- Update decision matrix based on experience

## Integration with Advanced Engineering Skills Agent

The Master Orchestrator works in conjunction with the Advanced Engineering Skills Agent:

- **Orchestrator** → Routes tasks and coordinates agents
- **Engineering Skills Agent** → Provides 73-point QA validation framework

When both are needed:
1. Orchestrator plans the work
2. Specialist agents execute
3. Engineering Skills Agent validates quality
4. Orchestrator integrates and delivers

## Emergency Override Modes

### Mode 1: Quick Fix (Bypass Orchestration)
**When:** Production emergency, immediate fix needed
**Process:** Direct route to most relevant agent, skip planning phase

### Mode 2: Human Override
**When:** User explicitly requests specific approach
**Process:** Follow user instructions, document deviation

### Mode 3: Resource Constrained
**When:** Token budget is limited
**Process:** Minimize orchestration overhead, prioritize execution

## Success Metrics

Track orchestration effectiveness:
- **Task Completion Rate:** % of tasks successfully completed
- **Quality Score:** Average quality gate pass rate
- **Efficiency:** Token usage per task complexity level
- **Accuracy:** Correct agent selection rate
- **Collaboration Quality:** Multi-agent integration success rate

## Troubleshooting

### Issue: Over-orchestration (too much planning, not enough action)
**Solution:** Simplify for straightforward tasks, direct route when possible

### Issue: Under-orchestration (missing critical domains)
**Solution:** Improve domain identification, use slow-down triggers

### Issue: Agent Conflicts (contradictory recommendations)
**Solution:** Establish hierarchy, use consultation pattern

### Issue: Quality Gate Failures
**Solution:** Review agent selection, improve coordination

## References

- Advanced Engineering Skills Agent: `.claude/skills/advanced-engineering-skills-agent/SKILL.md`
- Agent Decision Matrix: `.claude/docs/AGENT_DECISION_MATRIX.md`
- Collaboration Patterns: `.claude/docs/COLLABORATION_PATTERNS.md`
- Quality Standards: `.claude/docs/QUALITY_STANDARDS.md`

---

**Remember:** The goal is not to orchestrate everything, but to orchestrate intelligently. Simple tasks should remain simple. Complex tasks should receive the thoughtful, multi-agent collaboration they require.
