import { Sun } from "lucide-react"

const links = [
  { id: "home", label: "Home" },
  { id: "how-it-works", label: "How It Works" },
  { id: "prototype", label: "Prototype" },
  { id: "calculator", label: "Calculator" },
  { id: "testing", label: "Testing" },
]

export default function Footer() {
  return (
    <footer className="bg-[#0b1a30] text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr] lg:px-8">
        <div>
          <a href="#home" className="inline-flex items-center gap-2 font-display text-xl font-bold">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-solar">
              <Sun className="h-5 w-5" aria-hidden="true" />
            </span>
            SolarDrive
          </a>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/75">Solar-Assisted Electric Vehicle Concept</p>
        </div>
        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-3 md:grid-cols-2">
            {links.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} className="inline-flex py-1 text-white/80 transition hover:text-solar">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto w-full max-w-6xl px-4 py-4 text-sm text-white/60 sm:px-6 lg:px-8">
          Educational Engineering Project
        </p>
      </div>
    </footer>
  )
}
