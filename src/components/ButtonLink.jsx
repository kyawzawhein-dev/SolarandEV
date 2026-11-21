const styles = {
  primary:
    "bg-solar text-navy shadow-sm hover:bg-solar-deep focus-visible:outline-navy",
  secondary:
    "bg-white text-navy ring-1 ring-navy/10 hover:bg-sand focus-visible:outline-eco",
  inverse:
    "bg-white/10 text-white ring-1 ring-white/30 hover:bg-white/20 focus-visible:outline-white",
}

export default function ButtonLink({
  href,
  onClick,
  variant = "primary",
  children,
  className = "",
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${styles[variant]} ${className}`}
    >
      {children}
    </a>
  )
}
