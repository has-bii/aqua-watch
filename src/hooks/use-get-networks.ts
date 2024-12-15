import { useQuery } from "@tanstack/react-query";
import { TNetwork } from "../types/network";

const useGetNetworks = () =>
  useQuery({
    queryKey: ["networks"],
    retry: false,
    queryFn: async () => {
      try {
        const res = (await fetch(
          import.meta.env.PROD ? "/api/scan" : "http://192.168.1.83/api/scan",
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

export { useGetNetworks };
