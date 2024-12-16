import { LoaderIcon, PlusIcon, XIcon } from "lucide-react";
import React from "react";
import { useGetEnv } from "../../hooks/use-get-env";
import { useForm } from "@tanstack/react-form";
import { Database } from "../../types/database";
import { z } from "zod";
import FieldInfo from "../form/field-info";
import { supabase } from "../../utils/supabaseClient";
import { useGetUser } from "../../hooks/use-get-user";

type EnvType = Database["public"]["Enums"]["ENV_TYPE"];

const EnvTypes = ["aquarium", "pond"] as const;

const NewEnvSchema = z.object({
  name: z.string().min(4, "Min. length is 4 characters"),
  env_type: z.enum(EnvTypes),
});

export default function EnvironmentAdd() {
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const { refetch } = useGetEnv();
  const { data: user } = useGetUser();

  const { Field, handleSubmit, state, reset } = useForm({
    defaultValues: {
      name: "",
      env_type: "aquarium",
    },
    validators: {
      onChange: NewEnvSchema,
    },
    onSubmit: async ({ value: { env_type, name } }) => {
      try {
        if (!user) return;

        const { error } = await supabase
          .from("environment")
          .insert({ name, user_id: user.id, env_type: env_type as EnvType });

        if (error) {
          alert(error.message);
          return;
        }

        refetch();
        reset();
        dialogRef.current?.close();
      } catch (error) {
        alert("Unexpected error occurred");
        console.error(error);
      }
    },
  });

  return (
    <>
      <button className="btn" onClick={() => dialogRef.current?.showModal()}>
        New <PlusIcon />
      </button>
      <dialog
        open={false}
        ref={dialogRef}
        className="min-w-96 rounded-xl bg-white"
      >
        {/* Header */}
        <div className="inline-flex w-full items-center justify-between px-4 pb-1.5 pt-3">
          <h1 className="text-lg font-semibold">Create New Aquarium</h1>

          <XIcon
            role="button"
            onClick={() => {
              dialogRef.current?.close();
            }}
          />
        </div>

        {/* Body */}
        <div className="px-4 pb-4 pt-1.5">
          <form
            className="space-y-2"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSubmit();
            }}
          >
            <Field
              name="name"
              children={(field) => {
                return (
                  <div className="form-input-wrapper">
                    <label htmlFor={field.name} className="form-label">
                      Name
                    </label>
                    <input
                      className="form-input"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Piranha Fish Tank"
                    />
                    <FieldInfo field={field} />
                  </div>
                );
              }}
            />

            <Field
              name="env_type"
              children={(field) => {
                return (
                  <div className="form-input-wrapper">
                    <label htmlFor={field.name} className="form-label">
                      Type
                    </label>
                    <select
                      className="form-input capitalize"
                      name={field.name}
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => {
                        field.handleChange(e.target.value);
                      }}
                    >
                      {EnvTypes.map((env) => (
                        <option key={env} value={env} className="capitalize">
                          {env}
                        </option>
                      ))}
                    </select>
                    <FieldInfo field={field} />
                  </div>
                );
              }}
            />

            <button
              className="btn btn-lg"
              disabled={state.isSubmitting}
              type="submit"
            >
              {state.isSubmitting ? (
                <>
                  Loading... <LoaderIcon className="animate-spin" />
                </>
              ) : (
                <>
                  Add New <PlusIcon />
                </>
              )}
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}
