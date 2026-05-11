/**
 * FAQ Section Component — Dynamic, from WordPress
 *
 * Renders FAQ accordions AND automatically injects FAQPage JSON-LD schema.
 * Data source: WordPress ACF fields (faqItems) or Yoast FAQ block.
 *
 * Usage in page:
 *   const faqData = page.faqItems  // from WP ACF
 *   <FAQSection items={faqData} title="Frequently Asked Questions" />
 */

'use client'

import { useState } from 'react'
import { buildFAQSchema } from '@/lib/seo/schema'

interface FAQItem {
  question: string
  answer: string
}

interface FAQSectionProps {
  items: FAQItem[]
  title?: string
  subtitle?: string
}

export function FAQSection({
  items,
  title = 'Frequently Asked Questions',
  subtitle,
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (!items?.length) return null

  const schema = buildFAQSchema(items)

  return (
    <>
      {/* FAQ JSON-LD — rendered server-side since component is used in RSC tree */}
      <script
        type="application/ld+json"
        // biome-ignore lint: required for JSON-LD
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            ...schema,
          }),
        }}
      />

      <section
        itemScope
        itemType="https://schema.org/FAQPage"
        style={{
          padding: 'clamp(3rem,6vw,5rem) clamp(1.25rem,5vw,4rem)',
          background: 'var(--bg)',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {title && (
            <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem,4vw,3rem)' }}>
              <h2
                style={{
                  fontFamily: '"DM Serif Display", serif',
                  fontSize: 'clamp(1.5rem,3.5vw,2.25rem)',
                  color: 'var(--text)',
                  marginBottom: subtitle ? '0.75rem' : 0,
                }}
              >
                {title}
              </h2>
              {subtitle && (
                <p
                  style={{
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                    fontSize: '1rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                  }}
                >
                  {subtitle}
                </p>
              )}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {items.map((item, i) => {
              const isOpen = openIndex === i
              return (
                <div
                  key={i}
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                  style={{
                    border: `1px solid ${isOpen ? 'rgba(184,134,11,0.35)' : 'var(--border)'}`,
                    borderRadius: '14px',
                    overflow: 'hidden',
                    background: isOpen ? 'rgba(184,134,11,0.025)' : '#FFFFFF',
                    transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                  }}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1.25rem 1.5rem',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontFamily: '"Plus Jakarta Sans", sans-serif',
                      fontWeight: 700,
                      fontSize: '0.9375rem',
                      color: 'var(--text)',
                      lineHeight: 1.4,
                    }}
                  >
                    <span itemProp="name">{item.question}</span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      aria-hidden="true"
                      style={{
                        flexShrink: 0,
                        color: 'var(--primary)',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s',
                      }}
                    >
                      <path
                        d="M5 7.5l5 5 5-5"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  <div
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                    style={{
                      maxHeight: isOpen ? '600px' : '0',
                      overflow: 'hidden',
                      transition: 'max-height 0.4s cubic-bezier(0.16,1,0.3,1)',
                    }}
                  >
                    <p
                      itemProp="text"
                      style={{
                        padding: '0 1.5rem 1.25rem',
                        fontFamily: '"Plus Jakarta Sans", sans-serif',
                        fontSize: '0.875rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.7,
                        margin: 0,
                      }}
                    >
                      {item.answer}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
