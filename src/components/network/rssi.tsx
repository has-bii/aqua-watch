import { TNetwork } from "../../types/network";
import {
  WifiHighIcon,
  WifiIcon,
  WifiLowIcon,
  WifiZeroIcon,
} from "lucide-react";

type Props = {
  rssi: TNetwork["rssi"];
};

export default function RSSI({ rssi }: Props) {
  if (rssi >= -15) return <WifiIcon size={18} />;

  if (rssi >= -30) return <WifiHighIcon size={18} />;

  if (rssi >= -60) return <WifiLowIcon size={18} />;

  return <WifiZeroIcon size={18} />;
}
