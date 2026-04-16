# AI Agent Governance Console

> Enterprise AI oversight platform aligned to the EU AI Act and Canada's AIDA framework.

**Live Demo:** [ai-governance-console.vercel.app](https://ai-governance-console.vercel.app)

---

## The Problem

With EU AI Act enforcement in August 2026, enterprises running 20+ AI agents face significant compliance risk. Most have no central registry, no standardized risk classification, and no incident workflow. Audit preparation takes 40+ hours per quarter.

## The Solution

A web-based governance console that:
- Catalogs all enterprise AI agents with ownership, model, and data sensitivity
- Classifies agents using the EU AI Act 4-tier risk model (unacceptable / high / limited / minimal)
- Tracks AI incidents: hallucinations, PII leaks, bias, prompt injection
- Surfaces audit readiness, MTTR, and portfolio risk on an executive dashboard
- Auto-generates CRO-ready executive briefs

## Features

### Agent Catalog
Register AI agents with owner, model, data sensitivity, and EU AI Act risk tier. Filter by risk level to prioritize compliance reviews.

### Incident Tracking
Log AI incidents across 4 severity tiers (P1–P4) and 6 categories (hallucination, PII leak, bias, prompt injection, performance, other). Track status and mean time to resolution.

### Compliance Dashboard
Executive-level KPIs: audit readiness percentage, total agents, open incidents, and average MTTR. Visual breakdowns by risk tier (pie chart) and incident severity (bar chart).

### AI Executive Brief
One-click generation of a 3-sentence CRO-ready summary covering risk exposure, incident status, and recommended actions.

## PM Artifacts

This project was managed as a full PM engagement with EPMO-grade documentation:

- Business Requirements Document (BRD)
- Stakeholder Map with Mendelow Power/Interest Matrix
- 18 User Stories with acceptance criteria (MoSCoW prioritized)
- 3-Sprint Roadmap with velocity tracking
- RAID Log (Risks, Assumptions, Issues, Dependencies)
- Weekly Status Reports
- Sprint Retrospectives

[View all PM artifacts on Notion →](https://www.notion.so/AI-Agent-Governance-Console-Project-Hub-344907cae85c8087b3f1da79defcb1e8?source=copy_link)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, TypeScript, Tailwind CSS 4 |
| Charts | Recharts |
| Icons | Lucide React |
| Database | Supabase (PostgreSQL) |
| AI | Anthropic Claude API |
| Hosting | Vercel |
| Dev Environment | GitHub Codespaces |

## Simulated Outcomes

- Audit prep time: 40 hrs → 6 hrs (**85% reduction**)
- Audit readiness: 34% → 91%
- Shadow AI agents surfaced: 12
- Incident MTTR: avg 2.5 hrs

## Running Locally

```bash
git clone https://github.com/simsaran/ai-governance-console
cd ai-governance-console
npm install
cp .env.example .env.local  # Fill in your Supabase and Anthropic keys
npm run dev
```

## Author

**Simran Saran** — University of Waterloo, BSc Biochemistry + Computing