'use client'
import { useEffect, useRef } from 'react'

interface OilFlowBackgroundProps {
  className?: string
  intensity?: 'low' | 'medium' | 'high'
  showBubbles?: boolean
  showDroplets?: boolean
  variant?: 'dark' | 'golden'
}

export default function OilFlowBackground({
  className = '',
  intensity = 'medium',
  showBubbles = true,
  showDroplets = true,
  variant = 'dark'
}: OilFlowBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let particles: Particle[] = []
    let bubbles: Bubble[] = []

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resize()
    window.addEventListener('resize', resize)

    // Particle class for oil flow
    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      color: string

      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth
        this.y = Math.random() * canvasHeight
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = Math.random() * 0.3 + 0.1
        this.size = Math.random() * 3 + 1
        this.opacity = Math.random() * 0.3 + 0.1
        
        const colors = variant === 'golden' 
          ? ['#D4A853', '#B8912F', '#E5C07B', '#CD7F32']
          : ['#2D5A4A', '#1D3A2A', '#3D7A64', '#D4A853']
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update(canvasWidth: number, canvasHeight: number) {
        this.x += this.vx
        this.y += this.vy

        if (this.y > canvasHeight) {
          this.y = 0
          this.x = Math.random() * canvasWidth
        }
        if (this.x < 0) this.x = canvasWidth
        if (this.x > canvasWidth) this.x = 0
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.globalAlpha = this.opacity
        ctx.fill()
        ctx.globalAlpha = 1
      }
    }

    // Bubble class for oil bubbles
    class Bubble {
      x: number
      y: number
      radius: number
      vy: number
      wobble: number
      wobbleSpeed: number
      opacity: number

      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth
        this.y = canvasHeight + Math.random() * 100
        this.radius = Math.random() * 8 + 4
        this.vy = -(Math.random() * 1 + 0.5)
        this.wobble = 0
        this.wobbleSpeed = Math.random() * 0.05 + 0.02
        this.opacity = Math.random() * 0.4 + 0.1
      }

      update(canvasWidth: number, canvasHeight: number) {
        this.y += this.vy
        this.wobble += this.wobbleSpeed
        this.x += Math.sin(this.wobble) * 0.5

        if (this.y < -this.radius * 2) {
          this.y = canvasHeight + this.radius
          this.x = Math.random() * canvasWidth
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Main bubble
        const gradient = ctx.createRadialGradient(
          this.x - this.radius * 0.3,
          this.y - this.radius * 0.3,
          0,
          this.x,
          this.y,
          this.radius
        )
        gradient.addColorStop(0, `rgba(212, 168, 83, ${this.opacity * 0.8})`)
        gradient.addColorStop(0.7, `rgba(212, 168, 83, ${this.opacity * 0.3})`)
        gradient.addColorStop(1, 'rgba(212, 168, 83, 0)')

        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Highlight
        ctx.beginPath()
        ctx.arc(
          this.x - this.radius * 0.3,
          this.y - this.radius * 0.3,
          this.radius * 0.2,
          0,
          Math.PI * 2
        )
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.5})`
        ctx.fill()
      }
    }

    // Initialize particles
    const particleCount = intensity === 'low' ? 30 : intensity === 'medium' ? 60 : 100
    const bubbleCount = showBubbles ? (intensity === 'low' ? 5 : intensity === 'medium' ? 10 : 15) : 0

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas.offsetWidth, canvas.offsetHeight))
    }

    for (let i = 0; i < bubbleCount; i++) {
      bubbles.push(new Bubble(canvas.offsetWidth, canvas.offsetHeight))
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      // Draw oil flow lines
      ctx.strokeStyle = variant === 'golden' 
        ? 'rgba(212, 168, 83, 0.03)' 
        : 'rgba(45, 90, 74, 0.05)'
      ctx.lineWidth = 1

      for (let i = 0; i < 5; i++) {
        const time = Date.now() * 0.0005 + i
        ctx.beginPath()
        for (let x = 0; x < canvas.offsetWidth; x += 10) {
          const y = canvas.offsetHeight * 0.5 + 
            Math.sin(x * 0.01 + time) * 50 + 
            Math.sin(x * 0.02 + time * 1.5) * 30
          if (x === 0) {
            ctx.moveTo(x, y + i * 40)
          } else {
            ctx.lineTo(x, y + i * 40)
          }
        }
        ctx.stroke()
      }

      // Update and draw particles
      particles.forEach(particle => {
        particle.update(canvas.offsetWidth, canvas.offsetHeight)
        particle.draw(ctx)
      })

      // Update and draw bubbles
      bubbles.forEach(bubble => {
        bubble.update(canvas.offsetWidth, canvas.offsetHeight)
        bubble.draw(ctx)
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [intensity, showBubbles, showDroplets, variant])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ opacity: 0.6 }}
    />
  )
}

// Oil Droplet Component
export function OilDroplet({ 
  className = '',
  size = 'md',
  delay = 0 
}: { 
  className?: string
  size?: 'sm' | 'md' | 'lg'
  delay?: number 
}) {
  const sizes = {
    sm: { width: 12, height: 18 },
    md: { width: 20, height: 30 },
    lg: { width: 32, height: 48 }
  }

  const { width, height } = sizes[size]

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 48"
      fill="none"
      className={className}
      style={{ animationDelay: `${delay}ms` }}
    >
      <defs>
        <linearGradient id="oilDropGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E5C07B" />
          <stop offset="50%" stopColor="#D4A853" />
          <stop offset="100%" stopColor="#B8912F" />
        </linearGradient>
        <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#D4A853" floodOpacity="0.3"/>
        </filter>
      </defs>
      <path
        d="M16 0C16 0 32 20 32 32C32 40.837 24.837 48 16 48C7.163 48 0 40.837 0 32C0 20 16 0 16 0Z"
        fill="url(#oilDropGradient)"
        filter="url(#dropShadow)"
      />
      <ellipse
        cx="11"
        cy="28"
        rx="4"
        ry="6"
        fill="rgba(255,255,255,0.3)"
        transform="rotate(-15 11 28)"
      />
    </svg>
  )
}

// Oil Pipeline Decoration
export function OilPipelineDecoration({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute pointer-events-none ${className}`}>
      <svg width="200" height="60" viewBox="0 0 200 60" fill="none">
        <defs>
          <linearGradient id="pipeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3A3A3E" />
            <stop offset="50%" stopColor="#2A2A2E" />
            <stop offset="100%" stopColor="#1A1A1D" />
          </linearGradient>
        </defs>
        {/* Main pipe */}
        <rect x="0" y="20" width="200" height="20" rx="10" fill="url(#pipeGradient)" />
        {/* Pipe joints */}
        <rect x="40" y="15" width="10" height="30" rx="2" fill="#D4A853" opacity="0.3" />
        <rect x="100" y="15" width="10" height="30" rx="2" fill="#D4A853" opacity="0.3" />
        <rect x="160" y="15" width="10" height="30" rx="2" fill="#D4A853" opacity="0.3" />
        {/* Flow indicators */}
        <circle cx="70" cy="30" r="4" fill="#D4A853" opacity="0.6">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="130" cy="30" r="4" fill="#D4A853" opacity="0.6">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="1.5s" repeatCount="indefinite" begin="0.5s" />
        </circle>
      </svg>
    </div>
  )
}

// Oil Gauge Component
export function OilGauge({ 
  value = 75, 
  label = 'Oil Level',
  className = '' 
}: { 
  value?: number
  label?: string
  className?: string 
}) {
  return (
    <div className={`relative ${className}`}>
      <svg width="120" height="80" viewBox="0 0 120 80">
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#B8912F" />
            <stop offset="50%" stopColor="#D4A853" />
            <stop offset="100%" stopColor="#E5C07B" />
          </linearGradient>
        </defs>
        {/* Background arc */}
        <path
          d="M 10 70 A 50 50 0 0 1 110 70"
          fill="none"
          stroke="#2A2A2E"
          strokeWidth="8"
          strokeLinecap="round"
        />
        {/* Value arc */}
        <path
          d="M 10 70 A 50 50 0 0 1 110 70"
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${value * 1.57} 157`}
          style={{ transition: 'stroke-dasharray 1s ease-out' }}
        />
        {/* Center indicator */}
        <circle cx="60" cy="70" r="6" fill="#D4A853" />
        {/* Needle */}
        <line
          x1="60"
          y1="70"
          x2={60 + Math.cos((180 - value * 1.8) * Math.PI / 180) * 35}
          y2={70 - Math.sin((180 - value * 1.8) * Math.PI / 180) * 35}
          stroke="#F5F5F5"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ transition: 'all 1s ease-out' }}
        />
      </svg>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center">
        <div className="text-lg font-bold text-primary">{value}%</div>
        <div className="text-xs text-text-muted">{label}</div>
      </div>
    </div>
  )
}
