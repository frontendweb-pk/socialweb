import { logout } from "@/actions/auth";
import { AppContent } from "@/util/content";

export default function Signout() {
  return (
    <form action={logout}>
      <button type="submit">{AppContent.signOut}</button>
    </form>
  );
}
