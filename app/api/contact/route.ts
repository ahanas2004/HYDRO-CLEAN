import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, company, phone, email, industry, service, requirement, isAudit } = body

    if (!name || !company || !phone) {
      return NextResponse.json({ success: false, message: 'Required fields missing' }, { status: 400 })
    }

    const subject = isAudit
      ? `Free Filtration Audit Request - ${company}`
      : `New Quote Request - ${company} | Hydroclean`

    const html = `
<div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;">
  <div style="background:linear-gradient(135deg,#2563EB,#1D4ED8);padding:2rem;border-radius:12px 12px 0 0;">
    <h1 style="color:white;font-size:1.5rem;margin:0;">${isAudit ? '🔍 Free Filtration Audit Request' : '💼 New Quote Request'}</h1>
    <p style="color:rgba(255,255,255,0.8);margin:.5rem 0 0;font-size:.875rem;">Received via Hydroclean Systems website</p>
  </div>
  <div style="background:white;padding:2rem;border:1px solid #E2E8F0;border-top:none;">
    <table style="width:100%;border-collapse:collapse;">
      ${[['Full Name',name],['Company',company],['Phone',phone],['Email',email||'—'],['Industry',industry||'—'],['Service',service||'—']].map(([k,v])=>`<tr><td style="padding:.625rem 0;border-bottom:1px solid #F1F5F9;font-size:.8125rem;font-weight:600;color:#64748B;width:40%">${k}</td><td style="padding:.625rem 0;border-bottom:1px solid #F1F5F9;font-size:.8125rem;color:#0F172A">${v}</td></tr>`).join('')}
    </table>
    ${requirement ? `<div style="margin-top:1.5rem;padding:1.25rem;background:#F8FAFC;border-radius:8px;border:1px solid #E2E8F0;"><div style="font-size:.75rem;font-weight:700;color:#64748B;margin-bottom:.5rem;text-transform:uppercase;letter-spacing:.08em">Requirement</div><p style="font-size:.9375rem;color:#0F172A;line-height:1.6;margin:0">${requirement}</p></div>` : ''}
  </div>
  <div style="background:#F8FAFC;padding:1rem 2rem;border:1px solid #E2E8F0;border-top:none;border-radius:0 0 12px 12px;text-align:center;">
    <p style="font-size:.75rem;color:#94A3B8;margin:0">hydrocleansystems.in · ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
  </div>
</div>`

    const RESEND_API_KEY = process.env.RESEND_API_KEY
    const TO_EMAIL = process.env.TO_EMAIL || 'info@hydrocleansystems.in'

    if (RESEND_API_KEY) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: 'Hydroclean Website <onboarding@resend.dev>', to: [TO_EMAIL], reply_to: email || undefined, subject, html }),
      })
      if (!res.ok) console.error('Resend error:', await res.text())
    } else {
      console.log('=== NEW LEAD (no Resend key) ===', { name, company, phone, email, industry, service, isAudit })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ success: false, message: 'Server error. Please try again.' }, { status: 500 })
  }
}
