import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex gap-3 text-sm font-bold items-center">
      <div className="h-8 w-8 rounded-md flex items-center justify-center text-sm font-bold bg-white text-indigo-950">
        SW
      </div>
      Social Web
    </Link>
  );
}
