import { useQuery } from "@tanstack/react-query";
import { supabase } from "../utils/supabaseClient";

export const useGetEnv = () =>
  useQuery({
    queryKey: ["environments"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase.from("environment").select("*");

        if (error) throw new Error(error.message);

        return data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  });
