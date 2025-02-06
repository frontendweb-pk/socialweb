import Image from "next/image";

type UserControlProps = {
  avatar: string;
  name: string;
};
export default function UserControl({ avatar, name = "AV" }: UserControlProps) {
  return (
    <div className="flex gap-2 text-sm font-bold items-center">
      <Image
        className="rounded-full ring-rose-50 p-1 ring-2 h-7 w-7"
        src={avatar ? avatar : "/avatar.png"}
        width={20}
        height={20}
        alt={name}
      />
      <span>{name}</span>
    </div>
  );
}
