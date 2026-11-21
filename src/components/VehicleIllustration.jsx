import { useId } from "react"
import { motion, useReducedMotion } from "framer-motion"

const PANEL_Y = 122
const PANEL_W = 86
const PANEL_H = 26
const PANEL_X = [498, 592, 686]

function Cells({ x, y, width, height }) {
  const lines = []
  for (let i = 1; i < 5; i += 1) {
    const px = x + (width / 5) * i
    lines.push(
      <line
        key={`v-${x}-${i}`}
        x1={px}
        y1={y + 3}
        x2={px}
        y2={y + height - 3}
        stroke="#b9dcff"
        strokeWidth="0.7"
        opacity="0.7"
      />,
    )
  }
  const mid = y + height / 2
  lines.push(
    <line
      key={`h-${x}`}
      x1={x + 3}
      y1={mid}
      x2={x + width - 3}
      y2={mid}
      stroke="#b9dcff"
      strokeWidth="0.7"
      opacity="0.7"
    />,
  )
  return lines
}

function SolarPanel({ x, y, width = PANEL_W, height = PANEL_H, fill }) {
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx="4" fill={fill} stroke="#f5b400" strokeWidth="1.4" />
      <Cells x={x} y={y} width={width} height={height} />
      <rect x={x + 2} y={y + 2} width={width - 4} height={7} rx="2" fill="#ffffff" opacity="0.16" />
      <rect x={x + 5} y={y + height / 2 - 1} width={width - 10} height="2" rx="1" fill="#f5b400" opacity="0.9" />
    </g>
  )
}

function Wheel({ cx, cy, spin, reduce }) {
  return (
    <motion.g
      style={{ transformOrigin: `${cx}px ${cy}px` }}
      animate={spin && !reduce ? { rotate: 360 } : undefined}
      transition={spin && !reduce ? { duration: 8, repeat: Infinity, ease: "linear" } : undefined}
    >
      <circle cx={cx} cy={cy} r="48" fill="#141c27" />
      <circle cx={cx} cy={cy} r="36" fill="#2a3b4e" />
      <circle cx={cx} cy={cy} r="16" fill="#e7eef5" />
      <circle cx={cx} cy={cy} r="5" fill="#10233f" />
      {[0, 45, 90, 135].map((angle) => (
        <rect
          key={angle}
          x={cx - 1.4}
          y={cy - 34}
          width="2.8"
          height="16"
          rx="1"
          fill="#c5d3e0"
          transform={`rotate(${angle} ${cx} ${cy})`}
        />
      ))}
    </motion.g>
  )
}

function SunParticles({ reduce }) {
  if (reduce) return null
  return (
    <g>
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.circle
          key={i}
          r="5"
          fill="#f5b400"
          cx="150"
          cy="120"
          animate={{
            cx: [150, 320, 620],
            cy: [118, 78, 136],
            opacity: [0, 1, 0],
          }}
          transition={{ duration: 2.7, repeat: Infinity, delay: i * 0.48, ease: "easeInOut" }}
        />
      ))}
    </g>
  )
}

export default function VehicleIllustration({
  variant = "hero",
  mode = "driving",
  className = "",
}) {
  const reduce = useReducedMotion()
  const id = useId().replace(/:/g, "")
  const showSun = variant === "hero"
  const showSystems = variant === "prototype"
  const showSlide = variant === "slide"
  const parked = showSlide && mode === "parked"
  const body = `${id}-body`
  const glass = `${id}-glass`
  const panel = `${id}-panel`
  const mask = `${id}-mask`
  const spring = reduce ? { duration: 0 } : { type: "spring", stiffness: 70, damping: 17 }

  const label =
    variant === "prototype"
      ? "Diagram of an electric vehicle with flexible roof solar panels, a roof rack, an MPPT controller, an auxiliary battery, and a power connection"
      : parked
        ? "Parked electric vehicle with roof solar panels and slide-out panels extended over the hood and rear"
        : "Electric vehicle with flexible solar panels mounted on the roof"

  return (
    <svg viewBox={showSun ? "0 0 1000 540" : "0 70 1000 460"} className={`block h-auto w-full ${className}`} role="img" aria-label={label}>
      <defs>
        <linearGradient id={body} gradientUnits="userSpaceOnUse" x1="0" y1="140" x2="0" y2="430">
          <stop offset="0%" stopColor="#2a5d8f" />
          <stop offset="38%" stopColor="#17375d" />
          <stop offset="100%" stopColor="#0c2038" />
        </linearGradient>
        <linearGradient id={glass} gradientUnits="userSpaceOnUse" x1="0" y1="160" x2="0" y2="300">
          <stop offset="0%" stopColor="#f3fbff" />
          <stop offset="100%" stopColor="#7eb6d6" />
        </linearGradient>
        <linearGradient id={panel} gradientUnits="userSpaceOnUse" x1="0" y1="120" x2="0" y2="160">
          <stop offset="0%" stopColor="#1d4e89" />
          <stop offset="100%" stopColor="#0c2344" />
        </linearGradient>
        <mask id={mask}>
          <rect width="1000" height="540" fill="white" />
          <circle cx="286" cy="412" r="58" fill="black" />
          <circle cx="748" cy="412" r="58" fill="black" />
        </mask>
      </defs>

      {showSun ? (
        <g>
          <circle cx="108" cy="104" r="70" fill="#f5b400" opacity="0.18" />
          <circle cx="108" cy="104" r="34" fill="#f5b400" />
          <circle cx="108" cy="104" r="20" fill="#ffe7a3" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
            const rad = (angle * Math.PI) / 180
            return (
              <line
                key={angle}
                x1={108 + Math.cos(rad) * 40}
                y1={104 + Math.sin(rad) * 40}
                x2={108 + Math.cos(rad) * 56}
                y2={104 + Math.sin(rad) * 56}
                stroke="#f5b400"
                strokeWidth="3"
                strokeLinecap="round"
              />
            )
          })}
          <line x1="150" y1="124" x2="560" y2="140" stroke="#f5b400" strokeWidth="10" strokeLinecap="round" opacity="0.16" />
          <line x1="160" y1="108" x2="470" y2="128" stroke="#ffe08a" strokeWidth="6" strokeLinecap="round" opacity="0.2" />
        </g>
      ) : null}

      <ellipse cx="520" cy="478" rx="340" ry="16" fill="#10233f" opacity="0.1" />

      <g mask={`url(#${mask})`}>
        <path
          d="M214 318
             C214 292 236 274 268 270
             L330 262
             C390 196 470 164 560 160
             H742
             C812 160 870 188 912 236
             L958 300
             C978 328 966 368 928 380
             L868 392
             H214
             C188 392 176 360 214 318Z"
          fill={`url(#${body})`}
        />
        <path
          d="M188 360
             C170 360 160 340 168 318
             L196 292
             C214 286 236 300 248 328
             L236 372
             Z"
          fill="#123154"
        />
        <path d="M900 332 H968 C976 348 970 372 948 378 H892 Z" fill="#fff1c2" />
      </g>

      <path
        d="M392 286
           C450 196 530 172 620 168
           H700
           C760 172 806 202 836 252
           L790 300
           L430 312
           C400 304 386 296 392 286Z"
        fill={`url(#${glass})`}
      />
      <path d="M470 196 H690" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.55" />
      <path d="M250 332 H900" stroke="#8fb4d4" strokeWidth="2" opacity="0.35" />
      <path d="M560 210 V392" stroke="#ffffff" strokeWidth="2" opacity="0.14" />
      <rect x="176" y="328" width="12" height="28" rx="3" fill="#ff5d5d" />
      <path d="M918 318 c18 4 28 16 26 30 h-30 z" fill="#fff6d4" />

      <Wheel cx="286" cy="412" spin={showSun} reduce={reduce} />
      <Wheel cx="748" cy="412" spin={showSun} reduce={reduce} />

      {showSystems ? (
        <g>
          <path
            d="M640 148 C700 190 690 250 560 300"
            fill="none"
            stroke="#f5b400"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <rect x="392" y="312" width="250" height="62" rx="12" fill="#0c2038" opacity="0.28" stroke="#d5e2ee" strokeDasharray="5 4" />
          <rect x="408" y="324" width="92" height="40" rx="8" fill="#12324f" stroke="#1f9d55" strokeWidth="2" />
          <text x="428" y="349" fill="#ffffff" fontSize="13" fontFamily="Outfit, sans-serif" fontWeight="700">
            MPPT
          </text>
          <rect x="530" y="324" width="96" height="40" rx="8" fill="#10233f" stroke="#f5b400" strokeWidth="2" />
          <rect x="538" y="332" width="58" height="24" rx="4" fill="#1f9d55" />
          <text x="548" y="349" fill="#ffffff" fontSize="12" fontFamily="Outfit, sans-serif" fontWeight="700">
            AUX
          </text>
          <path d="M500 344 H530" stroke="#1f9d55" strokeWidth="3" strokeLinecap="round" />
        </g>
      ) : null}

      <g>
        <rect x="488" y="150" width="292" height="8" rx="4" fill="#d7e1ea" />
        <rect x="488" y="158" width="292" height="4" rx="2" fill="#8ea3b5" />
        {[520, 632, 744].map((x) => (
          <rect key={x} x={x} y="154" width="8" height="20" rx="2" fill="#93a7ba" />
        ))}
      </g>

      {PANEL_X.map((x) => (
        <SolarPanel key={x} x={x} y={PANEL_Y} fill={`url(#${panel})`} />
      ))}

      {showSlide ? (
        <g>
          <motion.line
            x1="734"
            y1="150"
            stroke="#8ea3b5"
            strokeWidth="4"
            strokeLinecap="round"
            initial={false}
            animate={parked ? { x2: 900, y2: 236, opacity: 1 } : { x2: 734, y2: 150, opacity: 0 }}
            transition={spring}
          />
          <motion.line
            x1="540"
            y1="150"
            stroke="#8ea3b5"
            strokeWidth="4"
            strokeLinecap="round"
            initial={false}
            animate={parked ? { x2: 250, y2: 228, opacity: 1 } : { x2: 540, y2: 150, opacity: 0 }}
            transition={spring}
          />
          <motion.g
            initial={false}
            animate={parked ? { x: 188, y: 96, rotate: 16, opacity: 1 } : { x: 0, y: 0, rotate: 0, opacity: 0 }}
            transition={spring}
            style={{ transformOrigin: "730px 135px" }}
          >
            <SolarPanel x={686} y={PANEL_Y} fill={`url(#${panel})`} />
          </motion.g>
          <motion.g
            initial={false}
            animate={parked ? { x: -270, y: 88, rotate: -12, opacity: 1 } : { x: 0, y: 0, rotate: 0, opacity: 0 }}
            transition={spring}
            style={{ transformOrigin: "540px 135px" }}
          >
            <SolarPanel x={498} y={PANEL_Y} fill={`url(#${panel})`} />
          </motion.g>
        </g>
      ) : null}

      {showSun ? <SunParticles reduce={reduce} /> : null}
    </svg>
  )
}
