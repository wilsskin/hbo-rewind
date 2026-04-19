interface ProgressIndicatorProps {
  currentFrame: number;
  totalFrames: number;
}

export default function ProgressIndicator({ currentFrame, totalFrames }: ProgressIndicatorProps) {
  return (
    <div className="absolute top-[100px] left-1/2 -translate-x-1/2 z-50 flex gap-[3.431px] pointer-events-none">
      {Array.from({ length: totalFrames }).map((_, index) => (
        <div
          key={index}
          className="h-[3.818px] w-[41.998px] transition-all duration-300"
          style={{
            backgroundImage:
              index <= currentFrame
                ? "linear-gradient(90deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.5) 100%)"
                : "linear-gradient(90deg, rgb(37, 39, 45) 0%, rgb(37, 39, 45) 100%)",
          }}
        >
          <div className="absolute border-[0.479px] border-[rgba(255,255,255,0.1)] border-solid inset-[-0.479px]" />
        </div>
      ))}
    </div>
  );
}
