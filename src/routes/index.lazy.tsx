import { createLazyFileRoute } from "@tanstack/react-router";
import { useGetNetworks } from "../hooks/use-get-networks";
import { RefreshCwIcon } from "lucide-react";
import Network from "../components/network/network";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const { data, refetch, isRefetching, isLoading } = useGetNetworks();

  return (
    <>
      {/* Header */}
      <h1 className="text-2xl font-bold text-center mb-4">Getting started</h1>

      {/* Card */}
      <main className="border rounded-lg p-6 space-y-4">
        <div className="inline-flex gap-2 justify-between items-center w-full ">
          <p className="text-sm text-gray-400">Please select network...</p>

          <button className="btn" onClick={() => refetch()}>
            <RefreshCwIcon
              className={isRefetching || isLoading ? "animate-spin" : ""}
              size={18}
            />
          </button>
        </div>

        {data === undefined ? "" : <Network data={data} />}
      </main>
    </>
  );
}
