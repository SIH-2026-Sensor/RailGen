---
name: ui-ux-pro-max
description: >-
  Elite UI/UX design intelligence skill for Antigravity. Enforces award-winning aesthetic standards,
  typography pairing, cohesive HSL dark palettes, glassmorphism, Framer Motion spring physics,
  and modern bento-grid layouts.
---

# UI/UX Pro Max Design Intelligence

This skill equips the Antigravity agent with modern design sensibilities to build websites that look designed by top-tier studios (Apple, Vercel, Linear, Stripe, Raycast).

## Core Principles

### 1. Color Harmony & Atmosphere
- **Palette Foundation**:
  - Background: Deep Obsidian (`#09090b` / `#050508`)
  - Surface Glass: `rgba(255, 255, 255, 0.03)` with `backdrop-blur-xl`
  - Subtle Borders: `rgba(255, 255, 255, 0.08)`
  - Accents: Electric Indigo (`#6366f1`), Radiant Violet (`#8b5cf6`), Cyber Cyan (`#06b6d4`), Aurora Emerald (`#10b981`).
- **Ambient Lighting**: Always add radial glow backdrops to hero sections and focal cards.

### 2. Motion System (Framer Motion)
- **Spring Physics**:
  ```tsx
  transition={{ type: "spring", stiffness: 280, damping: 22 }}
  ```
- **Interactive States**:
  - Cards: `whileHover={{ y: -4, scale: 1.01 }}`
  - Buttons: `whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}`
  - List / Grid Staggering:
    ```tsx
    const container = {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: { staggerChildren: 0.12 }
      }
    };
    ```

### 3. Component Architecture
- **Header / Navigation**: Floating rounded pill glass navbar with status indicator badge and smooth mobile drawer.
- **Hero Section**: Eyebrow badge with glowing border, high-contrast gradient title, punchy subheading, dual CTA (primary glowing + secondary glass), and high-fidelity interactive product mockup.
- **Bento Grid**: Asymmetric 12-column grid showing real features, interactive widgets, metrics, and micro-animations.
- **Testimonials & Social Proof**: Animated infinite marquee or interactive cards.
- **Footer**: Clean multi-column grid with newsletter input, status indicator, and copyright.
