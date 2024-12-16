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
        className="w-fit relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="flex gap-2 items-center"
          role="button"
          onClick={() => refetch()}
        >
          {wifiStatus.status === "Connected" ? (
            <WifiIcon size={20} />
          ) : (
            <WifiOffIcon size={20} />
          )}
          <p className="text-sm hidden lg:block">{wifiStatus.status}</p>
        </div>

        {show && (
          <div className="absolute top-full w-fit px-6 py-4 border rounded-md bg-white right-0 text-right">
            <h1 className="font-medium text-sm whitespace-nowrap mb-2">
              Wifi Configuration
            </h1>
            <div className="text-sm text-gray-400">
              <p className="text-sm">{wifiStatus.data?.ssid}</p>
              <p className="text-sm">{wifiStatus.data?.password}</p>
            </div>
          </div>
        )}
      </div>
    );
}
