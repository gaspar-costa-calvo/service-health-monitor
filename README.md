# Service Health Monitor
 
> A lightweight uptime and incident-tracking API for monitoring service availability, response times, and downtime events — built to solve a problem I lived daily as an IT Support Analyst: knowing a service is down before a customer tells you.
 
[![CI](https://github.com/gaspar-costa-calvo/service-health-monitor/actions/workflows/ci.yml/badge.svg)](https://github.com/gaspar-costa-calvo/service-health-monitor/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
 
🔗 **Live demo:** [link] · **API docs:** [link] · **Demo credentials:** `demo@example.com` / `demo1234`
 
---
 
## The Problem
 
<!--
2-3 sentences, written from your real IT support experience. E.g.:
"In telecom/IT support environments, downtime is often discovered reactively — through customer
complaints rather than proactive monitoring. This project automates what I used to do manually:
periodically checking service health, tracking incidents, and alerting before issues escalate."
-->
 
## Features
 
- 🩺 **Health checks** — scheduled pings against registered endpoints (HTTP status + response time)
- 🚨 **Incident tracking** — automatic incident creation on failure, with duration and resolution logging
- 📊 **Uptime analytics** — uptime %, MTTR (mean time to recovery), historical trend data per service
- 🔔 **Alerting** — webhook/email notification on downtime or latency threshold breach
- 🔐 **Multi-user auth** — JWT-based, each user manages their own monitored services
## Architecture
 
<!-- Insert a simple diagram here — even an ASCII or draw.io export. Example structure: -->
 
```
Client (React dashboard) ──► REST API (Express/TS) ──► MySQL (Prisma)
                                     │
                                     ├──► Scheduler (node-cron) ──► External services (pinged)
                                     └──► Alert service ──► Webhook / Email
```
 
**Key design decisions:**
- Layered architecture (controller → service → repository) for testability and separation of concerns
- Scheduled checks run independently of request/response cycle via `node-cron`
- Incidents are derived state (created/closed automatically based on check results), not manually entered — reduces data inconsistency
## Tech Stack
 
| Layer | Technology |
|---|---|
| Runtime | Node.js, TypeScript |
| Framework | Express |
| Database | MySQL + Prisma ORM |
| Auth | JWT, bcrypt |
| Testing | Jest, Supertest |
| Scheduling | node-cron |
| CI/CD | GitHub Actions |
| Containerization | Docker, docker-compose |
| Deployment | Render / Railway |
 
## Getting Started
 
### Prerequisites
- Node.js ≥ 20
- Docker & Docker Compose
### Setup
```bash
git clone https://github.com/gaspar-costa-calvo/service-health-monitor.git
cd service-health-monitor
cp .env.example .env       # fill in values
docker-compose up -d       # spins up app + MySQL
npx prisma migrate dev
npm run dev
```
 
### Running tests
```bash
npm run test           # unit tests
npm run test:integration
npm run test:coverage
```
 
## API Overview
 
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Authenticate, returns JWT |
| GET | `/api/services` | List monitored services |
| POST | `/api/services` | Register a new service to monitor |
| GET | `/api/services/:id/uptime` | Uptime stats for a service |
| GET | `/api/incidents` | List incidents (filterable by service/date) |
 
<!-- Link to full Swagger/Postman docs once built -->
 
## What I'd Improve at Scale
 
<!--
This section signals seniority. 2-4 bullets, e.g.:
- Move check execution to a queue (BullMQ) to decouple scheduling from check execution under load
- Add Redis caching for uptime aggregate queries
- Partition incident history table by date for large-scale retention
-->
 
## Lessons / Engineering Notes
 
<!-- Optional but valuable: 2-3 real decisions/tradeoffs you made and why. Interviewers read this. -->
 
---
 
**Author:** [Your Name] · [LinkedIn] · [Portfolio]