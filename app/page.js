import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Database,
  Globe,
  Layers,
  Lock,
  Play,
  ShieldCheck,
  Zap,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button, Card } from "@/components/ui";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    desc: "Built on Next.js App Router with server components and instant navigation.",
    color: "text-emerald-400 bg-emerald-500/10",
  },
  {
    icon: Database,
    title: "Realtime Database",
    desc: "Supabase Postgres with live queries — data syncs the moment it changes.",
    color: "text-emerald-400 bg-emerald-500/10",
  },
  {
    icon: ShieldCheck,
    title: "Secure Auth",
    desc: "Email & password authentication with protected routes and row-level security.",
    color: "text-emerald-400 bg-emerald-500/10",
  },
  {
    icon: BarChart3,
    title: "Live Analytics",
    desc: "Stats update in real time as your team creates and completes tasks.",
    color: "text-emerald-400 bg-emerald-500/10",
  },
  {
    icon: Layers,
    title: "Clean Architecture",
    desc: "Reusable components, environment-driven config, production-ready structure.",
    color: "text-emerald-400 bg-emerald-500/10",
  },
  {
    icon: Globe,
    title: "Deploy Anywhere",
    desc: "One-click Vercel deploy with edge-ready middleware and global CDN.",
    color: "text-emerald-400 bg-emerald-500/10",
  },
];

const stats = [
  { value: "100%", label: "Full-stack" },
  { value: "2 min", label: "Setup time" },
  { value: "0 $", label: "Running cost" },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,black,transparent)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-emerald-500/15 blur-[140px]" />
      <div className="pointer-events-none absolute top-40 right-[-120px] h-[320px] w-[320px] rounded-full bg-cyan-500/10 blur-[120px]" />

      <Navbar />

      <main className="relative">
        {/* Hero */}
        <section className="mx-auto flex max-w-6xl flex-col items-center px-6 pb-24 pt-40 text-center">
          <div className="animate-fade-up rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-xs font-medium text-emerald-300">
            Next.js + Supabase + Tailwind — full stack, zero backend code
          </div>

          <h1 className="animate-fade-up delay-100 mt-8 max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-7xl">
            Ship tasks at the
            <br />
            <span className="text-gradient">speed of thought</span>
          </h1>

          <p className="animate-fade-up delay-200 mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
            Pulse is a modern task intelligence dashboard — realtime data,
            secure authentication, and beautiful analytics. All running on a
            serverless stack your team already loves.
          </p>

          <div className="animate-fade-up delay-300 mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Link href="/login">
              <Button size="lg">
                <Play className="h-4 w-4" />
                Try the Live Demo
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="secondary">
                Open Dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="animate-fade-up delay-500 mt-16 flex items-center gap-12">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-bold text-white">{s.value}</p>
                <p className="mt-1 text-sm text-zinc-500">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mx-auto max-w-6xl scroll-mt-24 px-6 pb-24">
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Everything included,{" "}
              <span className="text-gradient">nothing compromised</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-zinc-400">
              A complete foundation so you can focus on your product, not the
              plumbing.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Card key={f.title} className="group p-6">
                <div
                  className={`inline-flex rounded-xl p-3 ${f.color} transition-transform duration-300 group-hover:scale-110`}
                >
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {f.desc}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* Stack / CTA */}
        <section id="stack" className="mx-auto max-w-6xl scroll-mt-24 px-6 pb-28">
          <Card className="relative overflow-hidden p-12 text-center glow-emerald">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-teal-500/10" />
            <div className="relative">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-400 shadow-lg shadow-emerald-500/30">
                <Lock className="h-6 w-6 text-zinc-950" strokeWidth={2.5} />
              </div>
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-white">
                Ready to see it in action?
              </h2>
              <p className="mx-auto mt-3 max-w-md text-zinc-400">
                Sign in with the demo account and watch data flow live from
                Supabase to your screen.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/signup">
                  <Button size="lg">Create free account</Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="secondary">
                    Sign in
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
}
