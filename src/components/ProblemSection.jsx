import { BatteryCharging, PanelTop, PlugZap, Sun } from "lucide-react"
import FadeIn from "./FadeIn"
import SectionHeading from "./SectionHeading"

const cards = [
  {
    title: "Limited Charging Access",
    text: "Drivers may not always have convenient access to a charging station.",
    icon: PlugZap,
    tone: "bg-sand text-solar-deep",
  },
  {
    title: "Unused Roof Space",
    text: "The roof of a vehicle receives sunlight but normally produces no energy.",
    icon: PanelTop,
    tone: "bg-emerald-50 text-eco-deep",
  },
  {
    title: "Energy While Parked",
    text: "A parked vehicle can continue collecting solar energy during daylight.",
    icon: null,
    tone: "bg-amber-50 text-amber-700",
  },
]

export default function ProblemSection() {
  return (
    <section id="why" className="scroll-mt-24 bg-mist py-20 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading title="Why Solar-Assisted EVs?">
            Electric vehicles normally depend on charging stations and the electrical grid. Solar panels installed on the
            vehicle could collect otherwise unused sunlight while the vehicle is driving or parked.
          </SectionHeading>
        </FadeIn>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {cards.map((card, index) => {
            const Icon = card.icon
            return (
            <FadeIn key={card.title} delay={index * 0.08}>
              <article className="h-full rounded-3xl bg-white p-6 shadow-[0_16px_40px_-28px_rgba(16,35,63,0.55)] ring-1 ring-navy/5">
                <div className={`mb-5 grid h-12 w-12 place-items-center rounded-2xl ${card.tone}`}>
                  {Icon ? (
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  ) : (
                    <span className="flex items-center gap-0.5">
                      <Sun className="h-5 w-5" aria-hidden="true" />
                      <BatteryCharging className="h-5 w-5" aria-hidden="true" />
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-navy">{card.title}</h3>
                <p className="mt-3 leading-relaxed text-ink">{card.text}</p>
              </article>
            </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
