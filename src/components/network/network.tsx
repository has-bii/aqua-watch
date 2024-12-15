import { RefreshCwIcon } from "lucide-react";
import { useGetNetworks } from "../../hooks/use-get-networks";
import NetworkList from "./network-list";

export default function Network() {
  const { data, refetch, isRefetching, isLoading, isError, error } =
    useGetNetworks();

  return (
    <>
      <main className="card">
        <div className="inline-flex gap-2 justify-between items-center w-full ">
          <p className="text-sm text-gray-400">Please select network...</p>

          <button className="btn" onClick={() => refetch()}>
            <RefreshCwIcon
              className={isRefetching || isLoading ? "animate-spin" : ""}
              size={18}
            />
          </button>
        </div>

        {data === undefined ? "" : <NetworkList data={data} />}

        {isError && error !== null ? (
          <div className="w-full flex items-center justify-center p-4 border border-red-400 bg-red-50 rounded-md">
            <p className="text-red-500">{error.message}</p>
          </div>
        ) : (
          ""
        )}
      </main>
    </>
  );
}
