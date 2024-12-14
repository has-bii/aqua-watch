import React from "react";
import { TNetwork } from "../../types/network";
import { LockIcon } from "lucide-react";
import RSSI from "./rssi";
import NetworkForm from "./network-form";

type Props = {
  data: TNetwork[];
};

export default function Network({ data }: Props) {
  const [selected, setSelected] = React.useState<number | null>(null);

  // onSubmit

  return (
    <ul className="space-y-1 max-h-96 overflow-y-auto overflow-x-hidden">
      {data.length !== 0 ? (
        data.map(({ id, isOpen, rssi, ssid }) => {
          const isSelected = selected === id;
          return (
            <li
              key={id}
              className={`px-2 py-3 hover:bg-black/15 rounded-md transition-colors duration-200 space-y-3 ${isSelected && "bg-black/15"}`}
              role="button"
              onClick={() => setSelected(id)}
            >
              <div className="inline-flex items-center gap-2">
                <p className="truncate max-w-96">{ssid}</p>
                <RSSI rssi={rssi} />
                {isOpen === "closed" && <LockIcon size={18} />}
              </div>

              {!isSelected ? (
                ""
              ) : (
                <NetworkForm data={{ id, isOpen, rssi, ssid }} />
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
