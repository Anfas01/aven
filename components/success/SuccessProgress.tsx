interface Props {
  countdown: number;
}

export default function SuccessProgress({
  countdown,
}: Props) {
  const TOTAL_SECONDS = 10;

  const progress = ((TOTAL_SECONDS - countdown) / TOTAL_SECONDS) * 100;

  return (
    <section className="rounded-2rem border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
          Redirect
        </span>

        <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900">
          Taking you to your orders
        </h2>

        <p className="mt-3 text-zinc-500">
          Take a moment to review your confirmation. We&apos;ll automatically
          redirect you to your orders in
        </p>

        <p className="mt-2 text-5xl font-bold tracking-tight text-zinc-900">
          {countdown}
        </p>

        <p className="mt-1 text-sm text-zinc-500">
          second{countdown !== 1 ? "s" : ""} remaining
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mt-8">
        <div className="h-3 overflow-hidden rounded-full bg-zinc-200">
          <div
            className="h-full rounded-full bg-zinc-900 transition-all duration-1000 ease-linear"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      <p className="mt-5 text-center text-sm leading-6 text-zinc-500">
        If the page doesn&apos;t redirect automatically, you can use the button
        below to view your orders.
      </p>
    </section>
  );
}