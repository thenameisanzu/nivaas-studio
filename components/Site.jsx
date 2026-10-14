'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, MotionConfig, useMotionValue } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, ExternalLink, Heart, MessageCircle } from 'lucide-react'

// ---- Edit content here ----
const CO = {
  whatsapp: '910000000000',
  instagram: 'nivaas.studio',
  email: 'hello@nivaas.studio',
  address: 'Studio address, Kochi, Kerala'
}

const PROJECTS = [
  ['Courtyard House', 'Residence, Thrissur', '2024', '/projects/courtyard-house.jpg'],
  ['Laterite Cafe', 'Hospitality, Kochi', '2023', '/projects/laterite-cafe.jpg'],
  ['Hill Retreat', 'Villa, Munnar', '2023', '/projects/hill-retreat.jpg'],
  ['Tharavad Revival', 'Restoration, Kottayam', '2022', '/projects/tharavad-revival.jpg'],
  ['Studio Loft', 'Interior, Bengaluru', '2022', '/projects/studio-loft.jpg'],
]

const INSTA_POSTS = [
  {
    id: 'p1',
    img: '/insta-01.jpg',
    type: 'Sketch',
    likes: '1,420',
    comments: '36',
    caption: 'Drafting the central courtyard layout for Thrissur residence. Hand ink on butter paper.',
  },
  {
    id: 'p2',
    img: '/insta-02.jpg',
    type: 'Site',
    likes: '2,890',
    comments: '84',
    caption: '11 AM light breaking through teakwood rafters into the central water court.',
  },
  {
    id: 'p3',
    img: '/insta-03.jpg',
    type: 'Material',
    likes: '1,740',
    comments: '42',
    caption: 'Exposed wire-cut laterite and warm lime plaster at Laterite Cafe, Fort Kochi.',
  },
  {
    id: 'p4',
    img: '/insta-04.jpg',
    type: 'Heritage',
    likes: '3,110',
    comments: '95',
    caption: 'Restoring a 120-year-old wooden ceiling in Kottayam. Preserving the patina.',
  },
]

const wa = (t) => `https://wa.me/${CO.whatsapp}?text=${encodeURIComponent(t)}`
const insta = (h = CO.instagram) => `https://instagram.com/${h.replace('@', '')}`
const PLAN = ['M10 10H190V150H10Z', 'M10 70H80V10', 'M80 70V110H140', 'M140 150V80H190', 'M60 150V110H10', 'M80 70A18 18 0 0 1 98 88', 'M100 10V40', 'M150 80V50H190']

function WhatsAppIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

function InstagramIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

function Project({ p, root }) {
  const x = useMotionValue(0)
  const el = useRef(null)
  useEffect(() => {
    const r = root.current
    const f = () => {
      const b = el.current.getBoundingClientRect()
      x.set(-(b.left + b.width / 2 - innerWidth / 2) * 0.14)
    }
    f()
    r.addEventListener('scroll', f, { passive: true })
    addEventListener('resize', f)
    return () => {
      r.removeEventListener('scroll', f)
      removeEventListener('resize', f)
    }
  }, [])

  return (
    <article ref={el} data-label={p[0]} className="group w-[82vw] shrink-0 snap-center md:w-[44vw]">
      <div className="relative h-[54dvh] overflow-hidden bg-slab">
        <motion.div style={{ x }} className="absolute inset-y-0 -inset-x-[15%]">
          <img
            src={p[3]}
            alt={p[0]}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </motion.div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ root, amount: 0.6 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
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
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setLabel(e.target.dataset.label)),
      { root: r, threshold: 0.5 }
    )
    r.querySelectorAll('[data-label]').forEach((n) => io.observe(n))
    r.addEventListener('scroll', f, { passive: true })
    return () => {
      io.disconnect()
      r.removeEventListener('scroll', f)
    }
  }, [])

  const onWheel = (e) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) root.current.scrollLeft += e.deltaY
  }
  const jump = (name) => {
    setOpen(false)
    root.current
      .querySelector(`[data-label="${name}"]`)
      ?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }
  const step = (d) => root.current.scrollBy({ left: d * root.current.clientWidth * 0.6, behavior: 'smooth' })

  return (
    <MotionConfig reducedMotion="user">
      <header className="fixed inset-x-0 top-0 z-30 flex items-center justify-between px-6 pt-[max(20px,env(safe-area-inset-top))] md:px-12">
        <span className="font-display text-3xl tracking-tight">Nivaas</span>
        <div className="flex items-center gap-3">
          <a
            href={insta()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram profile"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/30 text-black/80 transition-all hover:border-black hover:bg-black/5 hover:text-black active:scale-95"
          >
            <InstagramIcon className="h-4 w-4" />
          </a>
          <button
            onClick={() => setOpen(true)}
            className="rounded-full border border-black/40 px-5 py-2 text-sm transition-all hover:border-black hover:bg-black hover:text-white"
          >
            Index
          </button>
        </div>
      </header>

      <main
        ref={root}
        onWheel={onWheel}
        className="no-scrollbar flex h-[100dvh] items-center gap-6 overflow-x-auto px-6 pb-20 pt-20 max-lg:snap-x max-lg:snap-mandatory md:gap-12 md:px-12"
      >
        <section
          data-label="Welcome"
          className="relative flex h-[70dvh] w-[88vw] shrink-0 snap-center flex-col justify-between md:w-[60vw]"
        >
          <svg
            viewBox="0 0 200 160"
            className="absolute right-0 top-0 w-[70%] max-w-[420px] text-black/70"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            aria-hidden
          >
            {PLAN.map((d, i) => (
              <motion.path
                key={i}
                d={d}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.6, delay: 0.3 + i * 0.25, ease: 'easeInOut' }}
              />
            ))}
          </svg>
          <div />
          <div>
            <motion.h1
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[26vw] leading-[.8] md:text-[14rem]"
            >
              Nivaas<br />
              <i className="text-moss">studio</i>
            </motion.h1>
            <p className="mt-6 max-w-xs text-lg">
              Architecture and interiors for homes, cafes and retreats across Kerala.
            </p>
            <p className="mt-6 text-sm text-black/50">Swipe sideways</p>
          </div>
        </section>

        {PROJECTS.map((p) => (
          <Project key={p[0]} p={p} root={root} />
        ))}

        <section
          data-label="Studio"
          className="flex h-[70dvh] w-[82vw] shrink-0 snap-center flex-col justify-center md:w-[44vw]"
        >
          <p className="font-display text-4xl leading-tight md:text-6xl">
            We draw slowly, build locally, and design every house around its courtyard, its climate and the people who live in it.
          </p>
          <ul className="mt-8 text-base">
            {[
              'Site visit and brief within a week',
              'Fixed design fee, clear drawings',
              'Supervised build with local craftspeople',
            ].map((t) => (
              <li key={t} className="border-t border-black/25 py-3">
                {t}
              </li>
            ))}
          </ul>
        </section>

        {/* Instagram Integration Section */}
        <section
          data-label="Instagram"
          className="flex h-[72dvh] w-[90vw] shrink-0 snap-center flex-col justify-center rounded-2xl border border-black/15 bg-slab/30 p-6 backdrop-blur-sm md:w-[62vw] md:p-10"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/15 pb-4">
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] p-[2px] shadow-sm">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-concrete text-[#111]">
                  <InstagramIcon className="h-6 w-6 text-[#dc2743]" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display text-2xl font-bold leading-none">nivaas.studio</span>
                  <span className="inline-block rounded-full bg-[#1DA1F2] p-0.5 text-white" title="Verified">
                    <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-black/60">16.8K followers • Architecture & Interiors, Kochi</p>
              </div>
            </div>
            <a
              href={insta()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#111] px-5 py-2.5 text-xs font-medium tracking-wide text-white transition-all hover:bg-black/80 hover:shadow-md active:scale-95"
            >
              <InstagramIcon className="h-3.5 w-3.5" />
              <span>Follow on Instagram</span>
              <ExternalLink size={13} className="opacity-70" />
            </a>
          </div>

          <div className="mt-4 flex items-baseline justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-black/50">Journal & Site Feed</p>
              <h3 className="font-display text-2xl md:text-3xl">Behind the drawings & craft</h3>
            </div>
            <span className="hidden text-xs text-black/50 md:inline">Hover to inspect post</span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {INSTA_POSTS.map((post) => (
              <a
                key={post.id}
                href={insta()}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden rounded-xl bg-slab shadow-sm transition-transform duration-500 hover:-translate-y-1 hover:shadow-lg"
              >
                <img
                  src={post.img}
                  alt={post.caption}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <span className="absolute left-2.5 top-2.5 z-10 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-medium tracking-wide text-white backdrop-blur-md">
                  {post.type}
                </span>
                <div className="absolute inset-0 flex flex-col justify-between bg-black/65 p-3 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex justify-end">
                    <InstagramIcon className="h-4 w-4 text-white/80" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 text-xs font-semibold text-white/95">
                      <span className="inline-flex items-center gap-1">
                        <Heart size={13} className="fill-current text-[#ff3040]" /> {post.likes}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MessageCircle size={13} className="fill-current text-white" /> {post.comments}
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-[11px] leading-tight text-white/80">{post.caption}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section
          data-label="Contact"
          className="flex h-[70dvh] w-[84vw] shrink-0 snap-center flex-col justify-center md:w-[44vw]"
        >
          <h2 className="font-display text-6xl md:text-8xl">Start a project</h2>
          <p className="mt-6 text-lg">{CO.address}</p>
          <p className="text-lg">{CO.email}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <a
              href={wa('Hi Nivaas, I would like to discuss a project.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-6 py-4 font-medium text-white shadow-md transition-all hover:bg-[#20ba59] hover:shadow-lg hover:scale-[1.02] active:scale-95"
            >
              <WhatsAppIcon className="h-5 w-5 fill-current" />
              <span>WhatsApp us</span>
            </a>
            <a
              href={insta()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-black/40 px-6 py-4 font-medium transition-all hover:border-black hover:bg-black/5 active:scale-95"
            >
              <InstagramIcon className="h-5 w-5 text-[#E4405F]" />
              <span>Instagram</span>
            </a>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Nivaas+Studio+Kochi"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-black/40 px-6 py-4 font-medium transition-all hover:border-black hover:bg-black/5 active:scale-95"
            >
              Open in Maps
            </a>
          </div>
        </section>
      </main>

      {/* Floating Original WhatsApp Action Button */}
      <a
        href={wa('Hi Nivaas, I would like to enquire about an architecture or interior project.')}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group fixed bottom-20 right-6 z-40 flex items-center gap-2.5 rounded-full bg-[#25D366] p-3.5 text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#20ba59] hover:shadow-2xl active:scale-95 md:bottom-20 md:right-10 md:px-5 md:py-3.5"
      >
        <WhatsAppIcon className="h-6 w-6 fill-current md:h-5 md:w-5" />
        <span className="hidden text-sm font-semibold tracking-wide md:inline">Chat on WhatsApp</span>
      </a>

      {/* Bottom Progress Bar & Navigation Controls */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-4 px-6 pb-[max(18px,env(safe-area-inset-bottom))] md:px-12">
        <span className="w-32 shrink-0 truncate font-display text-xl italic md:w-48 md:text-2xl">{label}</span>
        <div className="relative h-px flex-1 bg-black/25">
          <motion.div style={{ scaleX: prog }} className="absolute -top-px h-[3px] w-full origin-left bg-moss" />
        </div>
        <div className="flex gap-2">
          <button
            aria-label="Previous"
            onClick={() => step(-1)}
            className="grid h-11 w-11 place-items-center rounded-full border border-black/40 transition-colors hover:border-black hover:bg-black hover:text-white"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            aria-label="Next"
            onClick={() => step(1)}
            className="grid h-11 w-11 place-items-center rounded-full border border-black/40 transition-colors hover:border-black hover:bg-black hover:text-white"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Index Drawer Navigation */}
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.55, ease: [0.7, 0, 0.2, 1] }}
            className="fixed inset-y-0 right-0 z-50 flex w-full flex-col bg-[#111] px-8 pt-[max(24px,env(safe-area-inset-top))] text-concrete md:w-[480px]"
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close index"
              className="ml-auto grid h-11 w-11 place-items-center rounded-full border border-concrete/40 transition-colors hover:border-white hover:text-white"
            >
              <X size={20} />
            </button>
            <ul className="mt-8">
              {['Welcome', ...PROJECTS.map((p) => p[0]), 'Studio', 'Instagram', 'Contact'].map((n, i) => (
                <motion.li
                  key={n}
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.25 + i * 0.04 }}
                >
                  <button
                    onClick={() => jump(n)}
                    className="w-full border-t border-concrete/20 py-3.5 text-left font-display text-4xl transition-colors hover:text-white"
                  >
                    {n}
                  </button>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto pb-10 pt-8 border-t border-concrete/20 flex items-center justify-between">
              <a
                href={wa('Hi Nivaas, I would like to discuss a project.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#25D366] hover:underline"
              >
                <WhatsAppIcon className="h-4 w-4 fill-current" />
                <span>WhatsApp</span>
              </a>
              <a
                href={insta()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-concrete/80 hover:text-white hover:underline"
              >
                <InstagramIcon className="h-4 w-4" />
                <span>@nivaas.studio</span>
              </a>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </MotionConfig>
  )
}
