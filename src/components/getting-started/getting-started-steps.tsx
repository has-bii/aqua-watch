import {
  GettingStartedState,
  useGettingStartedStep,
} from "./use-getting-started-step";

const steps: { label: string; state: GettingStartedState; number?: number }[] =
  [
    { label: "Wifi Configuration", state: "wifi", number: 1 },
    { label: "", state: "divider" },
    { label: "User Login", state: "user", number: 2 },
    { label: "", state: "divider" },
    { label: "Aquarium", state: "env", number: 3 },
    { label: "", state: "divider" },
    { label: "Summary", state: "complete", number: 4 },
  ];

export default function GettingStartedSteps() {
  const { step: currentStep } = useGettingStartedStep();

  return (
    <div className="flex h-20 w-full max-w-full items-center gap-1 overflow-x-auto lg:gap-3">
      {steps.map(({ label, state, number }, i) => {
        if (state === "divider")
          return (
            <div key={i} className="h-1 flex-1 rounded-full bg-black/20" />
          );

        return (
          <div
            key={i}
            className={`flex items-center rounded-full px-3 py-3 font-medium ${state === currentStep ? "bg-black" : "bg-black/20"}`}
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white">
              {number}
            </span>
            <p
              className={`w-fit max-w-[60px] truncate whitespace-nowrap px-2 capitalize text-white lg:max-w-fit ${state !== currentStep && "hidden"}`}
            >
              {label}
            </p>
          </div>
        );
      })}
    </div>
  );
}
