import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@eptosismartsolutions.com';
export const FROM_EMAIL = 'noreply@eptosismartsolutions.com';

// ── Email: Admin Notification ──────────────────────────────────
export function buildAdminEmailHtml(data: {
  name: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
}): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #030712; color: #e2e8f0; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .header { background: linear-gradient(135deg, #0ea5e9, #06b6d4); border-radius: 12px 12px 0 0; padding: 30px; text-align: center; }
    .header h1 { color: #fff; margin: 0; font-size: 24px; font-weight: 700; }
    .header p { color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 14px; }
    .body { background: #0f172a; border: 1px solid rgba(14,165,233,0.2); border-top: none; border-radius: 0 0 12px 12px; padding: 30px; }
    .field { margin-bottom: 20px; }
    .label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #0ea5e9; margin-bottom: 6px; }
    .value { font-size: 15px; color: #e2e8f0; padding: 12px 16px; background: rgba(14,165,233,0.1); border: 1px solid rgba(14,165,233,0.2); border-radius: 8px; line-height: 1.6; }
    .badge { display: inline-block; background: linear-gradient(135deg, #22c55e, #16a34a); color: #fff; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px; }
    .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #475569; }
    .cta { display: block; text-align: center; margin: 24px 0 0; }
    .btn { display: inline-block; background: linear-gradient(135deg, #0ea5e9, #06b6d4); color: #fff; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 600; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>⚡ New Inquiry Received</h1>
      <p>Eptosi Smart Solutions — Lead Management</p>
    </div>
    <div class="body">
      <p style="color:#94a3b8;margin:0 0 24px;font-size:14px;">
        A new inquiry has been submitted via the website contact form. <span class="badge">New Lead</span>
      </p>
      <div class="field">
        <div class="label">Full Name</div>
        <div class="value">${data.name}</div>
      </div>
      <div class="field">
        <div class="label">Email Address</div>
        <div class="value"><a href="mailto:${data.email}" style="color:#0ea5e9;">${data.email}</a></div>
      </div>
      <div class="field">
        <div class="label">Phone Number</div>
        <div class="value"><a href="tel:${data.phone}" style="color:#0ea5e9;">${data.phone}</a></div>
      </div>
      ${data.company ? `<div class="field"><div class="label">Company / Organization</div><div class="value">${data.company}</div></div>` : ''}
      <div class="field">
        <div class="label">Message</div>
        <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
      </div>
      <div class="cta">
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/dashboard" class="btn">View in Admin Dashboard →</a>
      </div>
    </div>
    <div class="footer">
      <p>Eptosi Smart Solutions · Part of Eptosi Group of Companies<br>
      This is an automated notification. Do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

// ── Email: User Confirmation ───────────────────────────────────
export function buildUserConfirmationHtml(name: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #030712; color: #e2e8f0; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .header { background: linear-gradient(135deg, #0ea5e9, #06b6d4); border-radius: 12px 12px 0 0; padding: 40px 30px; text-align: center; }
    .logo { font-size: 28px; font-weight: 800; color: #fff; letter-spacing: -0.5px; }
    .logo span { color: #bae6fd; }
    .header h2 { color: #fff; margin: 16px 0 0; font-size: 20px; }
    .body { background: #0f172a; border: 1px solid rgba(14,165,233,0.2); border-top: none; border-radius: 0 0 12px 12px; padding: 36px 30px; }
    .greeting { font-size: 18px; font-weight: 600; color: #f1f5f9; margin-bottom: 16px; }
    .text { font-size: 15px; color: #94a3b8; line-height: 1.7; margin-bottom: 16px; }
    .highlight { color: #0ea5e9; font-weight: 600; }
    .divider { border: none; border-top: 1px solid rgba(14,165,233,0.15); margin: 28px 0; }
    .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #475569; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">EPTOSI <span>SMART</span></div>
      <h2>Thank you for reaching out! 🚀</h2>
    </div>
    <div class="body">
      <div class="greeting">Hello ${name},</div>
      <p class="text">
        We've received your inquiry and our team at <span class="highlight">Eptosi Smart Solutions</span>
        will get back to you within <span class="highlight">24–48 business hours</span>.
      </p>
      <p class="text">
        We're excited to learn more about your project and explore how our IoT and automation
        solutions can help transform your operations.
      </p>
      <hr class="divider">
      <p class="text" style="font-size:13px;">
        <strong style="color:#e2e8f0;">Eptosi Smart Solutions</strong><br>
        Smart IoT & Automation Solutions for the Future<br>
        Part of Eptosi Group of Companies<br><br>
        🌐 <a href="https://eptosismartsolutions.com" style="color:#0ea5e9;">eptosismartsolutions.com</a>
      </p>
    </div>
    <div class="footer">
      <p>You received this because you submitted an inquiry on our website.<br>
      © 2024 Eptosi Smart Solutions. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}
