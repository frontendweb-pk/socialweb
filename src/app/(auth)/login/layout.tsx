import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // check if the user is logged in
  const session = await auth();
  if (session?.user?.role_id === 1) redirect("/admin/dashboard");
  if (session?.user?.role_id === 2) redirect("/user/dashboard");

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="bg-gray-100 p-4 rounded-lg shadow-md min-w-64 min-h-64">
        <h1>Login layout</h1>
        {children}
      </div>
    </div>
  );
}
