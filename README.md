# RailGen — Intelligent Railway Maintenance & Block Planning Platform

> **Indian Railways AI-Assisted Maintenance Coordination & Automated Block Planning Platform**  
> Unifying Permanent Way (Civil Engineering), Traction Distribution (TRD), and Signal & Telecom (S&T) with Operating Control (PCOM / Sr. DOM).

---

## 🚆 Overview

**RailGen** is a next-generation railway operations intelligence platform built specifically for Indian Railways. It eliminates fragmented departmental maintenance scheduling by unifying block requests, real-time telemetry, defect logs, and AI conflict resolution into a single synchronized timetable.

### Key Highlights
- **Unified Mega-Block Planning**: Synchronizes civil tamping, catenary inspection, and signaling point testing into coordinated windows, drastically reducing train delay minutes.
- **Strict Role-Based Isolation**: 5 dedicated desks for Admin (PCOM), Operating Manager (Sr. DOM), Civil Engineering (Sr. DEN), Traction Distribution (DEE TRD), and Signal & Telecom (DSTE).
- **Multi-Device Responsive**: Fully optimized across mobile phones, tablets, laptops, and ultra-wide screens with an adaptive off-canvas drawer and touch-scrolling data tables.
- **Zero Generic Colors**: Designed with curated HSL color tokens, glassmorphism, and Indian Railways visual identity standards.

---

## 🏛️ Operational Desks

1. **Operating Manager Desk (`/manager`)**: Real-time corridor overview, pending block approvals command center, maintenance workboard, and weekly/monthly corridor schedules.
2. **Civil Engineering Desk (`/engineering`)**: USFD ultrasonic rail flaw detection ledger, track inspection records, and civil block demand requisition.
3. **Traction TRD Desk (`/traction`)**: Live SCADA traction substation monitoring, 25 kV catenary status, and power isolation requests.
4. **Signal & Telecom Desk (`/signal-telecom`)**: Real-time interlocking status, track circuit telemetry, and signal maintenance block requests.
5. **Admin Desk (`/admin`)**: Personnel directory management, departmental RBAC access policies, and audit ledger tracking.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4, Vanilla CSS Design Tokens
- **Icons**: Lucide React
- **Animations**: CSS Spring Physics & Micro-interactions
- **Routing**: React Router v7

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18.0.0 or later)
- npm (v9.0.0 or later)

### Installation
```bash
# Clone the repository
git clone https://github.com/SIH-2026-Sensor/RailGen.git
cd RailGen

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 📁 Clean Directory Structure

```
RailGen/
├── .agents/                # Design intelligence & agent skills
├── public/                 # Static assets & public resources
├── src/
│   ├── assets/             # Imagery (corridors, trains, emblems, logos)
│   ├── components/
│   │   ├── common/         # DepartmentBadge, StatusBadge
│   │   └── layout/         # AppShell, Sidebar, Topbar
│   ├── context/            # RailGenContext (telemetry, state & auth)
│   ├── lib/                # Shared utilities
│   ├── pages/
│   │   ├── admin/          # AdminOverview & governance
│   │   ├── engineering/    # Track inspection & civil engineering
│   │   ├── manager/        # Operating manager command center
│   │   ├── public/         # Landing (Home), Login, SignUp, ForgotPassword
│   │   ├── signal/         # Signal & telecom telemetry
│   │   └── traction/       # Power monitoring & TRD
│   ├── App.jsx             # Route definitions
│   ├── index.css           # Design tokens, responsive media queries
│   └── main.jsx            # Application entry point
├── index.html              # HTML5 template
├── package.json            # Project dependencies & scripts
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite build configuration
```

---

## 🛡️ License
Built for Indian Railways — Smart India Hackathon (SIH 2026).
