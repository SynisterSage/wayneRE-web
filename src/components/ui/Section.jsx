export default function Section({ children, className = '' }) {
  return <section className={`section ${className}`.trim()}>{children}</section>;
}
