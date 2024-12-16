import { useQuery } from "@tanstack/react-query";
import { getApiUrl } from "../utils/get-api-url";

export type UserConf = {
  email: string;
  password: string;
};

export const useGetUserConf = () =>
  useQuery({
    queryKey: ["user-conf"],
    queryFn: async () => {
      try {
        const res = await fetch(getApiUrl("/api/user-conf"), {
          method: "GET",
        }).then(async (res) => {
          if (res.status !== 200) return null;

          return (await res.json()) as {
            message: string;
            data: UserConf;
          };
        });

        return res?.data;
      } catch (error) {
        throw error;
      }
    },
  });
