import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import FadeIn from "./FadeIn"
import SectionHeading from "./SectionHeading"
import VehicleIllustration from "./VehicleIllustration"

const parts = [
  {
    id: "panels",
    title: "Flexible Solar Panels",
    short: "Panels",
    x: "62%",
    y: "18%",
    body: "Thin photovoltaic sheets sit on the roof rack. They are lighter than framed glass modules and turn sunlight into low-voltage DC. Two or three panels fit without covering the windows.",
  },
  {
    id: "rack",
    title: "Low-Profile Roof Rack",
    short: "Roof rack",
    x: "50%",
    y: "26%",
    body: "A shallow frame holds the panels just above the roof. The prototype goal is a secure mount that adds as little height and drag as possible.",
  },
  {
    id: "mppt",
    title: "MPPT Controller",
    short: "MPPT",
    x: "42%",
    y: "62%",
    body: "A maximum power point tracking controller, or a boost stage, adjusts voltage and current as sunlight changes. It keeps the panels nearer their best output and supplies a voltage the auxiliary battery can accept.",
  },
  {
    id: "battery",
    title: "Auxiliary Battery",
    short: "Aux battery",
    x: "58%",
    y: "64%",
    body: "A separate battery stores solar energy for accessories and for measurement during tests. In this concept it is not a stand-in for the vehicle’s high-voltage traction battery.",
  },
  {
    id: "connection",
    title: "Power Connection",
    short: "Connection",
    x: "68%",
    y: "48%",
    body: "Cabling carries regulated DC from the controller to the auxiliary battery. Sending energy toward the main pack would require compatible charging equipment and must not bypass the car’s safety systems.",
  },
]

export default function Prototype() {
  const [selectedId, setSelectedId] = useState("panels")
  const selected = parts.find((part) => part.id === selectedId) ?? parts[0]

  return (
    <section id="prototype" className="scroll-mt-24 bg-white py-20 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading title="From Lo-Fi Idea to High-Fi Prototype">
            The sketch becomes a roof-mounted array: two or three thin flexible panels on a low rack, with the controller, auxiliary battery, and wiring called out on the car.
          </SectionHeading>
        </FadeIn>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          <div>
            <div className="relative rounded-[2rem] bg-gradient-to-b from-sand via-white to-emerald-50/50 p-3 ring-1 ring-navy/5 sm:p-6">
              <VehicleIllustration variant="prototype" />
              {parts.map((part) => (
                <button
                  key={part.id}
                  type="button"
                  style={{ left: part.x, top: part.y }}
                  onClick={() => setSelectedId(part.id)}
                  aria-pressed={selectedId === part.id}
                  className="absolute z-10 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-2 md:flex"
                >
                  <span className="relative flex h-4 w-4">
                    {selectedId === part.id ? (
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-solar opacity-70" />
                    ) : null}
                    <span className={`relative h-4 w-4 rounded-full border-2 border-white ${selectedId === part.id ? "bg-eco" : "bg-solar"}`} />
                  </span>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm ${selectedId === part.id ? "bg-navy text-white" : "bg-white text-navy"}`}>
                    {part.short}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2 md:hidden">
              {parts.map((part) => (
                <button
                  key={part.id}
                  type="button"
                  onClick={() => setSelectedId(part.id)}
                  aria-pressed={selectedId === part.id}
                  className={`rounded-full px-3 py-2 text-sm font-semibold ${
                    selectedId === part.id ? "bg-navy text-white" : "bg-mist text-navy ring-1 ring-navy/10"
                  }`}
                >
                  {part.title}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.article
              key={selected.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="rounded-3xl bg-navy p-6 text-white shadow-lg sm:p-8"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-solar">Component</p>
              <h3 className="mt-3 text-2xl font-bold">{selected.title}</h3>
              <p className="mt-4 leading-relaxed text-white/85">{selected.body}</p>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
