import { IconNode, LucideProps } from "lucide-react";
import { ReactElement } from "react";

type iconProps = {
  icon?: ReactElement | React.ReactNode;
};
export default function Icon({ icon }: iconProps) {
  return <Icon icon={icon} />;
}
