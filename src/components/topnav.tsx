import { Link } from "@tanstack/react-router";
import WifiStatus from "./wifi-status";

export default function TopNav() {
  return (
    <div className="w-full border-b h-[72px] shadow-sm flex items-center">
      <div className="container mx-auto flex items-center px-4">
        <h1 className="text-lg font-black uppercase">Aqua Watch</h1>

        <div className="inline-flex gap-8 items-center mx-auto">
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>

          <Link to="/getting-started" className="[&.active]:font-bold">
            Get Started
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <WifiStatus />
        </div>
      </div>
    </div>
  );
}
