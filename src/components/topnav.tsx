import { Link } from "@tanstack/react-router";
import WifiStatus from "./wifi-status";

export default function TopNav() {
  return (
    <div className="w-full py-6 border-b h-fit shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-lg font-black uppercase">Aqua Watch</h1>

        <div className="inline-flex gap-4 items-center">
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <WifiStatus />
        </div>
      </div>
    </div>
  );
}
