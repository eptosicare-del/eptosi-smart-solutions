// ── Inquiry ────────────────────────────────────────────────────
export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
  status: 'new' | 'contacted' | 'closed';
  created_at: string;
  updated_at: string;
}

export type InquiryInsert = Omit<Inquiry, 'id' | 'created_at' | 'updated_at' | 'status'>;

// ── Admin ─────────────────────────────────────────────────────
export interface AdminUser {
  email: string;
  isAuthenticated: boolean;
}

// ── Nav Item ──────────────────────────────────────────────────
export interface NavItem {
  label: string;
  href: string;
}

// ── Product Card ──────────────────────────────────────────────
export interface ProductCard {
  icon: string;
  title: string;
  description: string;
  gradient: string;
  tag?: string;
}

// ── Stat ──────────────────────────────────────────────────────
export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

// ── Feature ───────────────────────────────────────────────────
export interface Feature {
  icon: string;
  title: string;
  description: string;
}

// ── Testimonial ───────────────────────────────────────────────
export interface Testimonial {
  name: string;
  role: string;
  company: string;
  message: string;
  rating: number;
  avatar: string;
}

// ── FAQ ───────────────────────────────────────────────────────
export interface FAQItem {
  question: string;
  answer: string;
}

// ── Contact Form ──────────────────────────────────────────────
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
}
