'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const sevColor = {
  P1: 'bg-red-100 text-red-800',
  P2: 'bg-orange-100 text-orange-800',
  P3: 'bg-yellow-100 text-yellow-800',
  P4: 'bg-blue-100 text-blue-800',
}

const statusColor = {
  open: 'bg-red-50 text-red-700',
  investigating: 'bg-yellow-50 text-yellow-700',
  mitigated: 'bg-blue-50 text-blue-700',
  closed: 'bg-green-50 text-green-700',
}

export default function IncidentsPage() {
  const [incidents, setIncidents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('incidents')
      .select('*, agents(name)')
      .order('reported_at', { ascending: false })
      .then(({ data }) => {
        setIncidents(data || [])
        setLoading(false)
      })
  }, [])

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">AI Incidents</h1>
        <p className="text-slate-600 mb-6">Track and mitigate AI agent incidents across the portfolio</p>
        
        {loading ? (
          <div className="text-slate-500">Loading incidents...</div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-100">
                <tr>
                  <th className="p-3 text-left">Severity</th>
                  <th className="p-3 text-left">Agent</th>
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-left">Description</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">MTTR (hrs)</th>
                </tr>
              </thead>
              <tbody>
                {incidents.map(i => (
                  <tr key={i.id} className="border-t">
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${sevColor[i.severity as keyof typeof sevColor]}`}>
                        {i.severity}
                      </span>
                    </td>
                    <td className="p-3 font-medium">{i.agents?.name}</td>
                    <td className="p-3 text-slate-600">{i.category}</td>
                    <td className="p-3 text-slate-600 text-sm">{i.description}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded text-xs ${statusColor[i.status as keyof typeof statusColor]}`}>
                        {i.status}
                      </span>
                    </td>
                    <td className="p-3 text-slate-700">{i.mttr_hours ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  )
}
