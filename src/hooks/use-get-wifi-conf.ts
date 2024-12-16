import { useQuery } from "@tanstack/react-query";
import { getApiUrl } from "../utils/get-api-url";

const useGetWifiConf = () =>
  useQuery({
    queryKey: ["wifi-conf"],
    retry: false,
    queryFn: async () => {
      try {
        const res = (await fetch(getApiUrl("/api/wifi-conf"), {
          method: "GET",
        }).then((res) => res.json())) as {
          message: string;
          data: { ssid: string; password: string };
        };

        return res.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  });

export { useGetWifiConf };
