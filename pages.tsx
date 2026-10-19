import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart, Petals, FX } from './fx'
import { config as C } from './config'
export type PageProps = { fx: React.RefObject<FX>; next: () => void; go: (n: number) => void; letter: { n: number; set: (n: number) => void } }
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))
const rm = () => matchMedia('(prefers-reduced-motion: reduce)').matches
const Btn = (p: React.ButtonHTMLAttributes<HTMLButtonElement> & { ghost?: boolean }) => <button {...p} className={'btn' + (p.ghost ? ' ghost' : '')} />

export const Page1 = ({ fx, next }: PageProps) => {
  const [shot, setShot] = useState(false)
  const shoot = async () => {
    if (shot) return; setShot(true); await sleep(rm() ? 100 : 1100)
    fx.current?.burst(undefined, undefined, 'hearts', 260); await sleep(rm() ? 100 : 1300); next()
  }
  return <div className="scene">
    <h1>Hey, {C.recipient}... 💗</h1><p>Someone made a little surprise just for you.</p>
    <div className="arrow-stage" aria-label="A cupid arrow flying into a heart">
      <motion.svg className="cupid-bow" viewBox="0 0 70 150" aria-hidden="true" animate={shot ? { rotate: [0, -14, 0], x: [-2, -5, 0] } : { rotate: [0, 3, 0] }} transition={shot ? { duration: .55 } : { duration: 2.2, repeat: Infinity }}>
        <path d="M48 8 Q4 75 48 142" fill="none" stroke="#c58eaa" strokeWidth="5" strokeLinecap="round"/><path d="M48 8 L48 142" fill="none" stroke="#e7bfd0" strokeWidth="1.5"/><path d="M48 8l-8 8m8-8l-1 11M48 142l-8-8m8 8l-1-11" stroke="#c58eaa" strokeWidth="2" strokeLinecap="round"/>
      </motion.svg>
      <motion.div className="stage-heart" animate={shot ? { scale: [1, 1.22, 1.08], filter: ['brightness(1)', 'brightness(1.35)', 'brightness(1)'] } : {}} transition={{ delay: .7, duration: .8 }}><Heart beat={!shot} /></motion.div>
      <motion.svg className="flying-arrow" viewBox="0 0 220 30" aria-hidden="true"
        initial={{ x: -88, opacity: .95 }} animate={shot ? { x: [-88, 0, 15], opacity: [1, 1, 0] } : { x: [-88, -78, -88] }}
        transition={shot ? { duration: 1.1, ease: [.5, 0, .2, 1] } : { duration: 2.4, repeat: Infinity }}>
        <defs><linearGradient id="sh"><stop offset="0" stopColor="#d9b878" stopOpacity="0"/><stop offset=".45" stopColor="#d9b878"/><stop offset="1" stopColor="#c99a4c"/></linearGradient></defs>
        <rect x="0" y="13" width="170" height="4" rx="2" fill="url(#sh)"/><path d="M170 4l30 11-30 11z" fill="#d9b878"/><path d="M0 15l14-10v6l-8 4 8 4v6z" fill="#e58aaa"/>
      </motion.svg>
    </div>
    <Btn onClick={shoot} disabled={shot}>SHOOT THE ARROW 🏹</Btn>
  </div>
}

export const Page2 = ({ next }: PageProps) => <div className="scene">
  <motion.div initial={{ scale: .2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.2 }}
    style={{ width: 230, height: 230, borderRadius: '50%', background: 'radial-gradient(#fff 0,#ff7aa8 25%,#8b5cf6 60%,transparent 72%)', boxShadow: '0 0 90px #ff4d8d', display: 'grid', placeItems: 'center' }}><Heart style={{ width: 90 }} /></motion.div>
  <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .8 }}>WELCOME TO YOUR LITTLE UNIVERSE</motion.h1>
  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}>Today, this little world is celebrating YOU.</motion.p>
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}><Btn onClick={next}>ENTER THE MAGIC →</Btn></motion.div>
</div>

export const Page3 = ({ fx, next }: PageProps) => {
  const [open, setOpen] = useState(false)
  const pop = () => { if (open) return; setOpen(true); setTimeout(() => fx.current?.burst(innerWidth / 2, innerHeight / 2 - 40, 'stars', 140), 500) }
  return <div className="scene">
    {!open && <h2 style={{ fontSize: '1.4rem' }}>I made something a little different for you...</h2>}
    {open && <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .7 }}><h1>HAPPY BIRTHDAY, {C.recipient.toUpperCase()}! 🎂</h1></motion.div>}
    <button className={'gift' + (open ? ' open' : '')} onClick={pop} aria-label="Open the gift"><div className="gbody" /><div className="glid" /></button>
    {!open ? <Btn ghost onClick={pop}>Open the gift 🎁</Btn> : <Btn onClick={next}>NEXT →</Btn>}
  </div>
}

const cards = [['Your Smile', 'Some smiles make ordinary days feel brighter.', '😊'], ['Your Energy', "There's something lovely about the way you make conversations special.", '✨'], ['Simply You', 'You deserve happiness, beautiful memories, and wonderful things ahead.', '🌷']]
export const Page4 = ({ next }: PageProps) => {
  const [o, setO] = useState<boolean[]>([false, false, false])
  return <div className="scene">
    <h2>Three reasons to smile 🌷</h2>
    <div className="cards">{cards.map(([t, d, e], i) => <motion.button key={t} whileTap={{ scale: .96 }} whileHover={{ y: -4 }} className={`card c${i}` + (o[i] ? ' open' : '')} aria-pressed={o[i]} onClick={() => setO(o.map((v, j) => j === i ? !v : v))}>
      <div className="in"><div className="f glass"><span style={{ fontSize: '2rem' }}>{e}</span><b>{t}</b><small>Tap to reveal</small></div><div className="b glass">{d}</div></div></motion.button>)}</div>
    <div className="gal" tabIndex={0} aria-label="Photo gallery">{C.photos.map((p, i) => <figure key={i}><img src={p.src} alt={p.placeholder ? 'Placeholder, replace with your photo' : p.caption} loading="lazy" onError={e => { e.currentTarget.style.visibility = 'hidden' }} /><figcaption>{p.caption}</figcaption></figure>)}</div>
    <Btn onClick={next}>NEXT →</Btn>
  </div>
}

export const Page5 = ({ next, letter }: PageProps) => {
  const [open, setOpen] = useState(letter.n > 0); const n = letter.n
  useEffect(() => {
    if (!open || n >= C.letter.length) return
    const t = setTimeout(() => letter.set(n + 1), n === 0 ? 900 : 1400); return () => clearTimeout(t)
  }, [open, n])
  return <div className="scene">
    {!open && <h2 style={{ fontSize: '1.4rem' }}>There's a little something I wanted to write for you...</h2>}
    <button className={'env' + (open ? ' open' : '')} onClick={() => setOpen(true)} aria-label="Open the envelope"><div className="flap" /><span className="seal">💗</span></button>
    {open && <div className="paper glass" aria-live="polite">{C.letter.slice(0, n).map((l, i) => <motion.p key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>{l}</motion.p>)}</div>}
    {open && n < C.letter.length && <Btn ghost onClick={() => letter.set(C.letter.length)}>Skip animation</Btn>}
    {n >= C.letter.length && <Btn onClick={next}>NEXT →</Btn>}
  </div>
}

export const Page6 = ({ fx, next }: PageProps) => {
  const [out, setOut] = useState(false)
  const wish = () => { setOut(true); setTimeout(() => { fx.current?.burst(undefined, innerHeight / 3, 'confetti', 220); fx.current?.burst(undefined, undefined, 'stars', 100) }, 500) }
  return <div className="scene">
    <h2>CLOSE YOUR EYES AND MAKE A WISH ✨</h2>
    <div className={'cake' + (out ? ' out' : '')} aria-hidden><div className="layer l2" /><div className="layer l1" />
      {[60, 96, 132].map(l => <div key={l} className="candle" style={{ left: l }}><div className="flame" /></div>)}</div>
    {!out ? <Btn onClick={wish}>MAKE A WISH 🎂</Btn> : <><motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .9 }}>{C.blessing}</motion.p><Btn onClick={next}>NEXT →</Btn></>}
  </div>
}

export const Page7 = ({ fx, go }: PageProps & { music?: never }) => {
  const [open, setOpen] = useState(false); const [txt, setTxt] = useState(''); const [done, setDone] = useState(false)
  const full = C.finalMessage.join('\n\n'); const ref = useRef(0)
  const reveal = () => {
    setOpen(true); fx.current?.burst(undefined, undefined, 'hearts', 90); let i = 0
    ref.current = window.setInterval(() => { i += rm() ? 99 : 1; setTxt(full.slice(0, i)); if (i >= full.length) { clearInterval(ref.current); setTimeout(() => setDone(true), 600) } }, 55)
  }
  useEffect(() => () => clearInterval(ref.current), [])
  return <div className="scene">
    <Petals /><div className="moon" aria-hidden />
    <motion.div animate={open ? { scale: 1.25 } : {}} transition={{ duration: 1.2 }}><Heart style={{ width: open ? 120 : 190 }} /></motion.div>
    {!open && <><h2 style={{ fontSize: '1.4rem' }}>Before you go, one last little message...</h2><Btn onClick={reveal}>OPEN THE LAST SURPRISE ❤️</Btn></>}
    {open && <p style={{ whiteSpace: 'pre-line', minHeight: '6em', fontFamily: 'var(--hand)', fontSize: '1.5rem' }} aria-live="polite">{txt}</p>}
    {done && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }} style={{ display: 'grid', gap: 12, justifyItems: 'center' }}>
      <h1>HAPPY BIRTHDAY, {C.recipient.toUpperCase()}! 🌷</h1><p>A little universe, made just for you.</p>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}><Btn onClick={() => go(0)}>REPLAY THE SURPRISE</Btn><Btn ghost onClick={() => go(4)}>RETURN TO THE LETTER</Btn></div></motion.div>}
    <div className="dim" style={{ opacity: open ? 1 : 0 }} />
  </div>
}
