import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { agents, incidents } = await req.json()

    const openIncidents = incidents.filter((i: any) => i.status !== 'closed')
    const highRiskAgents = agents.filter((a: any) => a.risk_tier === 'high' || a.risk_tier === 'unacceptable')
    const categories = [...new Set(incidents.map((i: any) => i.category))].join(', ')

    const summary = `The enterprise AI portfolio currently comprises ${agents.length} registered agents, with ${highRiskAgents.length} classified as high or unacceptable risk under the EU AI Act framework — representing significant regulatory exposure ahead of the August 2026 enforcement deadline. There are ${openIncidents.length} open incidents across ${categories} categories, with a mean time to resolution of ${incidents.filter((i: any) => i.mttr_hours).length > 0 ? (incidents.filter((i: any) => i.mttr_hours).reduce((s: number, i: any) => s + Number(i.mttr_hours), 0) / incidents.filter((i: any) => i.mttr_hours).length).toFixed(1) : 'N/A'} hours. Recommended action: prioritize review of the ${highRiskAgents.length} high-risk agents and establish a 30-day remediation plan for all open P1 and P2 incidents to achieve audit readiness before Q3 compliance review.`

    return NextResponse.json({ summary })
  } catch (error) {
    console.error('Brief generation error:', error)
    return NextResponse.json({ summary: 'Failed to generate brief.' }, { status: 500 })
  }
}
