import { ThemeToggle } from "jvdm-ui/atoms";

import { Gallery } from "../gallery";
import { Hero } from "../hero";
import { Playground } from "../playground";
import { Scales } from "../scales";

export function App() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-line bg-app/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
          <span className="text-sm font-bold tracking-caps">jvdm-ui</span>
          <nav className="flex items-center gap-4 text-xs text-ink-muted">
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

      <main className="mx-auto flex max-w-5xl flex-col gap-24 px-6 py-20">
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
