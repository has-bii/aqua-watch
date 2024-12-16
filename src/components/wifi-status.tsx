import React, { useCallback } from "react";
import { useGetWifiStatus } from "../hooks/use-get-wifi-status";
import { LoaderIcon, WifiIcon, WifiOffIcon } from "lucide-react";

export default function WifiStatus() {
  const [show, setShow] = React.useState(false);
  const {
    data: wifiStatus,
    isLoading,
    refetch,
    isRefetching,
  } = useGetWifiStatus();

  const handleMouseEnter = useCallback(() => {
    if (wifiStatus?.status === "Connected") setShow(true);
  }, [wifiStatus]);

  const handleMouseLeave = useCallback(() => {
    setShow(false);
  }, []);

  if (isLoading || isRefetching)
    return <LoaderIcon size={20} className="animate-spin" />;

  if (wifiStatus !== undefined)
    return (
      <div
        className="relative w-fit"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="flex items-center gap-2"
          role="button"
          onClick={() => refetch()}
        >
          {wifiStatus.status === "Connected" ? (
            <WifiIcon size={20} />
          ) : (
            <WifiOffIcon size={20} />
          )}
          <p className="hidden text-sm lg:block">{wifiStatus.status}</p>
        </div>

        {show && (
          <div className="absolute right-0 top-full w-fit rounded-md border bg-white px-6 py-4 text-right">
            <h1 className="mb-2 whitespace-nowrap text-sm font-medium">
              Wifi Configuration
            </h1>
            <div className="text-sm text-gray-400">
              <p className="text-sm">{wifiStatus.data?.ssid}</p>
              <p className="text-sm">{wifiStatus.data?.ip}</p>
            </div>
          </div>
        )}
      </div>
    );
}
