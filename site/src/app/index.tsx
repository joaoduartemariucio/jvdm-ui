import { ThemeToggle } from "jvdm-ui/atoms";

import { Gallery } from "../gallery";
import { Hero } from "../hero";
import { Playground } from "../playground";
import { Scales } from "../scales";

export function App() {
  return (
    <div className="min-h-screen">
      <a className="sr-only focus:not-sr-only" href="#main">
        Skip to content
      </a>
      <header className="sticky top-0 z-10 border-b border-line bg-app/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
          <a className="flex items-center gap-3 text-sm font-bold tracking-caps" href="#main">
            <span className="flex size-8 items-center justify-center rounded-xs bg-accent text-2xs text-on-accent">
              J/
            </span>
            jvdm-ui
          </a>
          <nav aria-label="Primary" className="flex items-center gap-4 text-xs text-ink-muted">
            <a className="transition-colors hover:text-ink" href="#theming">
              Theming
            </a>
            <a className="transition-colors hover:text-ink" href="#components">
              Components
            </a>
            <a className="transition-colors hover:text-ink" href="#scales">
              Scales
            </a>
            <a
              className="transition-colors hover:text-ink"
              href="https://github.com/joaoduartemariucio/jvdm-ui"
            >
              GitHub
            </a>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-32 px-6 py-24" id="main">
        <Hero />
        <Playground />
        <Gallery />
        <Scales />
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto max-w-5xl px-6 py-8 text-xs text-ink-dim">
          MIT · built with React 19 and Tailwind v4
        </div>
      </footer>
    </div>
  );
}
