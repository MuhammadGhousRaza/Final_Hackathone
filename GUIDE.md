# 🏆 FINAL HACKATHON — GUIDE (Roman Urdu)

> **Yeh file parh lo — raat ka poora plan yahin hai.**
> Project folder: `D:\SMIT CLASS\Assignment\Final Hackathone`

---

## 📋 Project Ka Status

| Cheez | Status |
|-------|--------|
| Next.js 16 (JavaScript) + Tailwind CSS | ✅ Ready |
| Supabase packages (`supabase-js`, `ssr`) | ✅ Installed |
| Supabase boilerplate (client/server/middleware) | ✅ Ready |
| Supabase project + API keys | ⏳ **Aap ka kaam (raat ko)** |
| Hackathon task ka code | ⏳ Task milne par |
| Testing + deploy | ⏳ Aakhri stage |

---

## 🤝 KAAM KI TAQSEEM — Ka kya kaam hai?

### 🧑‍💻 GHOUS (Aap) ka kaam — sirf yeh 4 cheezein:
1. **Supabase project banana** (Step 1 neeche) — 5 minute
2. **SQL run karna** — jab ZCode code ke saath SQL de, use copy kar ke Supabase SQL Editor mein paste kar ke Run dabana — 1 minute
3. **API keys `.env.local` mein daalna** (Step 3 neeche) — 2 minute
4. **Vercel deploy karna** (sirf agar zaroorat ho) (Step 4 neeche) — 5 minute

### 🤖 ZCode (AI) ka kaam — baqi SAB kuch:
- Poora Next.js code — pages, components, styling
- Database schema ka SQL likhna (aap sirf paste karoge)
- Supabase queries, auth (agar task mein ho), API routes
- Errors dhoond kar fix karna
- App ko browser mein khol kar test karna (screenshots ke saath)
- Deploy ke liye ready karna

**👉 Matlab: aap sirf Supabase ke buttons dabao ge, code main likhunga.**

---

## 🌙 RAAT KA WORKFLOW (step by step)

1. **Task aaye** → poora text ZCode ko paste kar do (task ka PDF/docs ka content bhi)
2. **ZCode plan banayega** → approve kar dena (Approve button)
3. **ZCode code likhega** → phir aap ko bolega "SQL run karo" → neeche ka **SQL wala step** karo
4. **Keys check karo** → agar bole "keys daalo" → neeche ka **Step 3** karo
5. **ZCode app test karega** → browser mein khud khol kar check karega
6. **Demo/submission** → agar live URL chahiye to **Step 4** (Vercel)

---

## 🔧 AAP KE STEPS (detail mein)

### STEP 1 — Supabase Project Banana (sirf ek dafa)

1. Browser mein kholen: **[supabase.com](https://supabase.com)**
2. **Start your project** / **Sign in** → **GitHub se login** karo (sab se easy)
3. Login ke baad **New project** par click karo
4. Form bharo:
   - **Name:** `hackathon-project` (ya koi bhi naam)
   - **Database Password:** koi strong password likho — **kahin note kar lo, bhoolna nahi!** (maslan: `Hack@2026!xyz`)
   - **Region:** `Southeast Asia (Singapore)` — Pakistan ke sab se qareeb
   - **Pricing Plan:** Free hi rehne do
5. **Create new project** dabao → 2-3 minute lagega (coffee break ☕)

### SQL RUN KARNA (jab bhi ZCode SQL de)

1. Supabase khul lo → apna project kholo
2. **Left sidebar mein `SQL Editor`** par click karo (database icon)
3. **New query** (ya `+`) dabao
4. ZCode ka diya hua **poora SQL copy kar ke paste** karo
5. **Run** button dabao (niche ya upar)
6. **"Success. No rows returned"** jaisa message aaye to ho gaya ✅
7. ZCode ko bata do "SQL run kar diya"

> ⚠️ Note: Har table ke liye ZCode naya SQL dega — har dera yehi process.

### STEP 3 — API Keys `.env.local` Mein Daalna

1. Supabase mein **upar right `Connect`** ya **Settings (⚙️) → API** par jao
2. Wahan 2 cheezein milengi — dono copy karo:
   - **Project URL** (maslan: `https://abcdxyz.supabase.co`)
   - **anon public key** (lambi string — `eyJhbGci...` se shuru hoti hai)
3. Ab project folder mein **`.env.local`** file kholo (VS Code ya Notepad se)
4. Is tarhan paste karo (=`ke baad, quote ke bina):
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://abcdxyz.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...poorikey...
   ```
5. **Save** karo (Ctrl+S)
6. **Dev server restart karo**: terminal mein `Ctrl+C` dabao, phir `npm run dev` likho
   (ya ZCode ko bolo "restart karo" — woh kar dega)

> 🔒 **anon key public hoti hai — yeh share karna theek hai.** Lekin `service_role` key KABHI bhi use/share na karna!

### STEP 4 — Vercel Deploy (sirf agar live URL chahiye)

1. **[vercel.com](https://vercel.com)** → GitHub se login
2. Pehle project GitHub par push karo (GitHub Desktop app se: Add → Create repository → Publish)
3. Vercel par **Add New → Project** → apna repo select karo
4. **Environment Variables** section mein yeh 2 add karo (STEP 3 wali values):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. **Deploy** dabao → 2 minute mein live URL mil jayega 🎉

---

## ⚙️ KAAM KI COMMANDS

| Command | Kya karta hai |
|---------|---------------|
| `npm run dev` | App chalata hai → browser mein `http://localhost:3000` kholo |
| `npm run build` | Production build (deploy se pehle check) |
| `npm install` | Packages dobara install (agar node_modules delete ho) |

---

## 🚨 EMERGENCY TIPS (kuch gadbad ho to)

| Masla | Hal |
|-------|-----|
| App nahi chal raha | ZCode ko poora error copy kar ke do — fix karega |
| Keys dali, phir bhi error | Dev server **restart** karna zaroori hai (Ctrl+C → `npm run dev`) |
| `Port 3000 in use` | `npx next dev -p 3001` chalao → `localhost:3001` kholo |
| Supabase slow/hang | Page refresh karo; free plan thoda slow hota hai |
| Time khatam hone wala hai | ZCode se kaho "core features pe focus karo, baaki skip" |
| Demo se pehle | App ek dafa poori chala ke dekh lo + Supabase project open check karo (free plan 1 hafte inactive ho to pause kar deta hai) |

---

## 🔒 SECURITY RULES (hamesha yaad rakho)

1. **`service_role` key** Supabase mein → KABHI code mein, chat mein, ya GitHub par NAHI
2. `.env.local` file **khud hi git mein nahi jati** (gitignore mein already hai) — us se mat khelo
3. Database password alag se note kar lo — reset karna masla ban sakta hai raat ko
4. Demo ke waqt sirf `localhost` ya Vercel ka URL dikhao

---

## 📁 PROJECT KI STRUCTURE (reference)

```
Final Hackathone/
├── app/
│   ├── page.js          ← main page (abhi welcome screen hai)
│   ├── layout.js        ← app ka layout
│   └── globals.css      ← Tailwind + custom styles
├── lib/
│   └── supabase/
│       ├── client.js    ← browser se Supabase connect
│       ├── server.js    ← server se Supabase connect
│       └── middleware.js← session handling
├── middleware.js        ← Supabase auth middleware
├── .env.local           ← ⏳ RAAT KO KEYS YAHAN DAALNI HAIN
├── GUIDE.md             ← yeh file
└── package.json
```

---

## ✅ SUBMIT SE PEHLE CHECKLIST

- [ ] App `npm run dev` se sahi chal rahi hai
- [ ] Sab features browser mein test kiye
- [ ] Supabase mein data save ho raha hai (Table Editor mein dekh ke confirm)
- [ ] (Agar deploy kiya) live URL kisi doosre device/browser mein bhi khula
- [ ] Demo ke liye 2-3 minute ki story ready: masla kya tha → hum ne kya banaya → kaise kaam karta hai

**Allah kare sab acha ho — GOOD LUCK! 🏆**
