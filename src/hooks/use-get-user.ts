import { useQuery } from "@tanstack/react-query";
import { supabase } from "../utils/supabaseClient";

export const useGetUser = () =>
  useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase.auth.getUser();

        if (error) throw new Error(error.message);

        return data.user;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  });
