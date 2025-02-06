import Logo from "./logo";
import Navigation from "./navigation";

export default function Header() {
  return (
    <header className="py-4 bg-indigo-900 text-white">
      <div className="container max-w-[1200px] mx-auto flex justify-between">
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}
