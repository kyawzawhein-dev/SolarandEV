import { useState } from "react"
import { BatteryCharging, Car, PanelTop, Sun, Zap } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import FadeIn from "./FadeIn"
import SectionHeading from "./SectionHeading"

const nodes = [
  {
    id: "sun",
    title: "Sun",
    icon: Sun,
    tip: "Sunlight is the energy source. Output changes with time of day, weather, season, and shade.",
  },
  {
    id: "panels",
    title: "Solar Panels",
    icon: PanelTop,
    tip: "Flexible panels on the roof convert sunlight into direct current. Area and efficiency limit the power.",
  },
  {
    id: "mppt",
    title: "MPPT / Boost Controller",
    icon: Zap,
    tip: "The controller regulates voltage and current so the panels stay near their best power point.",
  },
  {
    id: "battery",
    title: "Battery System",
    icon: BatteryCharging,
    tip: "An auxiliary battery stores energy for later use by accessories or a test load.",
  },
  {
    id: "ev",
    title: "Electric Vehicle",
    icon: Car,
    tip: "Stored energy can support accessories or, with compatible equipment, add a little slow charging. It does not replace grid charging for driving.",
  },
]

function Connector({ vertical = false }) {
  const reduce = useReducedMotion()
  return (
    <div className={vertical ? "relative h-12 w-px bg-gradient-to-b from-solar to-eco" : "relative h-px w-full min-w-4 bg-gradient-to-r from-solar to-eco"}>
      {reduce ? null : (
        <motion.span
          className="absolute h-2.5 w-2.5 rounded-full bg-solar shadow-[0_0_12px_#f5b400]"
          style={vertical ? { left: "-4px" } : { top: "-4px" }}
          animate={vertical ? { top: ["0%", "100%"], opacity: [0, 1, 0] } : { left: ["0%", "100%"], opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      )}
    </div>
  )
}

function Node({ node, active, onOpen, onClose, onToggle }) {
  const Icon = node.icon
  const shown = active === node.id
  return (
    <div className="relative w-full max-w-xs lg:w-40">
      <button
        type="button"
        className="flex w-full flex-col items-center gap-3 rounded-3xl bg-white px-3 py-4 text-center shadow-[0_16px_40px_-28px_rgba(16,35,63,0.6)] ring-1 ring-navy/5 transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-eco"
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
        onFocus={onOpen}
        onClick={onToggle}
        aria-expanded={shown}
      >
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-sand text-navy">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
        <span className="text-sm font-semibold leading-snug text-navy">{node.title}</span>
      </button>
      {shown ? (
        <p className="mt-3 rounded-2xl bg-navy px-3 py-2 text-left text-xs leading-relaxed text-white shadow-lg lg:absolute lg:left-1/2 lg:z-20 lg:mt-3 lg:w-56 lg:-translate-x-1/2">
          {node.tip}
        </p>
      ) : null}
    </div>
  )
}

export default function EnergyFlow() {
  const [hover, setHover] = useState(null)
  const [pinned, setPinned] = useState(null)
  const active = pinned || hover

  return (
    <section id="energy-flow" className="scroll-mt-24 bg-gradient-to-b from-sand/70 to-white py-20 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading eyebrow="From sunlight to the car" title="Energy Flow">
            Hover or tap each stage to see what it does. The moving dots trace the path of energy through the concept.
          </SectionHeading>
        </FadeIn>

        <div className="mt-14 flex flex-col items-center gap-2 lg:flex-row lg:items-start lg:justify-between">
          {nodes.map((node, index) => (
            <div key={node.id} className="flex w-full flex-col items-center lg:w-auto lg:flex-1 lg:flex-row">
              <Node
                node={node}
                active={active}
                onOpen={() => setHover(node.id)}
                onClose={() => setHover(null)}
                onToggle={() => setPinned((current) => (current === node.id ? null : node.id))}
              />
              {index < nodes.length - 1 ? (
                <div className="flex w-full justify-center py-1 lg:px-2 lg:py-8">
                  <div className="lg:hidden">
                    <Connector vertical />
                  </div>
                  <div className="hidden w-full lg:block">
                    <Connector />
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
