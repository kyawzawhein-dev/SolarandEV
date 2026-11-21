import { useEffect, useState } from "react"
import { Menu, Sun, X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import ButtonLink from "./ButtonLink"

const LINKS = [
  { id: "home", label: "Home" },
  { id: "how-it-works", label: "How It Works" },
  { id: "prototype", label: "Prototype" },
  { id: "energy-flow", label: "Energy Flow" },
  { id: "calculator", label: "Calculator" },
  { id: "testing", label: "Testing" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState("home")

  useEffect(() => {
    const nodes = LINKS.map((link) => document.getElementById(link.id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) setActive(visible.target.id)
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.15, 0.35, 0.6] },
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#home" onClick={close} className="flex items-center gap-2 font-display text-lg font-bold tracking-tight text-navy">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-sand text-solar-deep">
            <Sun className="h-5 w-5" aria-hidden="true" />
          </span>
          SolarDrive
        </a>

        <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`relative rounded-full px-3 py-2 text-sm font-medium transition ${
                active === link.id ? "text-eco-deep" : "text-ink hover:text-navy"
              }`}
              aria-current={active === link.id ? "true" : undefined}
            >
              {link.label}
              {active === link.id ? (
                <motion.span layoutId="nav-underline" className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-solar" />
              ) : null}
            </a>
          ))}
        </nav>

        <div className="hidden xl:block">
          <ButtonLink href="#how-it-works">Explore the Concept</ButtonLink>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full text-navy ring-1 ring-navy/10 xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <>
            <button
              type="button"
              className="fixed inset-0 top-16 z-40 bg-navy/20 xl:hidden"
              aria-label="Close menu"
              onClick={close}
            />
            <motion.nav
              id="mobile-nav"
              aria-label="Mobile"
              className="absolute inset-x-0 top-full z-50 border-b border-line bg-white px-4 py-4 shadow-lg xl:hidden"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <ul className="flex flex-col gap-1">
                {LINKS.map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={close}
                      className={`block rounded-xl px-3 py-3 text-base font-medium ${
                        active === link.id ? "bg-sand text-navy" : "text-ink"
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <ButtonLink href="#how-it-works" onClick={close} className="mt-3 w-full">
                Explore the Concept
              </ButtonLink>
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
