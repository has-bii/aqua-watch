import { User } from "@supabase/supabase-js";
import { useForm } from "@tanstack/react-form";
import { PencilIcon } from "lucide-react";
import React from "react";
import { z } from "zod";
import { supabase } from "../../utils/supabaseClient";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  userData: User;
};

const FullnameSchema = z.object({
  full_name: z.string().min(4, "Min. length is 3 characters"),
});

export default function UserData({ userData }: Props) {
  const [isEdit, setEdit] = React.useState(false);
  const query = useQueryClient();

  const { Field, handleSubmit, state } = useForm({
    defaultValues: {
      full_name: userData.user_metadata?.full_name ?? "",
    },
    validators: {
      onChange: FullnameSchema,
    },
    onSubmit: async ({ value: { full_name } }) => {
      try {
        const { error, data } = await supabase.auth.updateUser({
          data: {
            full_name,
          },
        });

        if (error) {
          alert(error.message);
          return;
        }

        query.setQueryData(["user"], () => data.user);
        setEdit(false);
      } catch (error) {
        alert("Unexpected error occurred");
        console.error(error);
      }
    },
  });

  return (
    <div className="flex w-full items-center gap-3 rounded-lg border p-4">
      <div className="h-12 w-12 rounded-full bg-black" />
      <div className="space-y-1 font-medium">
        {isEdit ? (
          <form
            className="flex items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSubmit();
            }}
          >
            <Field
              name="full_name"
              children={(field) => (
                <input
                  className="h-7 rounded-md border px-2 text-sm font-normal focus:outline-none"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Full name"
                />
              )}
            />
            <button className="btn-sm" type="submit">
              {state.isSubmitting ? "Loading..." : "Save"}
            </button>
          </form>
        ) : (
          <div className="flex items-center gap-2">
            {userData.user_metadata?.full_name ?? "-"}
            <PencilIcon role="button" size={16} onClick={() => setEdit(true)} />
          </div>
        )}
        <p className="text-sm text-gray-400">{userData.email}</p>
      </div>
    </div>
  );
}
