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
        <span>JVDM—UI</span>
        <span>PARAMETRIC / SYSTEM / 2026</span>
      </aside>
      <a className="sr-only focus:not-sr-only" href="#main">
        Skip to content
      </a>
      <header className="site-nav sticky top-4 z-10 mx-4 lg:mx-auto lg:max-w-6xl">
        <div className="mx-auto flex items-center justify-between gap-4 rounded-xl border border-line bg-app/85 px-4 py-3 shadow-raised backdrop-blur lg:px-5">
          <a className="flex items-center gap-3 text-sm font-bold tracking-caps" href="#main">
            <span className="flex size-8 items-center justify-center rounded-xs bg-accent text-2xs text-on-accent">
              J/
            </span>
            jvdm-ui
          </a>
          <nav
            aria-label="Primary"
            className="flex items-center gap-3 text-xs text-ink-muted lg:gap-5"
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
        className="mx-auto flex max-w-7xl flex-col gap-40 px-5 py-20 lg:px-10 lg:py-28"
        id="main"
      >
        <div className="identity-chapter">
          <div className="chapter-index" aria-hidden="true">
            <span>00</span>
            <span>identity</span>
          </div>
          <Reveal>
            <Hero />
          </Reveal>
        </div>
        <div className="identity-chapter">
          <div className="chapter-index" aria-hidden="true">
            <span>01</span>
            <span>theme</span>
          </div>
          <Reveal delay={60}>
            <Playground />
          </Reveal>
        </div>
        <div className="identity-chapter">
          <div className="chapter-index" aria-hidden="true">
            <span>02</span>
            <span>catalog</span>
          </div>
          <Reveal delay={90}>
            <Gallery />
          </Reveal>
        </div>
        <div className="identity-chapter">
          <div className="chapter-index" aria-hidden="true">
            <span>03</span>
            <span>scales</span>
          </div>
          <Reveal delay={120}>
            <Scales />
          </Reveal>
        </div>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-7xl items-end justify-between gap-6 px-5 py-10 text-xs text-ink-dim lg:px-10">
          <div className="flex items-center gap-3">
            <span className="flex size-8 items-center justify-center rounded-xs bg-accent text-2xs text-on-accent">
              J/
            </span>
            <span>MIT · built with React 19 and Tailwind v4</span>
          </div>
          <span className="font-mono text-2xs tracking-code uppercase">end / begin again</span>
        </div>
      </footer>
    </div>
  );
}
