import clsx from "clsx";

type FormProps = React.FormHTMLAttributes<HTMLFormElement> & {};
export default function Form({ children, className, ...rest }: FormProps) {
  return (
    <form className={clsx(className)} {...rest} noValidate>
      {children}
    </form>
  );
}
