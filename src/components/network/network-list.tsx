import React from "react";
import { TNetwork } from "../../types/network";
import { LockIcon } from "lucide-react";
import RSSI from "./rssi";
import NetworkForm from "./network-form";
import { useGetWifiConf } from "../../hooks/use-get-wifi-conf";

type Props = {
  data: TNetwork[];
  isConnected: boolean;
};

export default function NetworkList({ data, isConnected }: Props) {
  const [selected, setSelected] = React.useState<number | null>(null);
  const { data: wifiConf } = useGetWifiConf();

  // onSubmit

  return (
    <ul className="space-y-1 max-h-96 overflow-y-auto overflow-x-hidden">
      {data.length !== 0 ? (
        data.map(({ id, isOpen, rssi, ssid }) => {
          const isSelected = selected === id;
          return (
            <li
              key={id}
              className={`px-3 py-4 hover:bg-black/15 rounded-md transition-colors duration-200 space-y-3 ${isSelected && "bg-black/15"}`}
              role="button"
              onClick={() => setSelected(id)}
            >
              <div className="inline-flex items-center gap-2">
                <p className="truncate max-w-96">{ssid}</p>
                <RSSI rssi={rssi} />
                {isOpen === "closed" && <LockIcon size={18} />}

                {wifiConf?.ssid === ssid && isConnected ? (
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
                />
              )}
            </li>
          );
        })
      ) : (
        <li className="w-full text-center px-4 py-8 bg-gray-50 text-gray-500 rounded-md">
          Network not found
        </li>
      )}
    </ul>
  );
}
