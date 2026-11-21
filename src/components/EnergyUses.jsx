import { BatteryCharging, Info, Laptop, Lightbulb, Refrigerator, Smartphone, Snowflake } from "lucide-react"
import FadeIn from "./FadeIn"
import SectionHeading from "./SectionHeading"

const uses = [
  {
    title: "Climate Control",
    icon: Snowflake,
    tone: "bg-sky-50 text-sky-700",
    body: "Solar-generated electricity could help power ventilation and auxiliary climate-control systems.",
  },
  {
    title: "Electronics",
    icon: Laptop,
    tone: "bg-sand text-solar-deep",
    body: "Power devices such as phones, laptops, lights, small refrigerators, and other accessories.",
    items: [
      { label: "Phones", icon: Smartphone },
      { label: "Laptops", icon: Laptop },
      { label: "Lights", icon: Lightbulb },
      { label: "Small refrigerators", icon: Refrigerator },
    ],
  },
  {
    title: "Vehicle Charging",
    icon: BatteryCharging,
    tone: "bg-emerald-50 text-eco-deep",
    body: "Stored solar energy could contribute to slow EV charging through compatible charging equipment.",
  },
]

export default function EnergyUses() {
  return (
    <section id="uses" className="scroll-mt-24 bg-white py-20 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading title="Where Does the Energy Go?">
            The useful output of a small vehicle array is accessory power and stored energy, with only a modest path toward charging.
          </SectionHeading>
        </FadeIn>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {uses.map((use, index) => {
            const Icon = use.icon
            return (
            <FadeIn key={use.title} delay={index * 0.08}>
              <article className="flex h-full flex-col rounded-3xl bg-mist p-6 ring-1 ring-navy/5">
                <div className={`mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-white ${use.tone}`}>
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-semibold text-navy">{use.title}</h3>
                <p className="mt-3 leading-relaxed text-ink">{use.body}</p>
                {use.items ? (
                  <ul className="mt-4 space-y-2">
                    {use.items.map((item) => {
                      const ItemIcon = item.icon
                      return (
                      <li key={item.label} className="flex items-center gap-2 text-sm font-medium text-navy">
                        <ItemIcon className="h-4 w-4 text-eco-deep" aria-hidden="true" />
                        {item.label}
                      </li>
                      )
                    })}
                    <li className="pl-6 text-sm text-ink">Other accessories</li>
                  </ul>
                ) : null}
              </article>
            </FadeIn>
            )
          })}
        </div>

        <div className="mt-8 flex gap-3 rounded-2xl border border-solar/50 bg-sand p-4 text-sm leading-relaxed text-navy sm:p-5">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-solar-deep" aria-hidden="true" />
          <p>
            <span className="font-semibold">Disclaimer. </span>
            The exact charging architecture depends on the vehicle and electrical system. High-voltage EV batteries require
            properly designed and compatible charging equipment.
          </p>
        </div>
      </div>
    </section>
  )
}
