import React from "react";
import { useGetWifiStatus } from "../hooks/use-get-wifi-status";
import { WifiHighIcon, WifiIcon, WifiOffIcon } from "lucide-react";

export default function WifiStatus() {
  const { data, isLoading, refetch, isRefetching } = useGetWifiStatus();

  if (data !== undefined)
    return (
      <div className="flex gap-2 items-center">
        {data.message === "Connected" ? (
          <WifiIcon size={20} />
        ) : (
          <WifiOffIcon size={20} />
        )}
        <p className="text-sm">{data.message}</p>
      </div>
    );
}
