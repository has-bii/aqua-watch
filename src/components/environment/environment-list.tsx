import { useCallback } from "react";
import { useGetEnv } from "../../hooks/use-get-env";
import { SelectedEnvironment } from "../../hooks/use-get-selected-env";
import { getApiUrl } from "../../utils/get-api-url";
import { Database } from "../../types/database";

type Props = {
  selectedEnv?: SelectedEnvironment;
  refetchSelectedEnv: () => void;
};

export default function EnvironmentList({
  selectedEnv,
  refetchSelectedEnv,
}: Props) {
  const { data, isLoading, error, refetch } = useGetEnv();

  const handleSelectAquarium = useCallback(
    async (data: Database["public"]["Tables"]["aquarium"]["Row"]) => {
      try {
        const res = await fetch(getApiUrl("/api/environment"), {
          method: "POST",
          body: JSON.stringify({ ...data }),
        });

        const body = (await res.json()) as { message: string };

        if (res.status !== 200) {
          alert(body.message);
          return;
        }

        refetchSelectedEnv();
      } catch (error) {
        alert("Unexpected error occurred!");
        console.error(error);
      }
    },
    [],
  );

  if (isLoading)
    return (
      <div className="space-y-3 rounded-lg border p-4">
        <div className="h-6 w-full animate-pulse rounded-lg bg-gray-400" />
        <div className="h-6 w-full animate-pulse rounded-lg bg-gray-400" />
      </div>
    );

  if (data)
    return (
      <ul className="space-y-2">
        {data.length === 0 ? (
          <li className="flex max-h-96 space-y-3 overflow-y-auto rounded-lg border p-4">
            <p className="m-auto h-fit w-fit text-center text-gray-500">
              You do not have any aquarium
            </p>
          </li>
        ) : (
          data.map((env) => (
            <li
              key={env.id}
              className="max-h-96 space-y-3 overflow-y-auto rounded-lg border p-4"
            >
              <div className="inline-flex w-full items-center justify-between gap-3">
                <p className="font-medium">{env.name}</p>
                {selectedEnv?.id !== env.id ? (
                  <button
                    className="btn-md rounded-full px-3"
                    onClick={() => handleSelectAquarium(env)}
                  >
                    Choose
                  </button>
                ) : (
                  <span className="text-sm text-gray-400">Selected</span>
                )}
              </div>
              <div className="inline-flex w-full items-center justify-between">
                <span className="w-fit rounded-full bg-black px-3 py-1 text-sm capitalize text-white">
                  {env.env_type}
                </span>
              </div>
            </li>
          ))
        )}
      </ul>
    );

  if (error)
    return (
      <div className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-red-400 bg-red-50 p-4">
        <p className="text-center text-red-500">{error.message}.</p>
        <button
          className="btn btn-sm mx-auto bg-red-400 text-white"
          onClick={() => refetch()}
        >
          Refresh
        </button>
      </div>
    );
}
