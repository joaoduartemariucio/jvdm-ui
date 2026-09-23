import { ThemeToggle } from "jvdm-ui/atoms";

import { Gallery } from "../gallery";
import { Hero } from "../hero";
import { Playground } from "../playground";
import { Reveal } from "../reveal";
import { Scales } from "../scales";

export function App() {
  return (
    <div className="site-shell min-h-screen">
      <aside aria-hidden="true" className="identity-rail">
        <span>JVDM/UI</span>
        <span>PARAMETRIC SYSTEM</span>
      </aside>
      <a className="sr-only focus:not-sr-only" href="#main">
        Skip to content
      </a>
      <header className="site-nav sticky top-0 z-10 border-b border-line bg-app/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 lg:px-10">
          <a className="flex items-center gap-3 text-sm font-bold" href="#main">
            <span className="site-mark" aria-hidden="true">
              J/
            </span>
            <span>jvdm-ui</span>
          </a>
          <nav
            aria-label="Primary"
            className="flex items-center gap-4 text-xs text-ink-muted lg:gap-7"
          >
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

      <main
        className="site-main mx-auto flex max-w-7xl flex-col gap-32 px-5 py-16 lg:gap-48 lg:px-10 lg:py-24"
        id="main"
      >
        <Reveal>
          <Hero />
        </Reveal>
        <Reveal delay={60}>
          <Playground />
        </Reveal>
        <Reveal delay={90}>
          <Gallery />
        </Reveal>
        <Reveal delay={120}>
          <Scales />
        </Reveal>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-7xl items-end justify-between gap-6 px-5 py-10 text-xs text-ink-dim lg:px-10">
          <div className="flex items-center gap-3">
            <span className="site-mark" aria-hidden="true">
              J/
            </span>
            <span>MIT licensed. Built with React 19 and Tailwind v4.</span>
          </div>
          <span className="font-mono text-2xs tracking-code uppercase">rules / freedom</span>
        </div>
      </footer>
    </div>
  );
}
