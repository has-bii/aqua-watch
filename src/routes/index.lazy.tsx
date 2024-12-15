import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="w-full flex items-center justify-center px-8">
      <h1 className="text-3xl font-bold text-black">Aqua Watch</h1>
    </div>
  );
}
