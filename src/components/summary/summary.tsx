import { useGettingStartedStep } from "../getting-started/use-getting-started-step";
import { ArrowLeft, HomeIcon } from "lucide-react";
import { useGetWifiStatus } from "../../hooks/use-get-wifi-status";
import { useGetUser } from "../../hooks/use-get-user";
import { useGetSelectedEnv } from "../../hooks/use-get-selected-env";
import { Link } from "@tanstack/react-router";

export default function Summary() {
  const { changeState } = useGettingStartedStep();
  const { data: wifiStatus } = useGetWifiStatus();
  const { data: user } = useGetUser();
  const { data: selectedEnv } = useGetSelectedEnv();

  return (
    <div className="flex w-full max-w-96 flex-col gap-4">
      <h1 className="text-center text-3xl font-bold text-black">
        Setup Complete!
      </h1>
      <p className="text-center text-sm text-gray-400">
        Here's your configuration summary.
      </p>

      <div className="space-y-3 overflow-y-auto">
        {!!wifiStatus && (
          <div className="card space-y-2">
            {/* header */}
            <h2 className="font-bold">Wifi Configuration</h2>

            <div className="space-y-1">
              <div>
                <span className="text-sm text-gray-400">SSID</span>
                <p className="font-medium">{wifiStatus.data.ssid}</p>
              </div>
              <div>
                <span className="text-sm text-gray-400">Status</span>
                <p className="font-medium">{wifiStatus.status}</p>
              </div>
            </div>
          </div>
        )}

        {!!user && (
          <div className="card space-y-2">
            {/* header */}
            <h2 className="font-bold">Account</h2>

            <div className="space-y-1">
              <div>
                <span className="text-sm text-gray-400">Full Name</span>
                <p className="font-medium">{user.user_metadata?.full_name}</p>
              </div>
              <div>
                <span className="text-sm text-gray-400">Email</span>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>
          </div>
        )}

        {!!selectedEnv && (
          <div className="card space-y-2">
            {/* header */}
            <h2 className="font-bold">Selected Aquarium</h2>

            <div className="space-y-1">
              <div>
                <span className="text-sm text-gray-400">Name</span>
                <p className="font-medium">{selectedEnv.name}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex w-full items-center justify-between">
        <button
          className="btn border-none bg-transparent font-medium text-black"
          onClick={() => changeState("env")}
        >
          <ArrowLeft /> Back
        </button>

        <Link
          to="/"
          className="btn border-none bg-transparent font-medium text-black"
        >
          Home <HomeIcon />
        </Link>
      </div>
    </div>
  );
}
