import { signIn } from "@/auth";

export default async function Page() {
  return (
    <div>
      <h1>Login</h1>
      <form
        action={async () => {
          "use server";
          await signIn("credentials", {
            email: "pradeep.kumar5@rsystems.com",
            password: "Admin$123@",
          });
        }}
      >
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
}
