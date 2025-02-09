import { auth, signIn } from "@/auth";
import Logo from "@/components/layout/logo";
import Cover from "@/components/ui/cover";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  return (
    <Cover>
      <div className="flex justify-center text-white flex-col w-[560px] max-auto text-center">
        <Logo />
        <h1 className="text-lg font-bold my-5">Welcome to Blogger</h1>
        <p className="text-sm ">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem
          minima, alias consectetur recusandae repellendus porro obcaecati!
          Aliquid officiis, nostrum odit numquam accusantium cupiditate error
          quia rem eum voluptatibus illum placeat?
        </p>
        <div className="flex justify-center mt-5">
          <Link href="/login">Login</Link>
        </div>
      </div>
    </Cover>
  );
}
