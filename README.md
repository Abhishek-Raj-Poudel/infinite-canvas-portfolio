# Infinite Canvas Portfolio

A portfolio website built with an infinite canvas navigation pattern. Drag to explore different sections scattered across a boundless workspace.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4
- **Language:** TypeScript
- **Package Manager:** pnpm

## Project Structure

```
app/
├── hooks/
│   └── useCanvasPan.ts           # Custom hook: drag + pan logic
├── components/
│   ├── CanvasSection.tsx         # Reusable positioned section
│   └── sections/                 # (future) individual sections
├── page.tsx                      # Main page
├── layout.tsx                    # Root layout
└── globals.css                   # Tailwind imports
```

## How It Works

### Canvas Mechanics

1. **Viewport** — outer `div` with `overflow: hidden` clips content
2. **Canvas** — inner `div` moves via `transform: translate(x, y)`
3. **Drag to pan** — mouse/touch events update offset
4. **Centered start** — canvas origin initialized at screen center

### useCanvasPan Hook

```tsx
const { offset, isReady, handlers } = useCanvasPan();

// offset: { x, y } — current pan position
// isReady: boolean — true after centering
// handlers: { onMouseDown, onTouchStart } — attach to container
```

### CanvasSection Component

```tsx
<CanvasSection x={0} y={0}>
  {/* Centered at origin */}
</CanvasSection>

<CanvasSection x={-400} y={-600}>
  {/* 400px left, 600px up from center */}
</CanvasSection>
```

## Getting Started

```bash
# Install dependencies
pnpm install

# Run dev server
pnpm dev

# Open http://localhost:3000
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm format` | Format files (if Prettier installed) |

## Canvas Layout

Sections are positioned relative to center (0, 0):

```
                  (0, -600)
                     │
                     ▼
              ┌───────────┐
              │   ABOUT   │
              └───────────┘
                     │
(-400, 0) ──→ ┌───────────┐
              │   HERO    │ ← (0, 0)
              │  (center) │
              └───────────┘
                     │
                     ▼
              ┌───────────┐
              │ PROJECTS  │
              └───────────┘
```

## Future Enhancements

- [ ] Navigation buttons to pan between sections
- [ ] Inertia/smooth stop after drag release
- [ ] Zoom support (scroll wheel)
- [ ] CMS integration for dynamic content
- [ ] Additional sections (Projects, Notes, Contact, Gallery)
- [ ] Decorative elements (arrows, stickers)
- [ ] Mobile-optimized layout
