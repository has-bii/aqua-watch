import { useForm } from "@tanstack/react-form";
import { TNetwork } from "../../types/network";

type Props = {
  data: TNetwork;
};

export default function NetworkForm({ data: { ssid, isOpen } }: Props) {
  const form = useForm({
    defaultValues: {
      ssid,
      password: "",
    },
    onSubmit: async ({ value: { password, ssid } }) => {
      try {
        const res = await fetch(
          import.meta.env.PROD
            ? "/api/save-wifi"
            : "http://192.168.1.83/api/save-wifi",
          {
            method: "POST",
            body: JSON.stringify({
              ssid,
              password,
            }),
          }
        );

        console.log(await res.json());
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <form
      className={`inline-flex w-full gap-3`}
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <form.Field
        name="password"
        children={(field) => (
          <input
            name={field.name}
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
            type="text"
            className={`input flex-1 ${isOpen === "open" && "hidden"}`}
            placeholder="Password"
          />
        )}
      />
      <button type="submit" className="btn-md ml-auto">
        Save
      </button>
    </form>
  );
}
