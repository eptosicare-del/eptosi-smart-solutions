import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { resend, ADMIN_EMAIL, FROM_EMAIL, buildAdminEmailHtml, buildUserConfirmationHtml } from '@/lib/resend';
import { cookies } from 'next/headers';

// ── Rate limiting (simple in-memory, use Redis in prod) ──────
const rateMap = new Map<string, { count: number; ts: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now - entry.ts > 60_000) {
    rateMap.set(ip, { count: 1, ts: now });
    return false;
  }
  if (entry.count >= 5) return true;
  entry.count++;
  return false;
}

// ── Helper: verify admin session ─────────────────────────────
async function isAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  return token === process.env.ADMIN_JWT_SECRET;
}

// ── POST /api/inquiries — Submit new inquiry ─────────────────
export async function POST(req: NextRequest) {
  // Rate limiting
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests. Please wait a minute.' }, { status: 429 });
  }

  const body = await req.json();
  const { name, email, phone, company, message } = body;

  // Validation
  if (!name?.trim() || !email?.trim() || !phone?.trim() || !message?.trim()) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }
  if (message.trim().length < 10) {
    return NextResponse.json({ error: 'Message too short' }, { status: 400 });
  }

  try {
    const supabase = createServerClient();

    // Save to database
    const { data, error } = await supabase
      .from('inquiries')
      .insert([{
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        company: company?.trim() || null,
        message: message.trim(),
        status: 'new',
      }])
      .select()
      .single();

    if (error) throw error;

    // Send emails (non-blocking)
    await Promise.allSettled([
      // Admin notification
      resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `🚨 New Inquiry from ${name} — Eptosi Smart Solutions`,
        html: buildAdminEmailHtml({ name, email, phone, company, message }),
      }),
      // User confirmation
      resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: 'We received your inquiry — Eptosi Smart Solutions',
        html: buildUserConfirmationHtml(name),
      }),
    ]);

    return NextResponse.json({ success: true, id: data.id }, { status: 201 });
  } catch (err) {
    console.error('[POST /api/inquiries]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ── GET /api/inquiries — Admin: list all inquiries ───────────
export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json({ inquiries: data });
  } catch (err) {
    console.error('[GET /api/inquiries]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
