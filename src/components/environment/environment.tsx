import { useGettingStartedStep } from "../getting-started/use-getting-started-step";
import { ArrowLeft, ArrowRight } from "lucide-react";
import EnvironmentList from "./environment-list";
import { useGetSelectedEnv } from "../../hooks/use-get-selected-env";
import EnvironmentAdd from "./environment-add";

export default function Environment() {
  const { changeState } = useGettingStartedStep();
  const { data: selectedEnv, refetch } = useGetSelectedEnv();

  return (
    <div className="flex w-full max-w-96 flex-col gap-4">
      <h1 className="text-center text-3xl font-bold text-black">
        Aquarium Selection
      </h1>
      <p className="text-center text-sm text-gray-400">
        Select the aquarium you'd like to monitor.
      </p>

      <div className="inline-flex w-full items-center justify-end gap-2">
        <button className="btn">Refresh</button>
        <EnvironmentAdd />
      </div>

      <EnvironmentList
        selectedEnv={selectedEnv}
        refetchSelectedEnv={() => refetch()}
      />

      <div className="mt-4 flex w-full items-center justify-between">
        <button
          className="btn border-none bg-transparent font-medium text-black"
          onClick={() => changeState("user")}
        >
          <ArrowLeft /> Back
        </button>

        {!!selectedEnv && (
          <button
            className="btn border-none bg-transparent font-medium text-black"
            onClick={() => changeState("complete")}
          >
            Next <ArrowRight />
          </button>
        )}
      </div>
    </div>
  );
}
