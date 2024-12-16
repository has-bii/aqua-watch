import { useQuery } from "@tanstack/react-query";
import { getApiUrl } from "../utils/get-api-url";

const useGetWifiStatus = () =>
  useQuery({
    queryKey: ["wifi-status"],
    retry: false,
    queryFn: async () => {
      try {
        const res = (await fetch(getApiUrl("/api/status"), {
          method: "GET",
        }).then((res) => res.json())) as { message: string; status: string };

        return res.status;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  });

export { useGetWifiStatus };
