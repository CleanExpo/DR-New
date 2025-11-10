# Orchestration Quick Reference

**Version:** 1.0.0
**Purpose:** Fast lookup for agent routing decisions

---

## 🚨 Slow Down Triggers - STOP and Orchestrate

| Trigger | Action |
|---------|--------|
| 🔴 **Security-sensitive** (auth, PII, payments) | MUST include Security Agent |
| 🔴 **Architecture changes** (new features, refactoring) | MUST include Architecture Agent |
| 🔴 **3+ domains** (complex, cross-functional) | Full orchestration required |
| 🔴 **Ambiguous requirements** (unclear scope) | Start with consultation pattern |
| 🔴 **High user impact** (homepage, critical flows) | Include Design + Performance |

---

## ⚡ Fast Track - Direct Route

✅ Simple bug fix (single component)
✅ Content updates (text/images)
✅ Style changes (CSS only)
✅ Documentation updates
✅ Configuration changes

**Rule:** If it takes < 5 minutes and touches 1 file, direct route.

---

## 🎯 Agent Selection Cheat Sheet

### By Keywords

| Keywords | Agent(s) |
|----------|----------|
| "design", "architecture", "structure" | Architecture Agent |
| "secure", "auth", "password", "PII" | Security Agent ⚠️ |
| "slow", "performance", "optimize" | Performance Agent |
| "UI", "UX", "layout", "design" | Design Agent |
| "API", "endpoint", "backend" | Backend Agent |
| "component", "frontend", "React" | Frontend Agent |
| "database", "query", "schema" | Database Agent |
| "test", "QA", "validation" | Testing Agent |

### By Task Type

| Task | Primary | Secondary |
|------|---------|-----------|
| New feature | Architecture | All relevant |
| Bug fix | Depends | Testing |
| Security issue | Security | Depends |
| Performance | Performance | Depends |
| UI change | Design | Frontend |
| API work | Backend | Security |
| DB change | Database | Backend |
| Content | Frontend | None |

---

## 🔄 Orchestration Patterns

### Sequential (A → B → C)
**When:** Dependencies exist
**Example:** Design → Implement → Test

### Parallel (A + B + C)
**When:** Independent tasks
**Example:** Multiple bug fixes

### Iterative (A ⇄ B)
**When:** Needs refinement
**Example:** Design feedback loop

### Consultation (A ∩ B → Decision)
**When:** Decision needed
**Example:** Tech choice evaluation

---

## ✅ Quality Gates by Complexity

### Simple (< 5 min)
- [ ] Requirements met
- [ ] Compiles

### Moderate (15-30 min)
- [ ] Requirements met
- [ ] Type checks pass
- [ ] Unit tests pass
- [ ] Basic review

### Complex (1-4 hours)
- [ ] All requirements met
- [ ] All tests pass
- [ ] Security reviewed
- [ ] Performance validated
- [ ] Accessibility checked
- [ ] Documentation complete

---

## 🎬 Common Scenarios

### "Add contact form"
→ Frontend + Backend + Security
→ Sequential pattern

### "Homepage slow"
→ Performance (investigate) → Route based on findings
→ Iterative pattern

### "Implement auth"
→ Architecture + Security + Backend + Frontend + Testing
→ Sequential with security gates

### "Fix typo"
→ Direct to Frontend
→ No orchestration

### "Should we use X or Y?"
→ Architecture + relevant specialists
→ Consultation pattern

---

## 🚫 Common Mistakes

❌ **Over-orchestrating simple tasks**
- Don't orchestrate typo fixes

❌ **Under-orchestrating security**
- ALWAYS include Security Agent for auth/PII

❌ **Skipping Architecture on big changes**
- New features need architectural review

❌ **Forgetting Performance impact**
- Consider performance for user-facing changes

❌ **Ignoring Accessibility**
- All UI changes need accessibility review

---

## 📊 Decision Flowchart

```
START
  ↓
Is it security-sensitive?
  ├─ YES → Include Security Agent
  └─ NO → Continue
  ↓
How many domains?
  ├─ 1 → Direct route to specialist
  ├─ 2 → Coordinate 2 agents
  └─ 3+ → Full orchestration
  ↓
Are requirements clear?
  ├─ YES → Proceed with implementation
  └─ NO → Start with consultation
  ↓
What's the pattern?
  ├─ Dependencies? → Sequential
  ├─ Independent? → Parallel
  ├─ Needs feedback? → Iterative
  └─ Need decision? → Consultation
  ↓
Select quality gate level
  ↓
EXECUTE
  ↓
VALIDATE
  ↓
DONE
```

---

## 🎯 Agent Priority Matrix

| Agent | When to Include | Priority |
|-------|-----------------|----------|
| Security | Always for auth/PII | 🔴 CRITICAL |
| Architecture | Major changes | 🟠 HIGH |
| Performance | User-facing changes | 🟡 MEDIUM |
| Design | UI changes | 🟡 MEDIUM |
| Testing | Always (eventually) | 🟢 STANDARD |

---

## 💡 Pro Tips

1. **When in doubt, ask Architecture Agent** - Better to plan than to refactor later
2. **Security is non-negotiable** - No shortcuts
3. **Performance is easier to maintain than fix** - Consider it upfront
4. **Simple is better** - Don't over-engineer
5. **Document big decisions** - Future you will thank you

---

## 📞 Quick Contact

| Need | Use |
|------|-----|
| System design help | Architecture Agent |
| Security review | Security Agent |
| Performance investigation | Performance Agent |
| Full project audit | Advanced Engineering Skills Agent |
| Multi-agent coordination | Master Orchestrator |

---

## 🔗 Full Documentation

- **Master Orchestrator:** `.claude/skills/master-orchestrator/SKILL.md`
- **Decision Matrix:** `.claude/docs/AGENT_DECISION_MATRIX.md`
- **Specialist Agents:** `.claude/skills/*/SKILL.md`
- **Project Guidelines:** `/home/user/DR-New/CLAUDE.md`

---

**Last Updated:** November 2025

**Remember:** The best orchestration is the simplest one that ensures quality. Don't overcomplicate.
