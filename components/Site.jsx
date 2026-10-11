'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, MotionConfig, useMotionValue } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

// ---- Edit content here ----
const CO = { whatsapp: '910000000000', email: 'hello@nivaas.studio', address: 'Studio address, Kochi, Kerala' }
const PROJECTS = [
  ['Courtyard House', 'Residence, Thrissur', '2024'], ['Laterite Cafe', 'Hospitality, Kochi', '2023'], ['Hill Retreat', 'Villa, Munnar', '2023'],
  ['Tharavad Revival', 'Restoration, Kottayam', '2022'], ['Studio Loft', 'Interior, Bengaluru', '2022'],
]
const wa = (t) => `https://wa.me/${CO.whatsapp}?text=${encodeURIComponent(t)}`
const PLAN = ['M10 10H190V150H10Z', 'M10 70H80V10', 'M80 70V110H140', 'M140 150V80H190', 'M60 150V110H10', 'M80 70A18 18 0 0 1 98 88', 'M100 10V40', 'M150 80V50H190']

function Project({ p, root }) {
  const x = useMotionValue(0)
  const el = useRef(null)
  useEffect(() => {
    const r = root.current
    const f = () => { const b = el.current.getBoundingClientRect(); x.set(-(b.left + b.width / 2 - innerWidth / 2) * .14) }
    f(); r.addEventListener('scroll', f, { passive: true }); addEventListener('resize', f)
    return () => { r.removeEventListener('scroll', f); removeEventListener('resize', f) }
  }, [])
  return (
    <article ref={el} data-label={p[0]} className="w-[82vw] shrink-0 snap-center md:w-[44vw]">
      <div className="relative h-[54dvh] overflow-hidden bg-slab">
        <motion.div style={{ x }} className="absolute inset-y-0 -inset-x-[15%] bg-[repeating-linear-gradient(90deg,transparent_0_39px,rgba(0,0,0,.08)_39px_40px)]" />
        <span className="absolute bottom-4 left-4 text-xs text-black/50">Project photo placeholder</span>
      </div>
      <motion.div initial={{ y: 24, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ root, amount: .6 }} transition={{ duration: .7, ease: [.16, 1, .3, 1] }}>
        <h3 className="mt-5 font-display text-5xl leading-[.95] md:text-7xl">{p[0]}</h3>
        <p className="mt-2 text-sm text-black/60">{p[1]}, {p[2]}</p>
      </motion.div>
    </article>
  )
}

export default function Site() {
  const root = useRef(null)
  const prog = useMotionValue(0)
  const [label, setLabel] = useState('Welcome')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const r = root.current
    const f = () => prog.set(r.scrollLeft / Math.max(1, r.scrollWidth - r.clientWidth))
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setLabel(e.target.dataset.label)), { root: r, threshold: .6 })
    r.querySelectorAll('[data-label]').forEach((n) => io.observe(n))
    r.addEventListener('scroll', f, { passive: true })
    return () => { io.disconnect(); r.removeEventListener('scroll', f) }
  }, [])
  const onWheel = (e) => { if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) root.current.scrollLeft += e.deltaY }
  const jump = (name) => { setOpen(false); root.current.querySelector(`[data-label="${name}"]`).scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' }) }
  const step = (d) => root.current.scrollBy({ left: d * root.current.clientWidth * .6, behavior: 'smooth' })

  return (
    <MotionConfig reducedMotion="user">
      <header className="fixed inset-x-0 top-0 z-30 flex items-center justify-between px-6 pt-[max(20px,env(safe-area-inset-top))] md:px-12">
        <span className="font-display text-3xl">Nivaas</span>
        <button onClick={() => setOpen(true)} className="rounded-full border border-black/40 px-5 py-2 text-sm">Index</button>
      </header>

      <main ref={root} onWheel={onWheel} className="no-scrollbar flex h-[100dvh] items-center gap-6 overflow-x-auto px-6 pb-20 pt-20 max-lg:snap-x max-lg:snap-mandatory md:gap-12 md:px-12">
        <section data-label="Welcome" className="relative flex h-[70dvh] w-[88vw] shrink-0 snap-center flex-col justify-between md:w-[60vw]">
          <svg viewBox="0 0 200 160" className="absolute right-0 top-0 w-[70%] max-w-[420px] text-black/70" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
            {PLAN.map((d, i) => <motion.path key={i} d={d} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6, delay: .3 + i * .25, ease: 'easeInOut' }} />)}
          </svg>
          <div />
          <div>
            <motion.h1 initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.1, delay: 1.4, ease: [.16, 1, .3, 1] }} className="font-display text-[26vw] leading-[.8] md:text-[14rem]">Nivaas<br /><i className="text-moss">studio</i></motion.h1>
            <p className="mt-6 max-w-xs text-lg">Architecture and interiors for homes, cafes and retreats across Kerala.</p>
            <p className="mt-6 text-sm text-black/50">Swipe sideways</p>
          </div>
        </section>

        {PROJECTS.map((p) => <Project key={p[0]} p={p} root={root} />)}

        <section data-label="Studio" className="flex h-[70dvh] w-[82vw] shrink-0 snap-center flex-col justify-center md:w-[44vw]">
          <p className="font-display text-4xl leading-tight md:text-6xl">We draw slowly, build locally, and design every house around its courtyard, its climate and the people who live in it.</p>
          <ul className="mt-8 text-base">{['Site visit and brief within a week', 'Fixed design fee, clear drawings', 'Supervised build with local craftspeople'].map((t) => <li key={t} className="border-t border-black/25 py-3">{t}</li>)}</ul>
        </section>

        <section data-label="Contact" className="flex h-[70dvh] w-[82vw] shrink-0 snap-center flex-col justify-center md:w-[40vw]">
          <h2 className="font-display text-6xl md:text-8xl">Start a project</h2>
          <p className="mt-6 text-lg">{CO.address}</p><p className="text-lg">{CO.email}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={wa('Hi Nivaas, I would like to discuss a project.')} className="rounded-full bg-moss px-7 py-4 font-medium text-white">WhatsApp us</a>
            <a href="https://www.google.com/maps/search/?api=1&query=Nivaas+Studio+Kochi" target="_blank" rel="noreferrer" className="rounded-full border border-black/40 px-7 py-4">Open in Maps</a>
          </div>
        </section>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-4 px-6 pb-[max(18px,env(safe-area-inset-bottom))] md:px-12">
        <span className="w-32 shrink-0 truncate font-display text-xl italic md:w-48 md:text-2xl">{label}</span>
        <div className="relative h-px flex-1 bg-black/25"><motion.div style={{ scaleX: prog }} className="absolute -top-px h-[3px] w-full origin-left bg-moss" /></div>
        <div className="flex gap-2">
          <button aria-label="Previous" onClick={() => step(-1)} className="grid h-11 w-11 place-items-center rounded-full border border-black/40"><ChevronLeft size={20} /></button>
          <button aria-label="Next" onClick={() => step(1)} className="grid h-11 w-11 place-items-center rounded-full border border-black/40"><ChevronRight size={20} /></button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.aside initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ duration: .55, ease: [.7, 0, .2, 1] }} className="fixed inset-y-0 right-0 z-50 flex w-full flex-col bg-[#111] px-8 pt-[max(24px,env(safe-area-inset-top))] text-concrete md:w-[480px]">
            <button onClick={() => setOpen(false)} aria-label="Close index" className="ml-auto grid h-11 w-11 place-items-center rounded-full border border-concrete/40"><X size={20} /></button>
            <ul className="mt-8">
              {['Welcome', ...PROJECTS.map((p) => p[0]), 'Studio', 'Contact'].map((n, i) => (
                <motion.li key={n} initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: .3 + i * .05 }}>
                  <button onClick={() => jump(n)} className="w-full border-t border-concrete/20 py-3 text-left font-display text-4xl">{n}</button>
                </motion.li>))}
            </ul>
          </motion.aside>)}
      </AnimatePresence>
    </MotionConfig>
  )
}
