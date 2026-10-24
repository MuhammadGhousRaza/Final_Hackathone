import { json, requireRole, audit, notify } from '@/lib/api'
import { createUserWithProfile } from '@/lib/create-login'
import { tempPassword } from '@/lib/rules'

// GET — users list (admin)
export async function GET() {
  const { session, error } = await requireRole(['admin'])
  if (error) return error

  const { data } = await session.supabase
    .from('profiles')
    .select('*')
    .order('created_at')

  return json({ users: data })
}

// POST — HR login banana (admin)
export async function POST(req) {
  const { session, error } = await requireRole(['admin'])
  if (error) return error

  const { fullName, email } = await req.json()
  if (!fullName || !email) return json({ error: 'Name aur email zaroori' }, 400)

  const password = tempPassword()
  const res = await createUserWithProfile({ email, password, fullName, role: 'hr' })
  if (res.error) return json({ error: res.error }, 400)

  await audit(session.supabase, session, 'create', 'hr_login', res.user.id, null, { email, role: 'hr' })
  await notify(session.supabase, res.user.id, 'Welcome to HR', 'Admin ne aap ka HR account banaya hai')

  return json({ ok: true, tempPassword: password })
}

// PATCH — activate/deactivate (admin)
export async function PATCH(req) {
  const { session, error } = await requireRole(['admin'])
  if (error) return error

  const { id, active } = await req.json()
  if (!id || active === undefined) return json({ error: 'id aur active zaroori' }, 400)
  if (id === session.user.id) return json({ error: 'Apna khud ka account nahi' }, 400)

  const { error: e } = await session.supabase
    .from('profiles')
    .update({ active })
    .eq('id', id)
  if (e) return json({ error: e.message }, 400)

  await audit(session.supabase, session, 'update', 'profile_active', id, { active: !active }, { active })
  return json({ ok: true })
}
