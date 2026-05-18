import { Link } from 'react-router-dom';

const baseClasses =
  'inline-flex min-h-11 items-center justify-center rounded-[5px] border px-4 py-2 text-[0.98rem] font-medium transition-colors duration-200';

const variantClasses = {
  primary:
    '!border-brand-lake !bg-brand-lake !text-brand-cream hover:!border-[#2d4950] hover:!bg-[#2d4950] hover:!text-brand-cream',
  secondary: '!border-stone-300 !bg-transparent !text-stone-900 hover:!bg-stone-50',
  text: '!border-transparent !bg-transparent px-0 py-0 !text-brand-lake hover:!text-[#203840]',
};

export default function Button({ children, to, href, className = '', variant = 'primary', ...props }) {
  const classes = `${baseClasses} ${variantClasses[variant] ?? variantClasses.primary} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
