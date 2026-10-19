import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
export type FX = { burst: (x?: number, y?: number, kind?: 'hearts' | 'confetti' | 'stars', n?: number) => void }
type P = { x: number; y: number; vx: number; vy: number; l: number; c: string; s: number; t: string }
const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
export const Particles = forwardRef<FX>((_, ref) => {
  const cv = useRef<HTMLCanvasElement>(null); const ps = useRef<P[]>([]); const raf = useRef(0)
  const loop = () => {
    const c = cv.current; if (!c) return; const g = c.getContext('2d')!
    g.clearRect(0, 0, c.width, c.height)
    ps.current = ps.current.filter(p => p.l > 0)
    for (const p of ps.current) {
      p.x += p.vx; p.y += p.vy; p.vy += 0.05; p.l -= 1; g.globalAlpha = Math.min(1, p.l / 40); g.fillStyle = p.c
      g.font = `${p.s}px serif`; if (p.t) g.fillText(p.t, p.x, p.y); else g.fillRect(p.x, p.y, p.s / 2, p.s / 3)
    }
    raf.current = ps.current.length ? requestAnimationFrame(loop) : 0
  }
  useEffect(() => {
    const r = () => { const c = cv.current!; c.width = innerWidth; c.height = innerHeight }
    r(); addEventListener('resize', r); return () => { removeEventListener('resize', r); cancelAnimationFrame(raf.current) }
  }, [])
  useImperativeHandle(ref, () => ({
    burst(x = innerWidth / 2, y = innerHeight / 2, kind = 'hearts', n = 120) {
      if (reduce()) n = 12
      const cols = ['#ff4d8d', '#8b5cf6', '#f5d78e', '#6ee7ff', '#ffffff']
      for (let i = 0; i < n; i++) {
        const a = Math.random() * 6.28, v = 2 + Math.random() * 6
        ps.current.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 2, l: 70 + Math.random() * 60, s: 10 + Math.random() * 14,
          c: kind === 'confetti' ? cols[i % 5] : '#ff7aa8', t: kind === 'hearts' ? (i % 3 ? '♥' : '✦') : kind === 'stars' ? '✦' : '' })
      }
      if (!raf.current) raf.current = requestAnimationFrame(loop)
    },
  }))
  return <canvas ref={cv} className="fx" aria-hidden />
})
export const Heart = ({ beat = true, style }: { beat?: boolean; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 100 90" className={'heart' + (beat ? ' beat' : '')} style={style} aria-hidden>
    <defs><radialGradient id="hg" cx="35%" cy="30%"><stop offset="0" stopColor="#ff9ac0" /><stop offset="1" stopColor="#d4144f" /></radialGradient></defs>
    <path d="M50 85C10 55 0 35 10 18 20 3 42 6 50 24 58 6 80 3 90 18c10 17 0 37-40 67z" fill="url(#hg)" />
  </svg>
)
export const Petals = () => <>{Array.from({ length: 14 }, (_, i) => <i key={i} className="petal" style={{ left: `${(i * 37) % 100}%`, animationDuration: `${8 + (i % 6)}s`, animationDelay: `${-i}s` }} />)}</>
