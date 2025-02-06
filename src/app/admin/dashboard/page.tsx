import { signOut } from "next-auth/react";

export default function Dashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <form
        action={async () => {
          "use server";
          await signOut({
            redirectTo: "/login",
          });
        }}
      >
        <button type="submit">Logout</button>
      </form>

      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </div>
  );
}
