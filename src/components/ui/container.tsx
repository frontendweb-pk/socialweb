import clsx from "clsx";

type ContainerProps = React.HtmlHTMLAttributes<HTMLDivElement> & {};
export default function Container({
  children,
  className,
  ...rest
}: ContainerProps) {
  const classes = clsx("mx-auto max-w-[1240px]", className);
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}
