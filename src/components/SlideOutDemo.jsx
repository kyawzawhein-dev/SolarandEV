import { useState } from "react"
import { ArrowDown, ArrowRight, Car, TriangleExclamationPoint } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import FadeIn from "./FadeIn"
import SectionHeading from "./SectionHeading"
import VehicleIllustration from "./VehicleIllustration"

const chain = ["Roof Panels", "Slide-Out Panels", "More Panel Area", "More Potential Solar Energy"]

export default function SlideOutDemo() {
  const [mode, setMode] = useState("driving")
  const reduce = useReducedMotion()
  const parked = mode === "parked"

  return (
    <section id="slide-out" className="scroll-mt-24 bg-mist py-20 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading title="More Solar Power When Parked">
            Vehicle roof area limits how much solar energy can be captured. A slide-out panel system could increase the
            available solar surface area while the vehicle is parked.
          </SectionHeading>
        </FadeIn>

        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-full bg-white p-1 shadow-sm ring-1 ring-navy/10" role="group" aria-label="Vehicle mode">
            <button
              type="button"
              aria-pressed={mode === "driving"}
              onClick={() => setMode("driving")}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                mode === "driving" ? "bg-navy text-white" : "text-navy"
              }`}
            >
              <Car className="h-4 w-4" aria-hidden="true" />
              Driving Mode
            </button>
            <button
              type="button"
              aria-pressed={mode === "parked"}
              onClick={() => setMode("parked")}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                mode === "parked" ? "bg-eco text-white" : "text-navy"
              }`}
            >
              <span className="grid h-4 w-4 place-items-center rounded-sm border border-current text-[10px] font-bold leading-none">
                P
              </span>
              Parked Mode
            </button>
          </div>
        </div>

        <p className="mt-4 text-center text-sm font-medium text-ink" aria-live="polite">
          {parked
            ? "Parked mode: extra panels are extended over the hood and rear."
            : "Driving mode: only the roof-mounted panels are out."}
        </p>

        <div className="mt-6 overflow-hidden rounded-[2rem] bg-white p-3 ring-1 ring-navy/5 sm:p-6">
          <VehicleIllustration variant="slide" mode={mode} />
          <div className="mx-auto mt-2 max-w-md">
            <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-ink">
              <span>Illustrative collection area</span>
              <span>{parked ? "Roof + slide-out" : "Roof only"}</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-navy/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-eco to-solar"
                initial={false}
                animate={{ width: parked ? "100%" : "48%" }}
                transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 80, damping: 18 }}
              />
            </div>
            <p className="mt-2 text-xs leading-relaxed text-ink">
              The bar is a diagram of relative area, not a measured energy gain.
            </p>
          </div>
        </div>

        <ol className="mt-8 flex flex-col gap-2 md:flex-row md:items-center">
          {chain.map((item, index) => {
            const active = parked || index === 0
            return (
              <li key={item} className="flex flex-1 flex-col items-center gap-2 md:flex-row">
                <div
                  className={`w-full rounded-2xl px-4 py-3 text-center text-sm font-semibold ring-1 ${
                    active ? "bg-white text-navy ring-eco/30 shadow-sm" : "bg-white/60 text-ink ring-navy/5"
                  }`}
                >
                  {item}
                </div>
                {index < chain.length - 1 ? (
                  <>
                    <ArrowDown className="h-4 w-4 shrink-0 text-solar-deep md:hidden" aria-hidden="true" />
                    <ArrowRight className="hidden h-4 w-4 shrink-0 text-solar-deep md:block" aria-hidden="true" />
                  </>
                ) : null}
              </li>
            )
          })}
        </ol>

        <div className="mt-6 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">
          <TriangleExclamationPoint className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <p>Slide-out panels should only be extended while the vehicle is safely parked.</p>
        </div>
      </div>
    </section>
  )
}
