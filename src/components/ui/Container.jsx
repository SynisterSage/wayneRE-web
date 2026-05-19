export default function Container({ children, className = '' }) {
  return (
    <div className={`mx-auto w-full max-w-384 px-6 ${className}`.trim()}>{children}</div>
  );
}
