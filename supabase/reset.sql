-- HCM LITE — RESET TO A FRESH INSTALL
-- Supabase SQL Editor mein sirf ek dafa run karein.
-- Is se current company, profiles/auth users, HR, employees aur operational
-- data delete ho jayega. Default leave rules system ke liye dobara add hoti hain.

truncate table
  public.ai_logs,
  public.audit_log,
  public.notifications,
  public.announcements,
  public.payslips,
  public.payroll_runs,
  public.leave_requests,
  public.attendance_corrections,
  public.attendance,
  public.employees,
  public.holidays,
  public.leave_types,
  public.designations,
  public.departments,
  public.profiles,
  public.company_settings
restart identity cascade;

-- Profiles auth.users se linked hain. Is delete se purane login accounts bhi
-- remove ho jate hain, taa-ke next user fresh setup kar sake.
delete from auth.users;

insert into public.leave_types (name, annual_quota) values
  ('annual', 14),
  ('sick', 8),
  ('casual', 10),
  ('unpaid', null);
