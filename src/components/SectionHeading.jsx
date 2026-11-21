export default function SectionHeading({ eyebrow, title, children, align = "center" }) {
  return (
    <div className={align === "left" ? "max-w-3xl text-left" : "mx-auto max-w-3xl text-center"}>
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-eco-deep">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-5xl">{title}</h2>
      {children ? (
        <div className="mt-4 text-base leading-relaxed text-ink sm:text-lg">{children}</div>
      ) : null}
    </div>
  )
}
