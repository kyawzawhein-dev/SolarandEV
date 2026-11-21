import { ArrowDown, BatteryCharging, Cloud, CloudSun, Gauge, Scale, SlidersHorizontal, Sun, TriangleExclamationPoint, Wrench } from "lucide-react"
import FadeIn from "./FadeIn"
import SectionHeading from "./SectionHeading"

const steps = [
  {
    n: "01",
    title: "Install",
    icon: Wrench,
    body: "Mount flexible solar panels securely on a test roof rack.",
  },
  {
    n: "02",
    title: "Measure",
    icon: Gauge,
    body: "Record voltage, current, power, and energy production.",
    points: ["Voltage", "Current", "Power", "Energy production"],
  },
  {
    n: "03",
    title: "Regulate",
    icon: SlidersHorizontal,
    body: "Test the MPPT/boost controller under different sunlight conditions.",
  },
  {
    n: "04",
    title: "Store",
    icon: BatteryCharging,
    body: "Measure energy delivered to an auxiliary battery.",
  },
  {
    n: "05",
    title: "Evaluate",
    icon: Scale,
    body: "Compare theoretical output with real-world results.",
  },
]

const rows = [
  { condition: "Sunny Day", weather: "Sunny", icon: Sun, power: "Example: 400 W", energy: "Example: 1.60 kWh" },
  { condition: "Cloudy Day", weather: "Cloudy", icon: Cloud, power: "Example: 90 W", energy: "Example: 0.30 kWh" },
  { condition: "Partial Shade", weather: "Mixed", icon: CloudSun, power: "Example: 160 W", energy: "Example: 0.55 kWh" },
]

export default function Testing() {
  return (
    <section id="testing" className="scroll-mt-24 bg-white py-20 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading title="Testing It Out">
            A proposed procedure for a roof-rack prototype. The table is a layout for results that do not exist yet.
          </SectionHeading>
        </FadeIn>

        <ol className="mx-auto mt-12 max-w-3xl">
          {steps.map((step, index) => {
            const StepIcon = step.icon
            return (
            <li key={step.n}>
              <FadeIn>
                <article className="flex gap-4 rounded-3xl bg-mist p-5 ring-1 ring-navy/5">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-navy font-display text-sm font-bold text-white">
                    {step.n}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <StepIcon className="h-4 w-4 text-eco-deep" aria-hidden="true" />
                      <h3 className="text-xl font-semibold text-navy">{step.title}</h3>
                    </div>
                    <p className="mt-2 leading-relaxed text-ink">{step.body}</p>
                    {step.points ? (
                      <ul className="mt-3 grid gap-1 sm:grid-cols-2">
                        {step.points.map((point) => (
                          <li key={point} className="text-sm font-medium text-navy">
                            {point}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </article>
              </FadeIn>
              {index < steps.length - 1 ? (
                <div className="flex justify-center py-2 text-solar-deep" aria-hidden="true">
                  <ArrowDown className="h-5 w-5" />
                </div>
              ) : null}
            </li>
            )
          })}
        </ol>

        <div className="mt-12">
          <div className="mb-4 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">
            <TriangleExclamationPoint className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <p>
              <span className="font-semibold">Example data — replace with experimental results after testing.</span> These
              numbers are placeholders for the table. They are not measurements from this project.
            </p>
          </div>

          <div className="hidden overflow-hidden rounded-3xl ring-1 ring-navy/10 md:block">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">Placeholder test results. Not experimental measurements.</caption>
              <thead className="bg-navy text-white">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Condition</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Weather</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Panel Power</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Energy Generated</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => {
                  const WeatherIcon = row.icon
                  return (
                  <tr key={row.condition} className={index % 2 ? "bg-mist" : "bg-white"}>
                    <th scope="row" className="px-4 py-4 font-semibold text-navy">{row.condition}</th>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-2 font-medium text-navy">
                        <WeatherIcon className="h-4 w-4 text-solar-deep" aria-hidden="true" />
                        {row.weather}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-ink">{row.power}</td>
                    <td className="px-4 py-4 text-ink">{row.energy}</td>
                  </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="grid gap-3 md:hidden">
            {rows.map((row) => {
              const WeatherIcon = row.icon
              return (
              <article key={row.condition} className="rounded-2xl bg-mist p-4 ring-1 ring-navy/5">
                <h3 className="font-semibold text-navy">{row.condition}</h3>
                <dl className="mt-3 space-y-2 text-sm">
                  <div className="flex justify-between gap-3">
                    <dt className="text-ink">Weather</dt>
                    <dd className="inline-flex items-center gap-1 font-medium text-navy">
                      <WeatherIcon className="h-4 w-4" aria-hidden="true" />
                      {row.weather}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-ink">Panel Power</dt>
                    <dd className="font-medium text-navy">{row.power}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-ink">Energy Generated</dt>
                    <dd className="font-medium text-navy">{row.energy}</dd>
                  </div>
                </dl>
              </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
