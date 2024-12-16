import { useQuery } from "@tanstack/react-query";
import { getApiUrl } from "../utils/get-api-url";

export type SelectedEnvironment = {
  id: string;
  name: string;
};

export const useGetSelectedEnv = () =>
  useQuery({
    queryKey: ["selected-env"],
    queryFn: async () => {
      try {
        const res = await fetch(getApiUrl("/api/environment"), {
          method: "GET",
        }).then(async (res) => {
          if (res.status !== 200) return null;

          return (await res.json()) as {
            message: string;
            data: SelectedEnvironment;
          };
        });

        return res?.data;
      } catch (error) {
        throw error;
      }
    },
  });
