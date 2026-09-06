---
name: stitch
description: >-
  Workflow and guidelines for translating Google Stitch AI vibe designs, wireframes, and design DNA
  into production-ready React, Tailwind, and Framer Motion code in Antigravity.
---

# Google Stitch AI Design-to-Code Skill

Google Stitch is an AI-powered visual workspace for designing user interfaces from natural language prompts, sketches, and screenshots.

## Stitch-to-Code Pipeline in Antigravity

1. **Design Ideation**:
   - Create screens, design tokens, and layout wireframes in [Google Stitch](https://stitch.withgoogle.com).
   - Export screen code, layouts, or prompt descriptions.

2. **Design DNA Extraction**:
   - Extract primary visual tokens:
     - Color schemes (backgrounds, surfaces, borders, dynamic accents)
     - Typography (header font weight, tracking, body scale)
     - Component geometry (border-radius, padding, elevation)
     - Spacing and grid layouts (12-col bento, responsive breakpoints)

3. **Production Implementation**:
   - Map Stitch screens to modular React components in `src/components/`.
   - Enhance static elements with Framer Motion spring physics and interactive hover states.
   - Connect live data or interactive state handlers.
