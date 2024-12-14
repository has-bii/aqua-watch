export type TNetwork = {
  id: number;
  ssid: string;
  rssi: number;
  isOpen: "closed" | "open";
};
