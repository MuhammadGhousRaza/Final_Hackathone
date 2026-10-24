-- ============================================
-- PULSE DEMO SCHEMA — Supabase SQL Editor mein run karo
-- (Supabase → SQL Editor → New query → yeh sab paste → Run)
-- ============================================

-- 1) Demo tasks table
create table if not exists public.demo_tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  status text not null default 'todo' check (status in ('todo', 'in_progress', 'done')),
  priority text not null default 'medium' check (priority in ('low', 'medium', 'high')),
  created_at timestamptz not null default now()
);

-- 2) Row Level Security (demo ke liye public access — hackathon demo mode)
alter table public.demo_tasks enable row level security;

drop policy if exists "demo_tasks_select" on public.demo_tasks;
drop policy if exists "demo_tasks_insert" on public.demo_tasks;
drop policy if exists "demo_tasks_update" on public.demo_tasks;
drop policy if exists "demo_tasks_delete" on public.demo_tasks;

create policy "demo_tasks_select" on public.demo_tasks
  for select to anon, authenticated using (true);

create policy "demo_tasks_insert" on public.demo_tasks
  for insert to anon, authenticated with check (true);

create policy "demo_tasks_update" on public.demo_tasks
  for update to anon, authenticated using (true) with check (true);

create policy "demo_tasks_delete" on public.demo_tasks
  for delete to anon, authenticated using (true);

-- 3) Seed data (demo ke liye 6 tasks)
insert into public.demo_tasks (id, title, status, priority) values
  ('a1000000-0000-4000-8000-000000000001', 'Design hero section animation', 'done', 'high'),
  ('a1000000-0000-4000-8000-000000000002', 'Setup Supabase connection', 'done', 'high'),
  ('a1000000-0000-4000-8000-000000000003', 'Build dashboard stats cards', 'in_progress', 'medium'),
  ('a1000000-0000-4000-8000-000000000004', 'Add search & filters', 'todo', 'medium'),
  ('a1000000-0000-4000-8000-000000000005', 'Write demo presentation script', 'todo', 'low'),
  ('a1000000-0000-4000-8000-000000000006', 'Deploy to Vercel', 'todo', 'high')
on conflict (id) do nothing;
