export default function Container({ children, className = '' }) {
  return <div className={`mx-auto w-full max-w-304 px-6 sm:px-8 ${className}`.trim()}>{children}</div>;
}
