import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import GettingStarted from "../../components/getting-started/getting-started";
import Network from "../../components/network/network";

export const Route = createFileRoute("/getting-started/")({
  component: RouteComponent,
});

export type GettingStarted = "getting" | "wifi";

function RouteComponent() {
  const [state, setState] = React.useState<GettingStarted>("getting");

  return (
    <div className="w-full flex items-center justify-center px-8">
      {state === "getting" && <GettingStarted next={() => setState("wifi")} />}

      {state === "wifi" && <Network />}
    </div>
  );
}
