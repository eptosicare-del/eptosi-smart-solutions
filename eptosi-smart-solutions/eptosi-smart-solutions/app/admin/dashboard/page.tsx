'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Zap, LogOut, Search, Trash2, CheckCircle, Clock, Download,
  RefreshCw, Mail, Phone, Building, MessageSquare, TrendingUp,
  Users, AlertCircle, Eye, X,
} from 'lucide-react';
import type { Inquiry } from '@/types';
import { formatDate } from '@/lib/utils';

const STATUS_CONFIG = {
  new: { label: 'New', color: '#0ea5e9', bg: 'rgba(14,165,233,0.15)' },
  contacted: { label: 'Contacted', color: '#22c55e', bg: 'rgba(34,197,94,0.15)' },
  closed: { label: 'Closed', color: '#64748b', bg: 'rgba(100,116,139,0.15)' },
};

export default function AdminDashboard() {
  const router = useRouter();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'new' | 'contacted' | 'closed'>('all');
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchInquiries = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/inquiries');
      if (res.status === 401) { router.push('/admin/login'); return; }
      const data = await res.json();
      setInquiries(data.inquiries || []);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => { fetchInquiries(); }, [fetchInquiries]);

  const handleLogout = async () => {
    await fetch('/api/admin', { method: 'DELETE' });
    router.push('/admin/login');
  };

  const updateStatus = async (id: string, status: string) => {
    setActionLoading(id);
    try {
      await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      await fetchInquiries();
      if (selected?.id === id) setSelected(prev => prev ? { ...prev, status: status as Inquiry['status'] } : null);
    } finally {
      setActionLoading(null);
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm('Delete this inquiry permanently?')) return;
    setActionLoading(id);
    try {
      await fetch(`/api/inquiries/${id}`, { method: 'DELETE' });
      if (selected?.id === id) setSelected(null);
      await fetchInquiries();
    } finally {
      setActionLoading(null);
    }
  };

  const exportCSV = () => {
    const headers = 'Name,Email,Phone,Company,Message,Status,Date\n';
    const rows = inquiries.map(i =>
      `"${i.name}","${i.email}","${i.phone}","${i.company || ''}","${i.message.replace(/"/g, '""')}","${i.status}","${formatDate(i.created_at)}"`
    ).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `inquiries-${Date.now()}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  const filtered = inquiries.filter(i => {
    const matchFilter = filter === 'all' || i.status === filter;
    const q = search.toLowerCase();
    const matchSearch = !q || i.name.toLowerCase().includes(q) || i.email.toLowerCase().includes(q) || i.company?.toLowerCase().includes(q) || i.message.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  const stats = {
    total: inquiries.length,
    new: inquiries.filter(i => i.status === 'new').length,
    contacted: inquiries.filter(i => i.status === 'contacted').length,
    closed: inquiries.filter(i => i.status === 'closed').length,
  };

  return (
    <div className="min-h-screen" style={{ background: '#030712' }}>
      {/* Header */}
      <header
        className="sticky top-0 z-40 border-b border-white/10 px-6 py-4 flex items-center justify-between backdrop-blur-xl"
        style={{ background: 'rgba(3,7,18,0.9)' }}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-cyan-400 flex items-center justify-center">
            <Zap size={16} className="text-white" fill="currentColor" />
          </div>
          <div>
            <span className="text-white font-semibold text-sm">Admin Dashboard</span>
            <span className="hidden sm:block text-slate-500 text-xs">Eptosi Smart Solutions</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={fetchInquiries} className="p-2 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-all">
            <RefreshCw size={16} />
          </button>
          <button onClick={exportCSV} className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/10 text-slate-400 hover:text-white text-xs transition-all">
            <Download size={14} /> Export CSV
          </button>
          <button onClick={handleLogout} className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs transition-all">
            <LogOut size={14} /> Logout
          </button>
        </div>
      </header>

      <div className="p-6 max-w-7xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Inquiries', value: stats.total, icon: Users, color: '#0ea5e9' },
            { label: 'New Leads', value: stats.new, icon: TrendingUp, color: '#0ea5e9' },
            { label: 'Contacted', value: stats.contacted, icon: CheckCircle, color: '#22c55e' },
            { label: 'Closed', value: stats.closed, icon: Clock, color: '#64748b' },
          ].map(({ label, value, icon: Icon, color }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-2xl border border-white/10"
              style={{ background: 'rgba(255,255,255,0.02)' }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-slate-400 text-xs uppercase tracking-wider">{label}</span>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}15` }}>
                  <Icon size={15} style={{ color }} />
                </div>
              </div>
              <span className="text-3xl font-bold text-white">{value}</span>
            </motion.div>
          ))}
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, email, company..."
              className="input-field pl-10 w-full"
            />
          </div>
          <div className="flex gap-2">
            {(['all', 'new', 'contacted', 'closed'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-all duration-200 ${
                  filter === f
                    ? 'bg-sky-500 text-white'
                    : 'border border-white/10 text-slate-400 hover:border-white/20 hover:text-white'
                }`}
              >
                {f} {f !== 'all' && `(${stats[f as keyof typeof stats]})`}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-white/10 overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)' }}>
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <RefreshCw size={24} className="text-sky-400 animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16">
              <AlertCircle size={32} className="text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400">No inquiries found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    {['Name', 'Contact', 'Company', 'Status', 'Date', 'Actions'].map(h => (
                      <th key={h} className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((inquiry, i) => (
                    <motion.tr
                      key={inquiry.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-500 to-cyan-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                            {inquiry.name[0].toUpperCase()}
                          </div>
                          <span className="text-white text-sm font-medium">{inquiry.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-sky-400 text-xs">{inquiry.email}</p>
                        <p className="text-slate-400 text-xs">{inquiry.phone}</p>
                      </td>
                      <td className="px-5 py-4 text-slate-400 text-sm">{inquiry.company || '—'}</td>
                      <td className="px-5 py-4">
                        <span
                          className="px-2.5 py-1 rounded-full text-[11px] font-semibold"
                          style={{
                            background: STATUS_CONFIG[inquiry.status].bg,
                            color: STATUS_CONFIG[inquiry.status].color,
                          }}
                        >
                          {STATUS_CONFIG[inquiry.status].label}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-slate-400 text-xs whitespace-nowrap">{formatDate(inquiry.created_at)}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelected(inquiry)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-sky-400 hover:bg-sky-500/10 transition-all"
                            title="View"
                          >
                            <Eye size={14} />
                          </button>
                          {inquiry.status !== 'contacted' && (
                            <button
                              onClick={() => updateStatus(inquiry.id, 'contacted')}
                              disabled={actionLoading === inquiry.id}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-green-400 hover:bg-green-500/10 transition-all"
                              title="Mark contacted"
                            >
                              <CheckCircle size={14} />
                            </button>
                          )}
                          <button
                            onClick={() => deleteInquiry(inquiry.id)}
                            disabled={actionLoading === inquiry.id}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={e => e.stopPropagation()}
            className="w-full max-w-lg rounded-2xl border border-white/10 overflow-hidden"
            style={{ background: '#0f172a' }}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <h3 className="text-white font-semibold">Inquiry Details</h3>
              <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {[
                { icon: Users, label: 'Name', val: selected.name },
                { icon: Mail, label: 'Email', val: selected.email },
                { icon: Phone, label: 'Phone', val: selected.phone },
                { icon: Building, label: 'Company', val: selected.company || 'N/A' },
              ].map(({ icon: Icon, label, val }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon size={13} className="text-sky-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">{label}</p>
                    <p className="text-slate-200 text-sm">{val}</p>
                  </div>
                </div>
              ))}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center flex-shrink-0">
                  <MessageSquare size={13} className="text-sky-400" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Message</p>
                  <p className="text-slate-200 text-sm leading-relaxed">{selected.message}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 px-6 pb-6">
              {selected.status !== 'contacted' && (
                <button
                  onClick={() => updateStatus(selected.id, 'contacted')}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-400 hover:to-cyan-400 transition-all"
                >
                  Mark as Contacted
                </button>
              )}
              {selected.status !== 'closed' && (
                <button
                  onClick={() => updateStatus(selected.id, 'closed')}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-slate-300 border border-white/15 hover:border-white/30 transition-all"
                >
                  Close Inquiry
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
