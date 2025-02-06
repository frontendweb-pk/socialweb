import { BellIcon, LogInIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import UserControl from "../common/user-control";
import { auth } from "@/auth";

export default async function Navigation() {
  const session = await auth();
  return (
    <nav className="flex items-center">
      <ul className="flex items-center gap-4">
        {session ? (
          <>
            <li>
              <Link href="/notification">
                <BellIcon size={20} />
              </Link>
            </li>
            <li>
              <Link href="/notification">
                <UserIcon size={20} />
              </Link>
            </li>
            <li>
              <UserControl
                avatar={
                  session?.user?.avatar ? session.user.avatar.toString() : ""
                }
                name={session?.user?.first_name!}
              />
            </li>
          </>
        ) : (
          <li>
            <Link href="/login" className="flex items-center gap-2 text-sm">
              <LogInIcon size={20} /> Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
