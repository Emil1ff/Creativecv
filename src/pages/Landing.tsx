import { Link } from "react-router";
import PageMeta from "../components/common/PageMeta";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <PageMeta
        title="Creative CV – Build a standout CV in minutes"
        description="Beautiful, ATS-friendly templates with AI assistance and one-click PDF export."
        image="/banner.png"
        keywords={["CV builder","resume","templates","AI resume","PDF export"]}
      />
      <header className="sticky top-0 z-30 w-full border-b border-gray-200 bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-gray-950/70">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-600 text-white font-bold">CV</div>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">Creative CV</span>
          </div>
          <nav className="hidden gap-6 text-sm font-medium text-gray-600 dark:text-gray-300 md:flex">
            <a href="#features" className="hover:text-gray-900 dark:hover:text-white">Features</a>
            <a href="#showcase" className="hover:text-gray-900 dark:hover:text-white">Showcase</a>
            <a href="#pricing" className="hover:text-gray-900 dark:hover:text-white">Pricing</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/signin" className="hidden rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-900 md:block">Sign in</Link>
            <Link to="/dashboard" className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-theme-sm hover:bg-brand-700">Open App</Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-brand-50 to-white dark:from-gray-900 dark:to-gray-950" />
          <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-brand-300/30 blur-3xl" />
          <div className="mx-auto max-w-7xl px-4 py-20 sm:py-28 md:py-32 sm:px-6 lg:px-8">
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div className="space-y-6">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                  Build a standout CV in minutes
                </h1>
                <p className="max-w-xl text-lg text-gray-600 dark:text-gray-300">
                  Beautiful, ATS-friendly templates and an intuitive editor. Export to PDF with one click.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <Link to="/create" className="rounded-lg bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-theme-md hover:bg-brand-700">
                    Get Started Free
                  </Link>
                  <Link to="/templates" className="rounded-lg border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-200 dark:hover:bg-gray-900">
                    Browse Templates
                  </Link>
                </div>
                <div className="flex items-center gap-6 pt-2 text-sm text-gray-500 dark:text-gray-400">
                  <div>PDF export</div>
                  <div>Drag & drop sections</div>
                  <div>AI suggestions</div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-10 -z-10 rounded-3xl bg-gradient-to-tr from-brand-300/30 to-brand-600/30 blur-3xl" />
                <img src="/images/cards/card-03.png" alt="CV Preview" className="w-full rounded-xl border border-gray-200 shadow-theme-lg dark:border-gray-800" />
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">Everything you need</h2>
          <p className="mt-2 max-w-2xl text-gray-600 dark:text-gray-300">
            Opinionated defaults with full control when you want it.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Modern templates", desc: "Curated designs for every industry.", icon: "M4 6h16M4 12h16M4 18h16" },
              { title: "AI assist", desc: "Bullet points and summaries in one click.", icon: "M12 6v12m6-6H6" },
              { title: "PDF export", desc: "Crisp, print-ready exports.", icon: "M6 18L18 6M6 6l12 12" },
              { title: "Drag & drop", desc: "Reorder sections instantly.", icon: "M4 4h16v16H4z" },
              { title: "Themeable", desc: "Pick colors and typography.", icon: "M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" },
              { title: "Autosave", desc: "Never lose your progress.", icon: "M5 13l4 4L19 7" },
            ].map((f) => (
              <div key={f.title} className="rounded-xl border border-gray-200 p-6 shadow-theme-sm transition hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-900/30">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d={f.icon} />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">{f.title}</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Showcase */}
        <section id="showcase" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <img src="/images/cards/card-01.png" alt="Template 1" className="rounded-xl border border-gray-200 dark:border-gray-800" />
            <img src="/images/cards/card-02.png" alt="Template 2" className="rounded-xl border border-gray-200 dark:border-gray-800" />
            <img src="/images/cards/card-03.png" alt="Template 3" className="rounded-xl border border-gray-200 dark:border-gray-800" />
          </div>
        </section>

        {/* Testimonials */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">Users are getting hired</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { name: "Aylin", role: "Product Designer", text: "Export looked crisp and ATS passed. I got 3 interviews in a week." },
              { name: "Kamran", role: "Frontend Developer", text: "AI suggestions helped me reword experience into strong bullets." },
              { name: "Nigar", role: "Marketing Lead", text: "Love the templates. PDF looked perfect on print." },
            ].map((t) => (
              <div key={t.name} className="rounded-xl border border-gray-200 p-6 shadow-theme-sm dark:border-gray-800">
                <div className="mb-4 flex items-center gap-3">
                  <img src="/images/user/user-01.jpg" alt="avatar" className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{t.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{t.role}</div>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">“{t.text}”</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="mx-auto max-w-7xl px-4 pb-24 pt-8 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 p-8 shadow-theme-lg dark:border-gray-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Free</h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Everything to get you started.</p>
              <p className="mt-6 text-4xl font-extrabold text-gray-900 dark:text-white">$0</p>
              <ul className="mt-6 space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <li>3 templates</li>
                <li>PDF export</li>
                <li>Basic AI suggestions</li>
              </ul>
              <Link to="/create" className="mt-8 inline-block rounded-lg border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-200 dark:hover:bg-gray-900">Start Free</Link>
            </div>
            <div className="relative rounded-2xl border border-brand-300 p-8 shadow-theme-xl ring-1 ring-brand-300/40 dark:border-brand-800">
              <div className="absolute -top-3 right-4 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">Popular</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Pro</h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Unlock all features and designs.</p>
              <p className="mt-6 text-4xl font-extrabold text-gray-900 dark:text-white">$6<span className="text-base font-semibold">/mo</span></p>
              <ul className="mt-6 space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <li>All templates</li>
                <li>Advanced AI assist</li>
                <li>Unlimited exports</li>
              </ul>
              <Link to="/create" className="mt-8 inline-block rounded-lg bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-theme-md hover:bg-brand-700">Go Pro</Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200 bg-white py-10 dark:border-gray-800 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <p className="text-sm text-gray-600 dark:text-gray-400">© {new Date().getFullYear()} Creative CV. All rights reserved.</p>
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <a href="#features" className="hover:text-gray-900 dark:hover:text-white">Features</a>
              <a href="#pricing" className="hover:text-gray-900 dark:hover:text-white">Pricing</a>
              <Link to="/help" className="hover:text-gray-900 dark:hover:text-white">Help</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}


