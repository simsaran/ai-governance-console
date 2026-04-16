'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Shield, AlertCircle, Activity, Clock } from 'lucide-react'

const TIER_COLORS: Record<string, string> = {
  unacceptable: '#dc2626',
  high: '#ea580c',
  limited: '#ca8a04',
  minimal: '#16a34a',
}

export default function Dashboard() {
  const [agents, setAgents] = useState<any[]>([])
  const [incidents, setIncidents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      supabase.from('agents').select('*'),
      supabase.from('incidents').select('*')
    ]).then(([a, i]) => {
      setAgents(a.data || [])
      setIncidents(i.data || [])
      setLoading(false)
    })
  }, [])

  // Calculations
  const reviewedRecently = agents.filter(a => {
    if (!a.last_reviewed) return false
    const daysAgo = (Date.now() - new Date(a.last_reviewed).getTime()) / (1000 * 60 * 60 * 24)
    return daysAgo <= 90
  }).length

  const auditReadiness = agents.length ? Math.round((reviewedRecently / agents.length) * 100) : 0
  const openIncidents = incidents.filter(i => i.status !== 'closed').length
  const mttrValues = incidents.filter(i => i.mttr_hours).map(i => i.mttr_hours)
  const avgMTTR = mttrValues.length ? (mttrValues.reduce((s, v) => s + Number(v), 0) / mttrValues.length).toFixed(1) : '—'

  const tierData = ['unacceptable', 'high', 'limited', 'minimal']
    .map(t => ({ name: t, value: agents.filter(a => a.risk_tier === t).length }))
    .filter(d => d.value > 0)

  const severityData = ['P1', 'P2', 'P3', 'P4'].map(s => ({
    severity: s,
    count: incidents.filter(i => i.severity === s).length
  }))

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-slate-500">Loading dashboard...</div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Compliance Dashboard</h1>
        <p className="text-slate-600 mb-6">Audit readiness, exposure, and portfolio risk</p>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <KPI label="Audit Readiness" value={`${auditReadiness}%`} icon={<Shield className="w-5 h-5 text-green-600" />} />
          <KPI label="Total Agents" value={agents.length} icon={<Activity className="w-5 h-5 text-blue-600" />} />
          <KPI label="Open Incidents" value={openIncidents} icon={<AlertCircle className="w-5 h-5 text-orange-600" />} />
          <KPI label="Avg MTTR (hrs)" value={avgMTTR} icon={<Clock className="w-5 h-5 text-purple-600" />} />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="font-semibold mb-4">Agents by Risk Tier (EU AI Act)</h2>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={tierData} dataKey="value" nameKey="name" label={({ name, value }) => `${name}: ${value}`}>
                  {tierData.map((e, i) => <Cell key={i} fill={TIER_COLORS[e.name]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="font-semibold mb-4">Incident Volume by Severity</h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={severityData}>
                <XAxis dataKey="severity" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </main>
  )
}

function KPI({ label, value, icon }: { label: string, value: any, icon: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-slate-500">{label}</div>
        {icon}
      </div>
      <div className="text-3xl font-bold text-slate-900">{value}</div>
    </div>
  )
}