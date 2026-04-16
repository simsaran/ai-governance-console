import Link from 'next/link'
import { Shield, AlertTriangle, LayoutDashboard } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">
          AI Agent Governance Console
        </h1>
        <p className="text-slate-600 mb-8">
          Enterprise AI oversight aligned to EU AI Act & Canada AIDA
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/agents" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <Shield className="w-8 h-8 text-blue-600 mb-2" />
            <h2 className="font-semibold">Agent Catalog</h2>
            <p className="text-sm text-slate-500">Register and classify AI agents</p>
          </Link>
          <Link href="/incidents" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <AlertTriangle className="w-8 h-8 text-orange-600 mb-2" />
            <h2 className="font-semibold">Incidents</h2>
            <p className="text-sm text-slate-500">Log and track AI incidents</p>
          </Link>
          <Link href="/dashboard" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <LayoutDashboard className="w-8 h-8 text-green-600 mb-2" />
            <h2 className="font-semibold">Compliance Dashboard</h2>
            <p className="text-sm text-slate-500">Audit readiness & exposure</p>
          </Link>
        </div>
      </div>
    </main>
  )
}
