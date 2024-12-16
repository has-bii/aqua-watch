import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex w-full items-center justify-center px-8">
      <div className="max-w-[32rem]">
        {/* Header */}
        <h1 className="mb-4 text-center text-2xl font-bold">
          Welcome to Your Smart Aquarium Setup
        </h1>

        <p className="text-center text-gray-400">
          In a few simple steps, we'll connect your device to WiFi, sign into
          your account, and select the aquarium you'd like to monitor
        </p>

        <Link to="/getting-started" className="btn mx-auto mt-4">
          Let's Get Started!
        </Link>
      </div>
    </div>
  );
}
