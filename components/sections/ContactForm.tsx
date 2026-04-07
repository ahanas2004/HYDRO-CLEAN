'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react'

const industries = ['Automobile Manufacturing','Steel & Metals','Power Generation','Cement & Mining','Rubber & Plastics','Oil & Petrochemical','Pharmaceuticals','Other']
const services = ['Industrial Oil Filtration Machines','Fine Filtration Services','Hydraulic Oil Purification','Coolant Management Systems','Oil Condition Monitoring','Turnkey Plant Integration','Not Sure Yet']

interface FormData {
  name: string; company: string; phone: string; email: string
  industry: string; service: string; requirement: string; isAudit: boolean
}

export default function ContactForm() {
  const params = useSearchParams()
  const isAudit = params?.get('audit') === 'true'

  const [form, setForm] = useState<FormData>({ name:'', company:'', phone:'', email:'', industry:'', service:'', requirement:'', isAudit })
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')
  const [error, setError] = useState('')

  useEffect(() => { setForm(f => ({ ...f, isAudit })) }, [isAudit])

  const update = (k: keyof FormData, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.company || !form.phone) { setError('Please fill in required fields.'); return }
    setStatus('loading'); setError('')
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (data.success) setStatus('success')
      else { setStatus('error'); setError(data.message || 'Something went wrong.') }
    } catch { setStatus('error'); setError('Network error. Please try again.') }
  }

  const inputStyle = { width: '100%', background: 'white', border: '1.5px solid #E2E8F0', borderRadius: '10px', padding: '0.875rem 1rem', fontFamily: '"Plus Jakarta Sans",sans-serif', fontSize: '0.9375rem', color: '#0F172A', outline: 'none', transition: 'all 0.2s', boxSizing: 'border-box' as const }
  const labelStyle = { display: 'block', fontFamily: '"Plus Jakarta Sans",sans-serif', fontSize: '0.8125rem', fontWeight: 600, color: '#0F172A', marginBottom: '0.4rem' }

  if (status === 'success') return (
    <div style={{ textAlign: 'center', padding: '3rem', maxWidth: '500px', margin: '0 auto' }}>
      <div style={{ width: '72px', height: '72px', background: '#D1FAE5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
        <CheckCircle size={36} color="#10B981" />
      </div>
      <h3 className="display-md" style={{ marginBottom: '0.75rem' }}>Inquiry Received!</h3>
      <p className="body-md" style={{ marginBottom: '1.5rem' }}>Our engineers will review your requirement and respond within 24 hours. Check your email for confirmation.</p>
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        {['+91 98400 00000', 'info@hydrocleansystems.in'].map(c => (
          <div key={c} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '0.625rem 1rem', fontFamily: '"Plus Jakarta Sans",sans-serif', fontSize: '0.8125rem', color: '#475569', fontWeight: 500 }}>{c}</div>
        ))}
      </div>
    </div>
  )

  return (
    <form onSubmit={handleSubmit}>
      {/* Audit toggle */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
        {[{ id: false, label: 'Get a Quote' }, { id: true, label: 'Free Filtration Audit' }].map(opt => (
          <button key={String(opt.id)} type="button" onClick={() => update('isAudit', String(opt.id) as any)}
            style={{ flex: 1, padding: '0.75rem', borderRadius: '10px', border: '1.5px solid', borderColor: form.isAudit === opt.id ? '#2563EB' : '#E2E8F0', background: form.isAudit === opt.id ? '#EFF6FF' : 'white', fontFamily: '"Plus Jakarta Sans",sans-serif', fontSize: '0.875rem', fontWeight: 600, color: form.isAudit === opt.id ? '#2563EB' : '#64748B', cursor: 'pointer', transition: 'all 0.2s' }}>
            {opt.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '1rem' }}>
        {[
          { key: 'name', label: 'Full Name *', placeholder: 'Your full name', type: 'text' },
          { key: 'company', label: 'Company *', placeholder: 'Company name', type: 'text' },
        ].map(f => (
          <div key={f.key}>
            <label style={labelStyle}>{f.label}</label>
            <input type={f.type} placeholder={f.placeholder} value={(form as any)[f.key]} onChange={e => update(f.key as keyof FormData, e.target.value)} required
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#2563EB'}
              onBlur={e => e.target.style.borderColor = '#E2E8F0'} />
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '1rem', marginTop: '1rem' }}>
        <div>
          <label style={labelStyle}>Phone *</label>
          <input type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e => update('phone', e.target.value)} required
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = '#2563EB'}
            onBlur={e => e.target.style.borderColor = '#E2E8F0'} />
        </div>
        <div>
          <label style={labelStyle}>Email</label>
          <input type="email" placeholder="email@company.com" value={form.email} onChange={e => update('email', e.target.value)}
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = '#2563EB'}
            onBlur={e => e.target.style.borderColor = '#E2E8F0'} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '1rem', marginTop: '1rem' }}>
        <div>
          <label style={labelStyle}>Industry</label>
          <select value={form.industry} onChange={e => update('industry', e.target.value)}
            style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' }}
            onFocus={e => e.target.style.borderColor = '#2563EB'}
            onBlur={e => e.target.style.borderColor = '#E2E8F0'}>
            <option value="">Select industry</option>
            {industries.map(i => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Service Needed</label>
          <select value={form.service} onChange={e => update('service', e.target.value)}
            style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' }}
            onFocus={e => e.target.style.borderColor = '#2563EB'}
            onBlur={e => e.target.style.borderColor = '#E2E8F0'}>
            <option value="">Select service</option>
            {services.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <label style={labelStyle}>Describe Your Challenge</label>
        <textarea rows={4} placeholder="Describe your oil filtration challenge, machine types, or current issues..." value={form.requirement} onChange={e => update('requirement', e.target.value)}
          style={{ ...inputStyle, resize: 'vertical', fontFamily: '"Plus Jakarta Sans",sans-serif' }}
          onFocus={e => e.target.style.borderColor = '#2563EB'}
          onBlur={e => e.target.style.borderColor = '#E2E8F0'} />
      </div>

      {error && <div style={{ marginTop: '0.75rem', padding: '0.75rem 1rem', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', fontFamily: '"Plus Jakarta Sans",sans-serif', fontSize: '0.875rem', color: '#DC2626' }}>{error}</div>}

      <button type="submit" disabled={status === 'loading'}
        style={{ marginTop: '1.25rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: status === 'loading' ? '#93C5FD' : '#2563EB', color: 'white', fontFamily: '"Plus Jakarta Sans",sans-serif', fontWeight: 700, fontSize: '0.9375rem', padding: '1rem 2rem', borderRadius: '10px', border: 'none', cursor: status === 'loading' ? 'not-allowed' : 'pointer', transition: 'all 0.2s', boxShadow: status === 'loading' ? 'none' : '0 4px 12px rgba(37,99,235,0.3)' }}>
        {status === 'loading' ? <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Sending...</> : <>{form.isAudit ? 'Request Free Audit' : 'Submit Inquiry'} <ArrowRight size={18} /></>}
      </button>

      <p style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontSize: '0.75rem', color: '#94A3B8', textAlign: 'center', marginTop: '0.875rem' }}>
        By submitting, you agree to be contacted by our team. We never share your data.
      </p>
    </form>
  )
}
