'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function NewIncidentPage() {
  const router = useRouter()
  const [agents, setAgents] = useState<any[]>([])
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    agent_id: '',
    severity: 'P2',
    category: 'Hallucination',
    description: '',
    status: 'open',
  })

  useEffect(() => {
    supabase.from('agents').select('id, name').order('name').then(({ data }) => setAgents(data || []))
  }, [])

  const update = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    if (!form.agent_id || !form.description) return
    setSaving(true)
    await supabase.from('incidents').insert(form)
    setSaving(false)
    setSaved(true)
    setTimeout(() => router.push('/incidents'), 1500)
  }

  if (saved) {
    return (
      <main className="min-h-screen bg-slate-50 p-8">
        <div className="max-w-2xl mx-auto text-center py-20">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Incident Logged</h2>
          <p className="text-slate-600">Redirecting to incidents...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-2xl mx-auto">
        <Link href="/incidents" className="text-blue-600 hover:underline flex items-center gap-1 mb-4 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Incidents
        </Link>
        <h1 className="text-3xl font-bold mb-6">Log New Incident</h1>

        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Affected Agent *</label>
            <select value={form.agent_id} onChange={e => update('agent_id', e.target.value)}
              className="w-full border rounded px-3 py-2 bg-white">
              <option value="">Select an agent...</option>
              {agents.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Severity</label>
            <select value={form.severity} onChange={e => update('severity', e.target.value)}
              className="w-full border rounded px-3 py-2 bg-white">
              <option value="P1">P1 — Critical</option>
              <option value="P2">P2 — High</option>
              <option value="P3">P3 — Medium</option>
              <option value="P4">P4 — Low</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
            <select value={form.category} onChange={e => update('category', e.target.value)}
              className="w-full border rounded px-3 py-2 bg-white">
              <option value="Hallucination">Hallucination</option>
              <option value="PII Leak">PII Leak</option>
              <option value="Bias">Bias</option>
              <option value="Prompt Injection">Prompt Injection</option>
              <option value="Performance">Performance</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description *</label>
            <textarea value={form.description} onChange={e => update('description', e.target.value)}
              placeholder="Describe what happened..."
              className="w-full border rounded px-3 py-2 h-24" />
          </div>

          <button
            onClick={handleSubmit}
            disabled={saving || !form.agent_id || !form.description}
            className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 disabled:bg-orange-300 font-medium"
          >
            {saving ? 'Saving...' : 'Log Incident'}
          </button>
        </div>
      </div>
    </main>
  )
}
