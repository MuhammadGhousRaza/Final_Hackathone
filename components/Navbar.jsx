"use client";

import Link from "next/link";
import { Activity, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui";

export default function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-40 border-b border-white/5 bg-zinc-950/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="rounded-xl bg-gradient-to-br from-emerald-400 to-teal-400 p-2 shadow-lg shadow-emerald-500/25 transition-transform group-hover:scale-105">
            <Activity className="h-4 w-4 text-zinc-950" strokeWidth={2.5} />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            Pulse
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
          <a href="#features" className="transition-colors hover:text-white">
            Features
          </a>
          <a href="#stack" className="transition-colors hover:text-white">
            Stack
          </a>
          <Link href="/login" className="transition-colors hover:text-white">
            Sign in
          </Link>
        </nav>

        <Link href="/dashboard">
          <Button size="sm" className="hidden sm:inline-flex">
            Open Dashboard
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </div>
    </header>
  );
}
