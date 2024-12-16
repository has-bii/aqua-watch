import { useQuery } from "@tanstack/react-query";
import { TNetwork } from "../types/network";
import { getApiUrl } from "../utils/get-api-url";

const useGetNetworks = () =>
  useQuery({
    queryKey: ["networks"],
    retry: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    enabled: false,
    queryFn: async () => {
      try {
        const res = (await fetch(getApiUrl("/api/scan"), {
          method: "GET",
        }).then((res) => res.json())) as TNetwork[];

        return res;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  });

export { useGetNetworks };
