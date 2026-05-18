export default function Container({ children, className = '' }) {
  return (
    <div className={`mx-auto w-full max-w-[96rem] px-6 ${className}`.trim()}>{children}</div>
  );
}
