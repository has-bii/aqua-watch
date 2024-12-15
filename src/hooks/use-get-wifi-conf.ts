import { useQuery } from "@tanstack/react-query";

const useGetWifiConf = () =>
  useQuery({
    queryKey: ["wifi-conf"],
    retry: false,
    queryFn: async () => {
      try {
        const res = (await fetch(
          import.meta.env.PROD
            ? "/api/wifi-conf"
            : `${import.meta.env.VITE_API_URL}/wifi-conf`,
          {
            method: "GET",
          }
        ).then((res) => res.json())) as {
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
