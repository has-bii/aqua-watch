import { createLazyFileRoute } from "@tanstack/react-router";
import Network from "../components/network/network";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      {/* Header */}
      <h1 className="text-2xl font-bold text-center mb-4">Getting started</h1>

      {/* Card */}
      <Network />
    </>
  );
}
