import { useForm } from "@tanstack/react-form";
import FieldInfo from "../form/field-info";
import { z } from "zod";
import { EyeClosedIcon, EyeIcon, Loader, LogInIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import { getApiUrl } from "../../utils/get-api-url";
import { useGetUserConf } from "../../hooks/use-get-user-conf";
import { User } from "@supabase/supabase-js";

const UserLoginSchema = z.object({
  email: z.string().email({ message: "Email is invalid!" }),
  password: z.string().min(6, { message: "Min. length is 6 characters" }),
});

type Props = {
  refetch: () => void;
  user?: User;
};

export default function UserLogin({ refetch, user }: Props) {
  const [show, setShow] = useState(false);
  const { data: userConf, refetch: refetchUserConf } = useGetUserConf();

  const { state, Field, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onChange: UserLoginSchema,
    },
    onSubmit: async ({ value: { email, password } }) => {
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          alert(error.message);
          return;
        }

        const res = await fetch(getApiUrl("/api/user-conf"), {
          method: "POST",
          body: JSON.stringify({ email, password }),
        });

        if (res.status !== 200) {
          alert("Failed to save user config. to device!");
          await supabase.auth.signOut();
          return;
        }

        refetchUserConf();
        refetch();
      } catch (error) {
        alert("Unexpected error occurred!");
        console.error(error);
      }
    },
  });

  const autoLogin = useCallback(async (): Promise<boolean> => {
    if (!userConf) return false;

    const { error } = await supabase.auth.signInWithPassword({ ...userConf });

    if (error) return false;

    return true;
  }, [userConf]);

  useEffect(() => {
    if (!user && !!userConf) autoLogin();
  }, [userConf]);

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit();
      }}
    >
      {/* Email */}
      <Field
        name="email"
        children={(field) => {
          return (
            <div className="form-input-wrapper">
              <label htmlFor={field.name} className="form-label">
                Email
              </label>
              <input
                className="form-input"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Email address"
              />
              <FieldInfo field={field} />
            </div>
          );
        }}
      />
      {/* Password */}
      <Field
        name="password"
        children={(field) => {
          return (
            <div className="form-input-wrapper">
              <label htmlFor={field.name} className="form-label">
                Password
              </label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  className="form-input w-full"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => setShow((prev) => !prev)}
                >
                  {show ? <EyeIcon size={18} /> : <EyeClosedIcon size={18} />}
                </button>
              </div>
              <FieldInfo field={field} />
            </div>
          );
        }}
      />

      <button className="btn btn-lg" type="submit">
        {state.isSubmitting ? (
          <>
            Loading... <Loader className="animate-spin" />
          </>
        ) : (
          <>
            Login <LogInIcon />
          </>
        )}
      </button>
    </form>
  );
}
