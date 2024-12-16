import UserLogin from "./user-login";
import { useGetUser } from "../../hooks/use-get-user";
import UserData from "./user-data";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useGettingStartedStep } from "../getting-started/use-getting-started-step";

export default function User() {
  const { data: userData, refetch } = useGetUser();
  const { changeState } = useGettingStartedStep();

  return (
    <div className="w-full max-w-96 space-y-4">
      <h1 className="text-center text-3xl font-bold text-black">User Login</h1>
      <p className="text-center text-sm text-gray-400">
        Sign in to your account to sync data with the cloud.
      </p>

      {userData ? (
        <UserData userData={userData} />
      ) : (
        <UserLogin refetch={refetch} user={userData} />
      )}

      <div className="flex w-full items-center justify-between">
        <button
          className="btn border-none bg-transparent font-medium text-black"
          onClick={() => changeState("wifi")}
        >
          <ArrowLeft /> Back
        </button>

        {!!userData && (
          <button
            className="btn border-none bg-transparent font-medium text-black"
            onClick={() => changeState("env")}
          >
            Next <ArrowRight />
          </button>
        )}
      </div>
    </div>
  );
}
