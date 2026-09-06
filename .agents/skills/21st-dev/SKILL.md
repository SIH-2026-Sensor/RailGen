---
name: 21st-dev
description: >-
  Guide and workflow for sourcing, generating, and composing modern animated UI components
  from 21st.dev ("The npm for Design Engineers"), Aceternity, and Magic UI in Antigravity.
---

# 21st.dev Component Engineering Skill

21st.dev provides modern, animated React + Tailwind + Framer Motion components.

## Available Workflows

### 1. Direct Component CLI Integration
You can add components to this project via the CLI:
```bash
npx 21st@latest add <component-name>
```

### 2. Standard 21st.dev Components Archetypes
When crafting components inspired by 21st.dev in this project:
- **Glowing Button**: Button with animated border gradient and magnetic hover.
- **Spotlight Card**: Card with dynamic radial gradient tracking mouse position `(mouseX, mouseY)`.
- **Bento Grid**: Asymmetric feature card grid with integrated micro-illustrations and live metric cards.
- **Marquee**: Smooth continuous CSS/Framer Motion scrolling ticker for partner logos or reviews.
- **Background Grids / Beams**: Animated SVG background grid beams or particle constellations.

### 3. Utility Helpers
Ensure components use the standard `cn()` helper located at:
`src/lib/utils.ts`
```tsx
import { cn } from "@/lib/utils"; // or from "../lib/utils"
```
