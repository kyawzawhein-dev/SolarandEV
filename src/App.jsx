import Advantages from "./components/Advantages"
import EnergyFlow from "./components/EnergyFlow"
import EnergyUses from "./components/EnergyUses"
import FinalCta from "./components/FinalCta"
import Footer from "./components/Footer"
import FutureIdeas from "./components/FutureIdeas"
import Hero from "./components/Hero"
import HowItWorks from "./components/HowItWorks"
import Navbar from "./components/Navbar"
import ProblemSection from "./components/ProblemSection"
import Prototype from "./components/Prototype"
import SlideOutDemo from "./components/SlideOutDemo"
import SolarCalculator from "./components/SolarCalculator"
import Testing from "./components/Testing"

export default function App() {
  return (
    <div className="min-h-screen bg-white text-navy">
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-solar focus:px-4 focus:py-2 focus:font-semibold"
      >
        Skip to content
      </a>
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <HowItWorks />
        <EnergyFlow />
        <Prototype />
        <SlideOutDemo />
        <EnergyUses />
        <SolarCalculator />
        <Testing />
        <Advantages />
        <FutureIdeas />
        <FinalCta />
      </main>
      <Footer />
    </div>
  )
}
