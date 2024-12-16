import React, { useCallback } from "react";
import { useGetWifiConf } from "../hooks/use-get-wifi-conf";
import { useGetWifiStatus } from "../hooks/use-get-wifi-status";
import { LoaderIcon, WifiIcon, WifiOffIcon } from "lucide-react";

export default function WifiStatus() {
  const [show, setShow] = React.useState(false);
  const { data, isLoading, refetch, isRefetching } = useGetWifiStatus();
  const { data: wifiConf } = useGetWifiConf();

  const handleMouseEnter = useCallback(() => {
    if (wifiConf!!) setShow(true);
  }, [wifiConf]);

  const handleMouseLeave = useCallback(() => {
    setShow(false);
  }, []);

  if (isLoading || isRefetching)
    return <LoaderIcon size={20} className="animate-spin" />;

  if (data !== undefined)
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
          {data === "Connected" ? (
            <WifiIcon size={20} />
          ) : (
            <WifiOffIcon size={20} />
          )}
          <p className="text-sm hidden lg:block">{data}</p>
        </div>

        {show && (
          <div className="absolute top-full w-fit px-6 py-4 border rounded-md bg-white right-0 text-right">
            <h1 className="font-medium text-sm whitespace-nowrap mb-2">
              Wifi Configuration
            </h1>
            <div className="text-sm text-gray-400">
              <p className="text-sm">{wifiConf?.ssid}</p>
              <p className="text-sm">{wifiConf?.password}</p>
            </div>
          </div>
        )}
      </div>
    );
}
