---
description: Migrate personal-website to Astro
---

1. Verify Node.js and npm are installed.
   // turbo
   // (skip auto-run, just a check)
2. Scaffold a new Astro project in the current repository.
   // turbo
       bun create astro@latest . -- --template basics
3. Install project dependencies.
   // turbo
   bun install
4. Run the development server to verify the migration.
   // turbo
       bun run dev