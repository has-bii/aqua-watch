import { useQuery } from "@tanstack/react-query";
import { TNetwork } from "../types/network";

const useGetWifiConf = () =>
  useQuery({
    queryKey: ["wifi-conf"],
    queryFn: async () => {
      try {
        const res = (await fetch(
          import.meta.env.PROD
            ? "/api/wifi-config"
            : "http://192.168.1.83/api/wifi-config",
          {
            method: "GET",
          }
        ).then((res) => res.json())) as TNetwork[];

        return res;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  });

export { useGetWifiConf };
