export default function Home() {
  const steps = [
    { name: "Next.js setup (JavaScript + Tailwind)", done: true },
    { name: "Supabase boilerplate ready", done: true },
    { name: "Supabase project + API keys (.env.local)", done: true },
    { name: "Hackathon task ka code", done: false },
    { name: "Testing + final demo", done: false },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 px-4">
      <main className="w-full max-w-xl text-center">
        <p className="text-sm font-medium tracking-widest text-indigo-300 uppercase">
          SMIT Final Hackathon
        </p>
        <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
          Project Ready Hai 🚀
        </h1>
        <p className="mt-4 text-slate-300">
          Next.js (JavaScript) + Tailwind CSS + Supabase — setup complete.
          Ab task ka intezar hai!
        </p>

        <ul className="mt-10 space-y-3 text-left">
          {steps.map((step) => (
            <li
              key={step.name}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${
                step.done
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
                  : "border-slate-700 bg-slate-800/50 text-slate-300"
              }`}
            >
              <span className="text-lg">{step.done ? "✅" : "⏳"}</span>
              <span className="font-medium">{step.name}</span>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-xs text-slate-500">
          GUIDE.md parh lo — sab steps wahan hain
        </p>
      </main>
    </div>
  );
}
