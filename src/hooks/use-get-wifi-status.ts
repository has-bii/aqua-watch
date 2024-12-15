import { useQuery } from "@tanstack/react-query";

const useGetWifiStatus = () =>
  useQuery({
    queryKey: ["wifi-status"],
    retry: false,
    queryFn: async () => {
      try {
        const res = (await fetch(
          import.meta.env.PROD
            ? "/api/status"
            : `${import.meta.env.VITE_API_URL}/status`,
          {
            method: "GET",
          }
        ).then((res) => res.json())) as { message: string; status: string };

        return res.status;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  });

export { useGetWifiStatus };
