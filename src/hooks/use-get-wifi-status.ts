import { useQuery } from "@tanstack/react-query";

const useGetWifiStatus = () =>
  useQuery({
    queryKey: ["wifi-status"],
    queryFn: async () => {
      try {
        const res = (await fetch(
          import.meta.env.PROD
            ? "/api/status"
            : "http://192.168.1.83/api/status",
          {
            method: "GET",
          }
        ).then((res) => res.json())) as { message: string };

        return res;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  });

export { useGetWifiStatus };
