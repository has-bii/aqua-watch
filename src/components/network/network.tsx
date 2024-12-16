import { ArrowRight, RefreshCwIcon } from "lucide-react";
import { useGetNetworks } from "../../hooks/use-get-networks";
import NetworkList from "./network-list";
import { useGetWifiStatus } from "../../hooks/use-get-wifi-status";
import { useGettingStartedStep } from "../getting-started/use-getting-started-step";

export default function Network() {
  const { data, refetch, isRefetching, isLoading, isError, error } =
    useGetNetworks();
  const { data: wifiStatus, refetch: refetchWifiStatus } = useGetWifiStatus();
  const { changeState } = useGettingStartedStep();

  return (
    <div className="w-full max-w-[32rem] space-y-4">
      <h1 className="text-center text-3xl font-bold text-black">
        WiFi Configuration
      </h1>
      <p className="text-center text-sm text-gray-400">
        Connect your device to WiFi to enable cloud communication.
      </p>

      <main className="card">
        <div className="inline-flex w-full items-center justify-between gap-2">
          <button className="btn ml-auto" onClick={() => refetch()}>
            <RefreshCwIcon
              className={isRefetching || isLoading ? "animate-spin" : ""}
              size={18}
            />
            Scan
          </button>
        </div>

        {wifiStatus?.status === "Connected" ? (
          <div className="flex w-full items-center justify-between rounded-md border border-green-400 bg-green-50 px-3 py-3 text-sm text-green-500">
            <span>Connected to</span>
            <span>{wifiStatus.data.ssid}</span>
          </div>
        ) : (
          <div className="flex w-full items-center rounded-md border border-gray-400 bg-gray-50 px-3 py-3 text-sm text-gray-500">
            <span>Scan before connect to a WiFi</span>
          </div>
        )}

        {data === undefined ? (
          ""
        ) : (
          <NetworkList
            data={data}
            wifiStatus={wifiStatus}
            refetchWifiStatus={refetchWifiStatus}
          />
        )}

        {isError && error !== null ? (
          <div className="flex w-full items-center justify-center rounded-md border border-red-400 bg-red-50 p-4">
            <p className="text-red-500">{error.message}</p>
          </div>
        ) : (
          ""
        )}
      </main>

      {wifiStatus?.status === "Connected" && (
        <button
          className="btn ml-auto border-none bg-transparent font-medium text-black"
          onClick={() => changeState("user")}
        >
          Next <ArrowRight />
        </button>
      )}
    </div>
  );
}
