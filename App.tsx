import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Music, VolumeX } from 'lucide-react'
import { Particles, FX } from './fx'
import { config as C } from './config'
import { Page1, Page2, Page3, Page4, Page5, Page6, Page7, PageProps } from './pages'
const pages = [Page1, Page2, Page3, Page4, Page5, Page6, Page7]
const fromHash = () => Math.min(6, Math.max(0, (parseInt(location.hash.replace('#/', '')) || 1) - 1))
export default function App() {
  const [i, setI] = useState(fromHash()); const [letterN, setLetterN] = useState(0)
  const fx = useRef<FX>(null); const audio = useRef<HTMLAudioElement | null>(null); const [playing, setPlaying] = useState(false)
  const go = (n: number) => { const t = Math.min(6, Math.max(0, n)); if (t === 0) setLetterN(0); setI(t); location.hash = `/${t + 1}` }
  useEffect(() => { const h = () => setI(fromHash()); addEventListener('hashchange', h); return () => removeEventListener('hashchange', h) }, [])
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === 'ArrowRight') go(i + 1); if (e.key === 'ArrowLeft') go(i - 1) }
    addEventListener('keydown', k); return () => removeEventListener('keydown', k)
  }, [i])
  const toggle = () => {
    if (!audio.current) { audio.current = new Audio(C.audioPath); audio.current.loop = true; audio.current.onerror = () => { setPlaying(false); audio.current = null } }
    if (playing) { audio.current?.pause(); setPlaying(false) } else audio.current?.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
  }
  const Page = pages[i]; const props: PageProps = { fx, next: () => go(i + 1), go, letter: { n: letterN, set: setLetterN } }
  return <>
    <div className="stars" aria-hidden /><Particles ref={fx} />
    <button className="round music" onClick={toggle} aria-label={playing ? 'Pause music' : 'Play music'} title="Music (add public/music/song.mp3)">{playing ? <Music size={20} /> : <VolumeX size={20} />}</button>
    <AnimatePresence mode="wait"><motion.main key={i} initial={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }} animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} exit={{ opacity: 0, scale: .96, filter: 'blur(8px)' }} transition={{ duration: .6, ease: [.22, 1, .36, 1] }}><Page {...props} /></motion.main></AnimatePresence>
    <nav className="nav" aria-label="Pages">
      <button className="round" disabled={i === 0} onClick={() => go(i - 1)} aria-label="Back"><ChevronLeft /></button>
      <div className="dots">{pages.map((_, n) => <button key={n} className={n === i ? 'on' : ''} onClick={() => go(n)} aria-label={`Go to page ${n + 1}`} aria-current={n === i} />)}</div>
      <button className="round" disabled={i === 6} onClick={() => go(i + 1)} aria-label="Next"><ChevronRight /></button>
    </nav></>
}
