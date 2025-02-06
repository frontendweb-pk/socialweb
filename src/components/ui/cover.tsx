import clsx from "clsx";

type CoverProps = React.HtmlHTMLAttributes<HTMLDivElement> & {};
export default function Cover({ children, className, ...rest }: CoverProps) {
  const classes = clsx(
    "h-screen bg-indigo-900 w-screen flex items-center justify-center",
    className
  );
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}
