-- ============================================================
-- Eptosi Smart Solutions — Supabase Database Schema
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── Inquiries Table ──────────────────────────────────────────
create table if not exists public.inquiries (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  email       text not null,
  phone       text not null,
  company     text,
  message     text not null,
  status      text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ── Indexes ──────────────────────────────────────────────────
create index if not exists inquiries_status_idx on public.inquiries (status);
create index if not exists inquiries_created_idx on public.inquiries (created_at desc);
create index if not exists inquiries_email_idx on public.inquiries (email);

-- ── Auto-update updated_at ────────────────────────────────────
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger on_inquiries_update
  before update on public.inquiries
  for each row execute procedure public.handle_updated_at();

-- ── Row Level Security ────────────────────────────────────────
-- Public can INSERT (submit inquiries)
alter table public.inquiries enable row level security;

create policy "Anyone can submit inquiries"
  on public.inquiries for insert
  with check (true);

-- Only service role (server-side API) can read/update/delete
-- (This is enforced via the service role key in the API routes)

-- ── Sample inquiry (for testing) ─────────────────────────────
-- Uncomment to seed:
-- insert into public.inquiries (name, email, phone, company, message, status)
-- values ('Test User', 'test@example.com', '+91 99999 00000', 'Test Corp', 'I would like to learn more about eptoFlow and smart agriculture solutions.', 'new');
