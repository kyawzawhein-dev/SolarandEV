import { BatteryCharging, Sun, Zap } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import ButtonLink from "./ButtonLink"
import VehicleIllustration from "./VehicleIllustration"

const cards = [
  { title: "Solar Energy", icon: Sun, className: "bg-sand text-solar-deep", wrap: "left-2 top-6 lg:left-0" },
  { title: "Clean Electricity", icon: Zap, className: "bg-amber-100 text-amber-700", wrap: "right-2 top-1/3 lg:right-0" },
  { title: "Energy Storage", icon: BatteryCharging, className: "bg-emerald-50 text-eco-deep", wrap: "bottom-4 left-6 lg:left-8" },
]

function FloatCard({ title, icon: Icon, tone, className, delay }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={`absolute z-10 hidden items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-[0_16px_40px_-24px_rgba(16,35,63,0.55)] ring-1 ring-navy/5 lg:flex ${className}`}
      animate={reduce ? undefined : { y: [0, -8, 0] }}
      transition={reduce ? undefined : { duration: 4.6, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <span className={`grid h-10 w-10 place-items-center rounded-xl ${tone}`}>
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="text-sm font-semibold text-navy">{title}</span>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section id="home" className="scroll-mt-24 relative overflow-hidden">
      <div className="hero-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="pointer-events-none absolute -left-16 top-10 h-64 w-64 rounded-full bg-solar/25 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-24 h-72 w-72 rounded-full bg-eco/15 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-8 lg:py-24">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-sand px-3 py-1 text-sm font-semibold text-navy">
            <Sun className="h-4 w-4 text-solar-deep" aria-hidden="true" />
            University engineering project
          </p>
          <h1 className="mt-5 max-w-xl text-5xl font-extrabold tracking-tight text-navy sm:text-6xl lg:text-7xl">
            Drive on Sunshine
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink">
            Exploring how flexible solar panels can capture sunlight and provide useful energy for electric vehicles.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#how-it-works">See How It Works</ButtonLink>
            <ButtonLink href="#prototype" variant="secondary">
              View Prototype
            </ButtonLink>
          </div>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink">
            A concept for accessories, an auxiliary battery, and slow charging. Roof solar does not replace plugging the car in.
          </p>
        </div>

        <div className="relative">
          {cards.map((card, index) => (
            <FloatCard
              key={card.title}
              title={card.title}
              icon={card.icon}
              tone={card.className}
              className={card.wrap}
              delay={index * 0.4}
            />
          ))}
          <VehicleIllustration variant="hero" />
          <ul className="mt-4 grid gap-2 sm:grid-cols-3 lg:hidden">
            {cards.map((card) => {
              const Icon = card.icon
              return (
                <li key={card.title} className="flex items-center gap-2 rounded-2xl bg-white px-3 py-3 shadow-sm ring-1 ring-navy/5">
                  <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${card.className}`}>
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold">{card.title}</span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
