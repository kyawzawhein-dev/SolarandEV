import { ArrowDown, ArrowRight, BatteryCharging, Car, PanelTop, SlidersHorizontal, Sun, Zap } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import FadeIn from "./FadeIn"
import SectionHeading from "./SectionHeading"

const steps = [
  {
    n: "01",
    title: "Catching the Sun",
    text: "Flexible solar panels mounted on the vehicle capture sunlight and convert it into DC electrical energy.",
    icons: [Sun, PanelTop],
  },
  {
    n: "02",
    title: "Matching the Power",
    text: "An MPPT solar charge controller or boost controller regulates the voltage and current coming from the panels.",
    icons: [PanelTop, SlidersHorizontal],
  },
  {
    n: "03",
    title: "Feeding the Car",
    text: "The regulated electricity can charge an auxiliary battery, power electronics, or potentially contribute to slow EV charging using compatible charging equipment.",
    icons: [Zap, BatteryCharging, Car],
  },
]

function FlowArrow({ className = "" }) {
  const reduce = useReducedMotion()
  return (
    <motion.span
      className={`grid h-9 w-9 place-items-center rounded-full bg-sand text-solar-deep ${className}`}
      animate={reduce ? undefined : { x: [0, 5, 0] }}
      transition={reduce ? undefined : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    >
      <ArrowRight className="h-4 w-4" />
    </motion.span>
  )
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 bg-white py-20 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading eyebrow="The Simple Concept" title="How It Works" />
        </FadeIn>

        <div className="relative mt-14">
          <div className="pointer-events-none absolute left-[12%] right-[12%] top-8 hidden h-px bg-gradient-to-r from-solar via-eco to-navy md:block" />
          <ol className="grid gap-4 md:grid-cols-3 md:gap-6">
            {steps.map((step, index) => (
              <li key={step.n} className="relative">
                <FadeIn delay={index * 0.08} className="h-full">
                  <article className="relative h-full rounded-3xl bg-mist p-6 ring-1 ring-navy/5">
                    <div className="relative z-10 mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-navy font-display text-lg font-bold text-white">
                      {step.n}
                    </div>
                    <div className="mb-4 flex items-center gap-2 text-navy">
                      {step.icons.map((Icon, iconIndex) => (
                        <span key={iconIndex} className="flex items-center gap-2">
                          <span className="grid h-9 w-9 place-items-center rounded-xl bg-white ring-1 ring-navy/10">
                            <Icon className="h-4 w-4" aria-hidden="true" />
                          </span>
                          {iconIndex < step.icons.length - 1 ? (
                            <ArrowRight className="h-4 w-4 text-solar-deep" aria-hidden="true" />
                          ) : null}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-semibold text-navy">{step.title}</h3>
                    <p className="mt-3 leading-relaxed text-ink">{step.text}</p>
                  </article>
                </FadeIn>
                {index < steps.length - 1 ? (
                  <>
                    <div className="flex justify-center py-1 text-solar md:hidden" aria-hidden="true">
                      <ArrowDown className="h-5 w-5" />
                    </div>
                    <FlowArrow className="absolute -right-5 top-6 z-10 hidden md:grid" />
                  </>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
