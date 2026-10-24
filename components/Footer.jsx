import Link from "next/link";
import { Activity, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <div className="rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-400 p-1.5">
            <Activity className="h-3 w-3 text-zinc-950" strokeWidth={2.5} />
          </div>
          <span className="text-sm font-semibold text-zinc-300">Pulse</span>
          <span className="text-sm text-zinc-600">
            — built for SMIT Final Hackathon
          </span>
        </div>

        <div className="flex items-center gap-6 text-sm text-zinc-500">
          <Link href="/login" className="transition-colors hover:text-white">
            Sign in
          </Link>
          <Link
            href="/dashboard"
            className="transition-colors hover:text-white"
          >
            Dashboard
          </Link>
          <a
            href="https://github.com/MuhammadGhousRaza/Final_Hackathone"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 transition-colors hover:text-white"
          >
            <ExternalLink className="h-4 w-4" />
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
