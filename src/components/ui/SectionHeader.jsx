export default function SectionHeader({ eyebrow, title, description }) {
  return (
    <header className="section-header">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      {title ? <h2>{title}</h2> : null}
      {description ? <p>{description}</p> : null}
    </header>
  );
}
