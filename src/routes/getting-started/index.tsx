import { createFileRoute } from "@tanstack/react-router";
import Network from "../../components/network/network";
import User from "../../components/user/user";
import GettingStartedSteps from "../../components/getting-started/getting-started-steps";
import { useGettingStartedStep } from "../../components/getting-started/use-getting-started-step";
import Environment from "../../components/environment/environment";
import Summary from "../../components/summary/summary";

export const Route = createFileRoute("/getting-started/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { step } = useGettingStartedStep();

  return (
    <div className="mx-auto flex w-[32rem] flex-col items-center overflow-y-auto px-8">
      <GettingStartedSteps />
      <div className="mt-10 flex w-full items-center justify-center lg:mt-20">
        {step === "wifi" && <Network />}

        {step === "user" && <User />}

        {step === "env" && <Environment />}

        {step === "complete" && <Summary />}
      </div>
    </div>
  );
}
