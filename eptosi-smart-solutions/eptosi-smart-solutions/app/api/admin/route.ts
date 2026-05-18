import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Simple rate limiter for login attempts
const loginAttempts = new Map<string, { count: number; ts: number }>();

function isLoginRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry || now - entry.ts > 15 * 60_000) {
    loginAttempts.set(ip, { count: 1, ts: now });
    return false;
  }
  if (entry.count >= 10) return true;
  entry.count++;
  return false;
}

// ── POST /api/admin — Login ──────────────────────────────────
export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
  if (isLoginRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many login attempts. Please wait 15 minutes.' },
      { status: 429 }
    );
  }

  const { email, password } = await req.json();

  const validEmail = process.env.ADMIN_EMAIL;
  const validPassword = process.env.ADMIN_PASSWORD;
  const jwtSecret = process.env.ADMIN_JWT_SECRET;

  if (!email || !password || email !== validEmail || password !== validPassword) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // Set secure HttpOnly cookie
  const cookieStore = await cookies();
  cookieStore.set('admin_token', jwtSecret!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 8, // 8 hours
    path: '/',
  });

  return NextResponse.json({ success: true });
}

// ── DELETE /api/admin — Logout ───────────────────────────────
export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_token');
  return NextResponse.json({ success: true });
}

// ── GET /api/admin — Check auth ──────────────────────────────
export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  const isAuthed = token === process.env.ADMIN_JWT_SECRET;
  return NextResponse.json({ authenticated: isAuthed });
}
