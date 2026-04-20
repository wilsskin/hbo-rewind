import { useEffect, useRef } from "react";

interface ProgressIndicatorProps {
  currentFrame: number;
  totalFrames: number;
  durationSeconds: number;
  isPausedRef: React.RefObject<boolean>;
}

export default function ProgressIndicator({ currentFrame, totalFrames, durationSeconds, isPausedRef }: ProgressIndicatorProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    progressRef.current = 0;
    lastTimeRef.current = null;
    if (barRef.current) barRef.current.style.width = "0%";

    const tick = (now: number) => {
      if (!isPausedRef.current) {
        if (lastTimeRef.current !== null) {
          const delta = (now - lastTimeRef.current) / 1000;
          progressRef.current = Math.min(1, progressRef.current + delta / durationSeconds);
          if (barRef.current) barRef.current.style.width = `${progressRef.current * 100}%`;
        }
        lastTimeRef.current = now;
      } else {
        // While paused, clear lastTime so resumed ticks don't count paused duration
        lastTimeRef.current = null;
      }

      if (progressRef.current < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [currentFrame, durationSeconds]);

  return (
    <div className="absolute top-[100px] inset-x-0 z-50 flex gap-[3px] px-4 pointer-events-none">
      {Array.from({ length: totalFrames }).map((_, index) => {
        const isCompleted = index < currentFrame;
        const isCurrent = index === currentFrame;

        return (
          <div
            key={index}
            className="flex-1 h-[4px] rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.28)" }}
          >
            {isCompleted && (
              <div className="h-full w-full rounded-full bg-white" />
            )}
            {isCurrent && (
              <div
                ref={barRef}
                className="h-full rounded-full bg-white"
                style={{ width: "0%" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
