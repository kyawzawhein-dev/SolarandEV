import { Check, TriangleExclamationPoint } from "lucide-react"
import FadeIn from "./FadeIn"
import SectionHeading from "./SectionHeading"

const advantages = [
  "Renewable energy",
  "Generates electricity while parked",
  "Can power auxiliary electronics",
  "Uses existing vehicle roof space",
  "Potentially reduces grid energy consumption",
  "Educational demonstration of renewable transportation",
]

const limitations = [
  "Limited vehicle roof area",
  "Weather dependent",
  "Shading reduces output",
  "Added weight",
  "Possible aerodynamic drag",
  "Solar power is much lower than typical EV propulsion requirements",
]

export default function Advantages() {
  return (
    <section id="comparison" className="scroll-mt-24 bg-mist py-20 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading title="Advantages vs Limitations" />
        </FadeIn>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <FadeIn>
            <article className="h-full rounded-3xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-eco text-white">
                  <Check className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="text-2xl font-bold text-emerald-950">Advantages</h3>
              </div>
              <ul className="mt-6 space-y-3">
                {advantages.map((item) => (
                  <li key={item} className="flex gap-3 text-emerald-950">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-eco-deep" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </FadeIn>

          <FadeIn delay={0.08}>
            <article className="h-full rounded-3xl border border-orange-200 bg-orange-50 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-orange-600 text-white">
                  <TriangleExclamationPoint className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="text-2xl font-bold text-orange-950">Limitations</h3>
              </div>
              <ul className="mt-6 space-y-3">
                {limitations.map((item) => (
                  <li key={item} className="flex gap-3 text-orange-950">
                    <TriangleExclamationPoint className="mt-0.5 h-5 w-5 shrink-0 text-orange-600" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
