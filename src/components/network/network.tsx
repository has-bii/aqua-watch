import { RefreshCwIcon } from "lucide-react";
import { useGetNetworks } from "../../hooks/use-get-networks";
import NetworkList from "./network-list";
import { useGetWifiConf } from "../../hooks/use-get-wifi-conf";

export default function Network() {
  const { data, refetch, isRefetching, isLoading, isError, error } =
    useGetNetworks();
  const { data: wifiData } = useGetWifiConf();

  return (
    <div className="space-y-4 w-full max-w-[32rem]">
      <h1 className="text-3xl font-bold text-black text-center">Network</h1>
      <p className="text-sm text-gray-400 text-center">
        Connect your device to WiFi to enable cloud communication.
      </p>

      <main className="card">
        <div className="inline-flex gap-2 justify-between items-center w-full">
          <button className="btn ml-auto" onClick={() => refetch()}>
            <RefreshCwIcon
              className={isRefetching || isLoading ? "animate-spin" : ""}
              size={18}
            />
            Scan
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

      <div className="flex">
        {wifiData !== undefined && (
          <button className="btn ml-auto">Next</button>
        )}
      </div>
    </div>
  );
}
