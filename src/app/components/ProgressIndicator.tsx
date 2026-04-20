import { motion } from "motion/react";

interface ProgressIndicatorProps {
  currentFrame: number;
  totalFrames: number;
  durationSeconds: number;
}

export default function ProgressIndicator({ currentFrame, totalFrames, durationSeconds }: ProgressIndicatorProps) {
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
              <motion.div
                key={currentFrame}
                className="h-full rounded-full bg-white"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: durationSeconds, ease: "linear" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
