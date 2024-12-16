import React from "react";
import { TNetwork } from "../../types/network";
import { LockIcon } from "lucide-react";
import RSSI from "./rssi";
import NetworkForm from "./network-form";
import { useGetWifiConf } from "../../hooks/use-get-wifi-conf";
import { TWifiStatus } from "../../hooks/use-get-wifi-status";

type Props = {
  data: TNetwork[];
  wifiStatus?: TWifiStatus;
  refetchWifiStatus: () => void;
};

export default function NetworkList({
  data,
  wifiStatus,
  refetchWifiStatus,
}: Props) {
  const [selected, setSelected] = React.useState<number | null>(null);
  const { data: wifiConf } = useGetWifiConf();

  // onSubmit

  return (
    <ul className="max-h-96 space-y-1 overflow-y-auto overflow-x-hidden">
      {data.length !== 0 ? (
        data.map(({ id, isOpen, rssi, ssid }) => {
          const isSelected = selected === id;
          return (
            <li
              key={id}
              className={`space-y-3 rounded-md px-3 py-4 transition-colors duration-200 hover:bg-black/15 ${isSelected && "bg-black/15"}`}
              role="button"
              onClick={() => setSelected(id)}
            >
              <div className="inline-flex items-center gap-2">
                <p className="max-w-96 truncate">{ssid}</p>
                <RSSI rssi={rssi} />
                {isOpen === "closed" && <LockIcon size={18} />}

                {wifiConf?.ssid === ssid &&
                wifiStatus?.status === "Connected" ? (
                  <span className="text-xs">Connected</span>
                ) : (
                  ""
                )}
              </div>

              {!isSelected ? (
                ""
              ) : (
                <NetworkForm
                  data={{ id, isOpen, rssi, ssid }}
                  wifiConf={wifiConf}
                  refetchWifiStatus={refetchWifiStatus}
                />
              )}
            </li>
          );
        })
      ) : (
        <li className="w-full rounded-md bg-gray-50 px-4 py-8 text-center text-gray-500">
          Network not found
        </li>
      )}
    </ul>
  );
}
