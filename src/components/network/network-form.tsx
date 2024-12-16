import { useForm } from "@tanstack/react-form";
import { TNetwork } from "../../types/network";
import { getApiUrl } from "../../utils/get-api-url";

type Props = {
  data: TNetwork;
  wifiConf?: {
    ssid: string;
    password: string;
  };
};

export default function NetworkForm({
  data: { ssid, isOpen },
  wifiConf,
}: Props) {
  const form = useForm({
    defaultValues: {
      ssid,
      password: ssid === wifiConf?.ssid ? wifiConf.password : "",
    },
    onSubmit: async ({ value: { password, ssid } }) => {
      try {
        const res = await fetch(getApiUrl("/api/wifi-conf"), {
          method: "POST",
          body: JSON.stringify({
            ssid,
            password,
          }),
        });

        if (res.status !== 200) return;

        const resConnect = await fetch(getApiUrl("/api/connect"), {
          method: "GET",
        }).then((res) => res.json());

        console.log(resConnect);
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
        Connect
      </button>
    </form>
  );
}
