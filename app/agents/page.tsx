'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const tierColor = {
  unacceptable: 'bg-red-100 text-red-800',
  high: 'bg-orange-100 text-orange-800',
  limited: 'bg-yellow-100 text-yellow-800',
  minimal: 'bg-green-100 text-green-800',
}

export default function AgentsPage() {
  const [agents, setAgents] = useState<any[]>([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    supabase.from('agents').select('*').order('created_at', { ascending: false })
      .then(({ data }) => setAgents(data || []))
  }, [])

  const filtered = filter === 'all' ? agents : agents.filter(a => a.risk_tier === filter)

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Agent Catalog</h1>
        <div className="mb-4">
          <select value={filter} onChange={e => setFilter(e.target.value)}
            className="border rounded px-3 py-2 bg-white">
            <option value="all">All Risk Tiers</option>
            <option value="unacceptable">Unacceptable</option>
            <option value="high">High</option>
            <option value="limited">Limited</option>
            <option value="minimal">Minimal</option>
          </select>
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-3 text-left">Agent</th>
                <th className="p-3 text-left">Owner</th>
                <th className="p-3 text-left">Model</th>
                <th className="p-3 text-left">Data</th>
                <th className="p-3 text-left">Risk Tier</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a.id} className="border-t">
                  <td className="p-3 font-medium">{a.name}</td>
                  <td className="p-3 text-slate-600">{a.owner}</td>
                  <td className="p-3 text-slate-600">{a.model}</td>
                  <td className="p-3 text-slate-600">{a.data_sensitivity}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs ${tierColor[a.risk_tier as keyof typeof tierColor]}`}>
                      {a.risk_tier}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
