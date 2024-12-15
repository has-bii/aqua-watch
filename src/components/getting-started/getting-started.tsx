type Props = {
  next: () => void;
};

export default function GettingStarted({ next }: Props) {
  return (
    <div className="max-w-[32rem]">
      {/* Header */}
      <h1 className="text-2xl font-bold text-center mb-4">
        Welcome to Your Smart Aquarium Setup
      </h1>

      <p className="text-center text-gray-400">
        In a few simple steps, we'll connect your device to WiFi, sign into your
        account, and select the aquarium you'd like to monitor
      </p>

      <button className="btn mx-auto mt-4" onClick={next}>
        Let's Get Started!
      </button>
    </div>
  );
}
