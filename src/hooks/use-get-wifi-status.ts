import { useQuery } from "@tanstack/react-query";
import { getApiUrl } from "../utils/get-api-url";

export type TWifiStatus = {
  status: string;
  data: { ssid: string; password: string };
};

const useGetWifiStatus = () =>
  useQuery({
    queryKey: ["wifi-status"],
    retry: false,
    queryFn: async () => {
      try {
        const res = (await fetch(getApiUrl("/api/status"), {
          method: "GET",
        }).then((res) => res.json())) as TWifiStatus;

        return res;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  });

export { useGetWifiStatus };
