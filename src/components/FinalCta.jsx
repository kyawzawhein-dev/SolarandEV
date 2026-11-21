import ButtonLink from "./ButtonLink"
import FadeIn from "./FadeIn"

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-navy py-20 text-white sm:py-24">
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-solar/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-10 bottom-0 h-48 w-48 rounded-full bg-eco/20 blur-3xl" />
      <FadeIn>
        <div className="relative mx-auto w-full max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Can Cars Really Drive on Sunshine?</h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-white/80 sm:text-lg">
            Vehicle-mounted solar panels cannot replace conventional EV charging in most situations, but they can provide
            useful renewable energy and demonstrate how solar technology can complement electric transportation.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="#how-it-works">Explore How It Works</ButtonLink>
            <ButtonLink href="#calculator" variant="inverse">
              Try the Calculator
            </ButtonLink>
          </div>
        </div>
      </FadeIn>
    </section>
  )
}
