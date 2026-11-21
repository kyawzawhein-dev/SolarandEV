import { useState } from "react"
import { CalendarDays, Gauge, Sun, Zap } from "lucide-react"
import { motion } from "framer-motion"
import FadeIn from "./FadeIn"
import SectionHeading from "./SectionHeading"

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function useRange(initial, min, max, step) {
  const [value, setValue] = useState(initial)
  const [text, setText] = useState(String(initial))

  function commit(next) {
    const stepped = step < 1 ? Math.round(next / step) * step : Math.round(next)
    const clean = Math.round(clamp(stepped, min, max) * 10) / 10
    setValue(clean)
    setText(String(clean))
  }

  return {
    value,
    text,
    onSlider(event) {
      commit(Number(event.target.value))
    },
    onText(event) {
      const raw = event.target.value
      setText(raw)
      if (raw === "") return
      const next = Number(raw)
      if (Number.isNaN(next) || next < min || next > max) return
      const stepped = step < 1 ? Math.round(next / step) * step : Math.round(next)
      setValue(Math.round(clamp(stepped, min, max) * 10) / 10)
    },
    onBlur() {
      const next = Number(text)
      if (Number.isNaN(next)) commit(value)
      else commit(next)
    },
  }
}

const kwh = new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const wh = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 })

function formatHours(hours) {
  return Number.isInteger(hours) ? String(hours) : hours.toFixed(1)
}

const fields = [
  {
    key: "power",
    id: "panel-power",
    label: "Solar Panel Power",
    min: 100,
    max: 1000,
    step: 10,
    unit: "W",
    help: "Nameplate power of the roof array.",
  },
  {
    key: "hours",
    id: "peak-sun",
    label: "Peak Sunlight",
    min: 1,
    max: 10,
    step: 0.5,
    unit: "hours/day",
    help: "Peak sun hours are equivalent full-sun hours, not clock hours of daylight.",
  },
  {
    key: "efficiency",
    id: "efficiency",
    label: "System Efficiency",
    min: 50,
    max: 100,
    step: 1,
    unit: "%",
    help: "A simple allowance for controller, wiring, and conversion losses.",
  },
]

export default function SolarCalculator() {
  const power = useRange(400, 100, 1000, 10)
  const hours = useRange(5, 1, 10, 0.5)
  const efficiency = useRange(80, 50, 100, 1)
  const controls = { power, hours, efficiency }

  const dailyWh = power.value * hours.value * (efficiency.value / 100)
  const dailyKwh = dailyWh / 1000
  const monthlyKwh = dailyKwh * 30

  const results = [
    { title: "Daily Energy", value: `${kwh.format(dailyKwh)} kWh`, detail: `${wh.format(dailyWh)} Wh`, icon: Zap },
    { title: "Monthly Energy", value: `${kwh.format(monthlyKwh)} kWh`, detail: "30-day estimate", icon: CalendarDays },
    { title: "Peak Sun Hours", value: `${formatHours(hours.value)} h`, detail: "per day", icon: Sun },
    { title: "System Efficiency", value: `${efficiency.value}%`, detail: "of panel output", icon: Gauge },
  ]

  return (
    <section id="calculator" className="scroll-mt-24 bg-mist py-20 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading title="How Much Energy Could You Capture?">
            Estimates update as you move the controls. They describe energy captured, not distance the car can drive.
          </SectionHeading>
        </FadeIn>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <form
            className="rounded-3xl bg-white p-5 shadow-[0_16px_40px_-28px_rgba(16,35,63,0.5)] ring-1 ring-navy/5 sm:p-7"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="space-y-7">
              {fields.map((field) => {
                const control = controls[field.key]
                return (
                  <div key={field.key}>
                    <div className="flex items-end justify-between gap-3">
                      <label htmlFor={field.id} className="font-semibold text-navy">
                        {field.label}
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          id={`${field.id}-number`}
                          aria-label={`${field.label} value`}
                          inputMode="decimal"
                          className="w-24 rounded-xl border border-line bg-white px-3 py-2 text-right text-base font-semibold text-navy"
                          value={control.text}
                          onChange={control.onText}
                          onBlur={control.onBlur}
                        />
                        <span className="w-16 text-sm text-ink">{field.unit}</span>
                      </div>
                    </div>
                    <input
                      id={field.id}
                      className="solar-range mt-3"
                      type="range"
                      min={field.min}
                      max={field.max}
                      step={field.step}
                      value={control.value}
                      onChange={control.onSlider}
                    />
                    <div className="mt-1 flex justify-between text-xs text-ink">
                      <span>{field.min}</span>
                      <span>{field.max}</span>
                    </div>
                    <p className="mt-2 text-sm text-ink">{field.help}</p>
                  </div>
                )
              })}
            </div>

            <div className="mt-8 rounded-2xl bg-mist p-4 text-sm leading-relaxed text-navy sm:text-base">
              <p className="font-semibold">Daily energy</p>
              <p className="mt-1">
                {power.value} W × {formatHours(hours.value)} hours × {(efficiency.value / 100).toFixed(2)} ={" "}
                <span className="font-semibold text-eco-deep">{kwh.format(dailyKwh)} kWh/day</span>
              </p>
              <p className="mt-2">
                Monthly energy = {kwh.format(dailyKwh)} × 30 ={" "}
                <span className="font-semibold text-eco-deep">{kwh.format(monthlyKwh)} kWh/month</span>
              </p>
            </div>
          </form>

          <div aria-live="polite" className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {results.map((result) => {
              const Icon = result.icon
              return (
              <article key={result.title} className="rounded-3xl bg-white p-5 ring-1 ring-navy/5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-ink">{result.title}</p>
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-sand text-navy">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                </div>
                <motion.p
                  key={result.value}
                  initial={{ opacity: 0.4, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 font-display text-3xl font-bold tracking-tight text-navy"
                >
                  {result.value}
                </motion.p>
                <p className="mt-1 text-sm text-ink">{result.detail}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-eco-deep">Estimate</p>
              </article>
              )
            })}
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-ink">
          Actual solar production depends on weather, shading, panel orientation, temperature, geographic location, and system losses.
        </p>
      </div>
    </section>
  )
}
