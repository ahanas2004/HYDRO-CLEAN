import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}','./components/**/*.{js,ts,jsx,tsx,mdx}','./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Oil Industry Dark Theme
        background: '#0A0A0B',
        surface: {
          DEFAULT: '#161618',
          subtle: '#1E1E21',
          card: '#1A1A1D',
          elevated: '#222226',
        },
        // Oil Gold Primary
        primary: { 
          DEFAULT: '#D4A853',
          light: '#E5C07B',
          dark: '#B8912F',
          glow: 'rgba(212, 168, 83, 0.3)',
        },
        // Industrial Copper Accent
        accent: { 
          DEFAULT: '#CD7F32',
          light: '#E09850',
          dark: '#A66628',
        },
        // Petroleum Green
        oil: {
          sheen: '#2D5A4A',
          light: '#3D7A64',
          dark: '#1D3A2A',
        },
        // Text Colors
        text: { 
          DEFAULT: '#F5F5F5',
          secondary: '#A8A8A8',
          muted: '#666666',
        },
        // Borders
        border: { 
          DEFAULT: '#2A2A2E',
          light: '#3A3A3E',
        },
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        body: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0,0,0,0.3), 0 10px 20px -2px rgba(0,0,0,0.2)',
        'card': '0 4px 6px rgba(0,0,0,0.3), 0 20px 40px rgba(0,0,0,0.4)',
        'card-hover': '0 8px 16px rgba(0,0,0,0.4), 0 30px 60px rgba(0,0,0,0.5)',
        'glow-gold': '0 0 30px rgba(212,168,83,0.3), 0 0 60px rgba(212,168,83,0.15)',
        'glow-copper': '0 0 30px rgba(205,127,50,0.3), 0 0 60px rgba(205,127,50,0.15)',
        'inner-gold': 'inset 0 2px 20px rgba(212,168,83,0.1)',
        '3d': '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'marquee': 'marquee 30s linear infinite',
        'float': 'float 4s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-3d': 'float3d 8s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'counter': 'counter 2s ease-out forwards',
        'oil-flow': 'oilFlow 15s ease infinite',
        'oil-drip': 'oilDrip 2s ease-in-out infinite',
        'oil-bubble': 'oilBubble 3s ease-in-out infinite',
        'oil-sheen': 'oilSheen 4s ease-in-out infinite',
        'oil-pulse': 'oilPulse 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        fadeUp: { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        float3d: {
          '0%, 100%': { transform: 'translateY(0) rotateX(0deg) rotateY(0deg)' },
          '25%': { transform: 'translateY(-10px) rotateX(5deg) rotateY(5deg)' },
          '50%': { transform: 'translateY(-5px) rotateX(0deg) rotateY(-5deg)' },
          '75%': { transform: 'translateY(-15px) rotateX(-5deg) rotateY(0deg)' },
        },
        oilFlow: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        oilDrip: {
          '0%, 100%': { transform: 'translateY(0) scaleY(1)', opacity: '0.8' },
          '50%': { transform: 'translateY(10px) scaleY(1.2)', opacity: '1' },
        },
        oilBubble: {
          '0%': { transform: 'translateY(100%) scale(0)', opacity: '0' },
          '50%': { opacity: '0.6' },
          '100%': { transform: 'translateY(-100%) scale(1)', opacity: '0' },
        },
        oilSheen: {
          '0%': { transform: 'translateX(-100%) rotate(45deg)' },
          '100%': { transform: 'translateX(200%) rotate(45deg)' },
        },
        oilPulse: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212, 168, 83, 0.4)' },
          '50%': { boxShadow: '0 0 30px 10px rgba(212, 168, 83, 0.1)' },
        },
      },
      backgroundImage: {
        'oil-gradient': 'linear-gradient(-45deg, #0A0A0B, #1A1612, #0D0D0F, #1C1814, #0A0A0B)',
        'gold-gradient': 'linear-gradient(135deg, #B8912F 0%, #D4A853 50%, #E5C07B 100%)',
        'copper-gradient': 'linear-gradient(135deg, #A66628 0%, #CD7F32 50%, #E09850 100%)',
        'dark-radial': 'radial-gradient(ellipse at center, #1A1A1D 0%, #0A0A0B 100%)',
      },
    },
  },
  plugins: [],
}
export default config
