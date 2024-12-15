import { useGetWifiStatus } from "../hooks/use-get-wifi-status";
import { LoaderIcon, WifiIcon, WifiOffIcon } from "lucide-react";

export default function WifiStatus() {
  const { data, isLoading, refetch, isRefetching } = useGetWifiStatus();

  if (isLoading || isRefetching)
    return <LoaderIcon size={20} className="animate-spin" />;

  if (data !== undefined)
    return (
      <div
        className="flex gap-2 items-center"
        role="button"
        onClick={() => refetch()}
      >
        {data === "Connected" ? (
          <WifiIcon size={20} />
        ) : (
          <WifiOffIcon size={20} />
        )}
        <p className="text-sm hidden lg:block">{data}</p>
      </div>
    );
}
