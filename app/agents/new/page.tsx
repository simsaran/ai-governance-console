'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function NewAgentPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    name: '',
    owner: '',
    model: '',
    purpose: '',
    data_sensitivity: 'internal',
    risk_tier: 'minimal',
    deployed_at: '',
  })

  const update = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    if (!form.name || !form.owner || !form.model) return
    setSaving(true)
    await supabase.from('agents').insert({
      ...form,
      deployed_at: form.deployed_at || null,
      last_reviewed: new Date().toISOString().split('T')[0],
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => router.push('/agents'), 1500)
  }

  if (saved) {
    return (
      <main className="min-h-screen bg-slate-50 p-8">
        <div className="max-w-2xl mx-auto text-center py-20">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Agent Registered</h2>
          <p className="text-slate-600">Redirecting to catalog...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-2xl mx-auto">
        <Link href="/agents" className="text-blue-600 hover:underline flex items-center gap-1 mb-4 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Catalog
        </Link>
        <h1 className="text-3xl font-bold mb-6">Register New AI Agent</h1>
        <Link href="/agents/new" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm mb-4">+ Register New Agent</Link>

        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <Field label="Agent Name *" value={form.name} onChange={v => update('name', v)} placeholder="e.g. Customer Support Copilot" />
          <Field label="Owner / Team *" value={form.owner} onChange={v => update('owner', v)} placeholder="e.g. CX Team" />
          <Field label="Model *" value={form.model} onChange={v => update('model', v)} placeholder="e.g. Claude Sonnet 4.6" />
          <Field label="Purpose" value={form.purpose} onChange={v => update('purpose', v)} placeholder="e.g. Answer customer tickets" />

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Data Sensitivity</label>
            <select value={form.data_sensitivity} onChange={e => update('data_sensitivity', e.target.value)}
              className="w-full border rounded px-3 py-2 bg-white">
              <option value="public">Public</option>
              <option value="internal">Internal</option>
              <option value="confidential">Confidential</option>
              <option value="restricted">Restricted</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Risk Tier (EU AI Act)</label>
            <select value={form.risk_tier} onChange={e => update('risk_tier', e.target.value)}
              className="w-full border rounded px-3 py-2 bg-white">
              <option value="minimal">Minimal</option>
              <option value="limited">Limited</option>
              <option value="high">High</option>
              <option value="unacceptable">Unacceptable</option>
            </select>
          </div>

          <Field label="Deployment Date" value={form.deployed_at} onChange={v => update('deployed_at', v)} type="date" />

          <button
            onClick={handleSubmit}
            disabled={saving || !form.name || !form.owner || !form.model}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-blue-300 font-medium"
          >
            {saving ? 'Saving...' : 'Register Agent'}
          </button>
        </div>
      </div>
    </main>
  )
}

function Field({ label, value, onChange, placeholder, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border rounded px-3 py-2" />
    </div>
  )
}
