import { useState } from "react"
import { Activity, Crosshair, MoveHorizontal, Sun, Zap } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import FadeIn from "./FadeIn"
import SectionHeading from "./SectionHeading"

const ideas = [
  {
    id: "panels",
    title: "Higher-Efficiency Panels",
    text: "Increase electricity production without significantly increasing panel area.",
    detail: "The roof is a fixed, small surface. Cells that convert a larger share of the same sunlight would raise output without a bigger rack.",
    icon: Sun,
  },
  {
    id: "slide",
    title: "Automatic Slide-Out Panels",
    text: "Automatically expand solar collection area while parked.",
    detail: "A parked-only mechanism could deploy extra area and retract it before the vehicle moves. It would still need a safe interlock so panels cannot stay out while driving.",
    icon: MoveHorizontal,
  },
  {
    id: "track",
    title: "Sun Tracking",
    text: "Adjust panel position to improve sunlight capture.",
    detail: "A small tilt toward the sun can help while parked. On a moving car, tracking has to stay simple or the mechanism, weight, and drag cancel the gain.",
    icon: Crosshair,
  },
  {
    id: "mppt",
    title: "Better MPPT Optimization",
    text: "Improve electrical efficiency under changing sunlight conditions.",
    detail: "Clouds, shade from buildings, and turning the car all move the array’s best operating point. A faster controller wastes less of an already small input.",
    icon: Zap,
  },
  {
    id: "monitor",
    title: "Smart Energy Monitoring",
    text: "Show real-time voltage, current, power, battery state, and total solar energy generated.",
    detail: "A dashboard would make the prototype measurable: students could compare the calculator estimate with what the sensors actually record.",
    icon: Activity,
  },
]

export default function FutureIdeas() {
  const [openId, setOpenId] = useState("panels")
  const reduce = useReducedMotion()

  return (
    <section id="future" className="scroll-mt-24 bg-white py-20 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading title="Where Could This Go Next?">
            Select a card to read how that improvement fits the limits of a vehicle-mounted array.
          </SectionHeading>
        </FadeIn>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {ideas.map((idea, index) => {
            const open = openId === idea.id
            const IdeaIcon = idea.icon
            return (
              <FadeIn key={idea.id} delay={index * 0.05}>
                <motion.article
                  className={`h-full rounded-3xl bg-mist ring-1 ${open ? "ring-solar" : "ring-navy/5"}`}
                  whileHover={reduce ? undefined : { y: -4 }}
                >
                  <button
                    type="button"
                    className="w-full px-5 pt-5 text-left"
                    aria-expanded={open}
                    onClick={() => setOpenId(open ? "" : idea.id)}
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-navy ring-1 ring-navy/10">
                      <IdeaIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 text-xl font-semibold text-navy">{idea.title}</h3>
                    <p className="mt-2 pb-4 leading-relaxed text-ink">{idea.text}</p>
                  </button>
                  <AnimatePresence initial={false}>
                    {open ? (
                      <motion.p
                        initial={reduce ? false : { opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={reduce ? undefined : { opacity: 0, height: 0 }}
                        className="overflow-hidden px-5 pb-5 text-sm leading-relaxed text-navy"
                      >
                        {idea.detail}
                      </motion.p>
                    ) : null}
                  </AnimatePresence>
                </motion.article>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
