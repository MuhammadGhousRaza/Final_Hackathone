"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Circle,
  Clock3,
  Flame,
  LayoutDashboard,
  ListTodo,
  LogOut,
  Plus,
  Search,
  Settings,
  Trash2,
  UserRound,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import {
  Badge,
  Button,
  Card,
  Input,
  Modal,
  Select,
  Skeleton,
  StatCard,
} from "@/components/ui";

const STATUS = {
  todo: { label: "To Do", color: "zinc", icon: Circle },
  in_progress: { label: "In Progress", color: "amber", icon: Clock3 },
  done: { label: "Done", color: "emerald", icon: CheckCircle2 },
};

const PRIORITY = {
  low: { label: "Low", color: "zinc" },
  medium: { label: "Medium", color: "zinc" },
  high: { label: "High", color: "red" },
};

export default function DashboardPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tableMissing, setTableMissing] = useState(false);
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: "", status: "todo", priority: "medium" });
  const [formError, setFormError] = useState("");

  const loadTasks = useCallback(async (supabase) => {
    const { data, error } = await supabase
      .from("demo_tasks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      if (/does not exist|Missing schema/i.test(error.message)) {
        setTableMissing(true);
      }
    } else {
      setTasks(data || []);
      setTableMissing(false);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.replace("/login");
        return;
      }
      setUser(user);
      loadTasks(supabase);
    });
  }, [router, loadTasks]);

  async function handleAdd(e) {
    e.preventDefault();
    if (!form.title.trim()) {
      setFormError("Title is required");
      return;
    }
    setSaving(true);
    setFormError("");
    const supabase = createClient();
    const { error } = await supabase.from("demo_tasks").insert({
      title: form.title.trim(),
      status: form.status,
      priority: form.priority,
    });
    setSaving(false);
    if (error) {
      setFormError("Could not save: " + error.message);
      return;
    }
    setModalOpen(false);
    setForm({ title: "", status: "todo", priority: "medium" });
    loadTasks(supabase);
  }

  async function handleDelete(id) {
    const supabase = createClient();
    setTasks((t) => t.filter((x) => x.id !== id));
    await supabase.from("demo_tasks").delete().eq("id", id);
  }

  async function handleStatusChange(id, status) {
    const supabase = createClient();
    setTasks((t) => t.map((x) => (x.id === id ? { ...x, status } : x)));
    await supabase.from("demo_tasks").update({ status }).eq("id", id);
  }

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/login");
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return tasks;
    return tasks.filter((t) => t.title.toLowerCase().includes(q));
  }, [tasks, search]);

  const stats = useMemo(
    () => ({
      total: tasks.length,
      active: tasks.filter((t) => t.status === "in_progress").length,
      done: tasks.filter((t) => t.status === "done").length,
      high: tasks.filter((t) => t.priority === "high" && t.status !== "done").length,
    }),
    [tasks]
  );

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <div className="flex items-center gap-3 text-zinc-500">
          <Skeleton className="h-4 w-4 rounded-full" />
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Sidebar — desktop */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-white/5 bg-zinc-950/80 backdrop-blur-xl lg:flex">
        <Link href="/" className="flex h-16 items-center gap-2.5 px-6">
          <div className="rounded-xl bg-gradient-to-br from-emerald-400 to-teal-400 p-2 shadow-lg shadow-emerald-500/25">
            <Activity className="h-4 w-4 text-zinc-950" strokeWidth={2.5} />
          </div>
          <span className="text-lg font-bold text-white">Pulse</span>
        </Link>

        <nav className="mt-6 flex-1 space-y-1 px-3">
          <div className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-2.5 text-sm font-medium text-white">
            <LayoutDashboard className="h-4 w-4 text-emerald-400" />
            Dashboard
          </div>
          <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-zinc-500">
            <ListTodo className="h-4 w-4" />
            All Tasks
            <span className="ml-auto rounded-md bg-white/5 px-2 py-0.5 text-xs">
              {tasks.length}
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-zinc-500">
            <Settings className="h-4 w-4" />
            Settings
          </div>
        </nav>

        <div className="border-t border-white/5 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/10">
              <UserRound className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">
                {user.email}
              </p>
              <p className="text-xs text-zinc-500">Signed in</p>
            </div>
            <button
              onClick={handleLogout}
              title="Logout"
              className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-red-500/10 hover:text-red-400 cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="lg:pl-64">
        {/* Top bar — mobile */}
        <div className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/5 bg-zinc-950/80 px-6 backdrop-blur-xl lg:hidden">
          <Link href="/" className="flex items-center gap-2">
            <div className="rounded-lg bg-gradient-to-br from-emerald-400 to-teal-400 p-1.5">
              <Activity className="h-3 w-3 text-zinc-950" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-white">Pulse</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg p-2 text-sm text-zinc-400 hover:text-red-400 cursor-pointer"
          >
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>

        <main className="mx-auto max-w-6xl px-6 py-8">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">
                Dashboard
              </h1>
              <p className="mt-1 text-sm text-zinc-500">
                Live data — straight from Supabase Postgres
              </p>
            </div>
            <Button onClick={() => setModalOpen(true)}>
              <Plus className="h-4 w-4" />
              New Task
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard icon={ListTodo} label="Total Tasks" value={stats.total} />
            <StatCard icon={Clock3} label="In Progress" value={stats.active} />
            <StatCard icon={CheckCircle2} label="Completed" value={stats.done} />
            <StatCard icon={Flame} label="High Priority" value={stats.high} />
          </div>

          {/* Search */}
          <div className="relative mt-8 max-w-sm">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tasks..."
              className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-zinc-600 focus:border-emerald-400/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/20"
            />
          </div>

          {/* Table missing — setup card */}
          {tableMissing && (
            <Card className="mt-6 border-amber-500/20 bg-amber-500/5 p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-amber-500/10 p-3">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">
                    Database table missing
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                    The{" "}
                    <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-emerald-300">
                      demo_tasks
                    </code>{" "}
                    table doesn&apos;t exist in Supabase yet. Run the SQL from{" "}
                    <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-emerald-300">
                      supabase/schema.sql
                    </code>{" "}
                    in the Supabase SQL Editor (see GUIDE.md), then refresh —
                    live data will appear here.
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Table */}
          <Card className="mt-6 overflow-hidden">
            {loading ? (
              <div className="space-y-3 p-6">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : filtered.length === 0 && !tableMissing ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="rounded-2xl bg-white/5 p-4">
                  <ListTodo className="h-7 w-7 text-zinc-500" />
                </div>
                <h3 className="mt-5 font-semibold text-white">
                  {search ? "No matching tasks" : "No tasks yet"}
                </h3>
                <p className="mt-1 text-sm text-zinc-500">
                  {search
                    ? "try a different search"
                    : "Add your first task to get started"}
                </p>
                {!search && (
                  <Button className="mt-6" size="sm" onClick={() => setModalOpen(true)}>
                    <Plus className="h-3.5 w-3.5" /> New Task
                  </Button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/5 text-xs uppercase tracking-wider text-zinc-500">
                      <th className="px-6 py-4 font-medium">Task</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium">Priority</th>
                      <th className="px-6 py-4 font-medium">Created</th>
                      <th className="px-6 py-4" />
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((task) => {
                      const st = STATUS[task.status] || STATUS.todo;
                      const pr = PRIORITY[task.priority] || PRIORITY.medium;
                      return (
                        <tr
                          key={task.id}
                          className="group border-b border-white/5 transition-colors last:border-0 hover:bg-white/[0.03]"
                        >
                          <td className="px-6 py-4">
                            <span
                              className={`font-medium ${task.status === "done" ? "text-zinc-500 line-through" : "text-white"}`}
                            >
                              {task.title}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <select
                              value={task.status}
                              onChange={(e) =>
                                handleStatusChange(task.id, e.target.value)
                              }
                              className="cursor-pointer appearance-none rounded-full border border-white/10 bg-white/5 px-1 py-0.5 text-xs focus:outline-none [&>option]:bg-zinc-900"
                            >
                              {Object.entries(STATUS).map(([key, s]) => (
                                <option key={key} value={key}>
                                  {s.label}
                                </option>
                              ))}
                            </select>
                            <span className="ml-2 inline-flex lg:hidden">
                              <Badge color={st.color}>{st.label}</Badge>
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <Badge color={pr.color}>
                              <Flame className="h-3 w-3" />
                              {pr.label}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-zinc-500">
                            {new Date(task.created_at).toLocaleDateString(
                              "en-GB",
                              { day: "numeric", month: "short" }
                            )}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => handleDelete(task.id)}
                              title="Delete"
                              className="rounded-lg p-2 text-zinc-600 opacity-0 transition-all hover:bg-red-500/10 hover:text-red-400 focus:opacity-100 group-hover:opacity-100 cursor-pointer"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </Card>

          <p className="mt-6 flex items-center gap-1.5 text-xs text-zinc-600">
            <ArrowRight className="h-3 w-3" />
            Data is live from Supabase — everything you add or delete is saved
            to the database
          </p>
        </main>
      </div>

      {/* Add Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="New Task">
        <form onSubmit={handleAdd} className="space-y-5">
          <Input
            label="Title"
            placeholder="e.g. Deploy to Vercel"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            autoFocus
          />
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Status"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              {Object.entries(STATUS).map(([key, s]) => (
                <option key={key} value={key}>
                  {s.label}
                </option>
              ))}
            </Select>
            <Select
              label="Priority"
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
            >
              {Object.entries(PRIORITY).map(([key, p]) => (
                <option key={key} value={key}>
                  {p.label}
                </option>
              ))}
            </Select>
          </div>

          {formError && (
            <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300 animate-fade-in">
              {formError}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" loading={saving}>
              Add Task
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
