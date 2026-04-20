import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Pause } from "lucide-react";
import Frame1 from "@/app/components/Frame1";
import Frame2 from "@/app/components/Frame2";
import Frame3 from "@/app/components/Frame3";
import Frame4 from "@/app/components/Frame4";
import Frame5 from "@/app/components/Frame5";
import Frame6 from "@/app/components/Frame6";
import Frame7 from "@/app/components/Frame7";
import Frame8 from "@/app/components/Frame8";
import ProgressIndicator from "@/app/components/ProgressIndicator";
import TopChrome from "@/app/components/TopChrome";

interface NavArrowProps {
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
}

function NavArrow({ direction, onClick, disabled }: NavArrowProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "left" ? "Previous frame" : "Next frame"}
      className="flex items-center justify-center w-12 h-12 rounded-full border border-white/[0.12] text-white/60 cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed flex-shrink-0 select-none"
      style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}
      whileHover={!disabled ? { background: "rgba(255,255,255,0.12)" } : {}}                                         
      whileTap={!disabled ? { scale: 0.95 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {direction === "left" ? (
        <ChevronLeft size={22} strokeWidth={2} />
      ) : (
        <ChevronRight size={22} strokeWidth={2} />
      )}
    </motion.button>
  );
}

export default function App() {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPausedState] = useState(false);
  const isPausedRef = useRef(false);
  const pressingRef = useRef(false);
  const skipNextNavRef = useRef(false);
  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const totalFrames = 8;

  // Resume all paused WAAPI animations when unpausing
  useEffect(() => {
    if (!isPaused) {
      document.getAnimations().forEach(a => {
        if (a.playState === "paused") a.play();
      });
    }
  }, [isPaused]);

  const [phoneScale, setPhoneScale] = useState(() => window.innerHeight / 852);
  useEffect(() => {
    const update = () => setPhoneScale(window.innerHeight / 852);
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const unpauseIfNeeded = () => {
    if (isPausedRef.current) {
      isPausedRef.current = false;
      setIsPausedState(false);
    }
  };

  const nextFrame = () => {
    unpauseIfNeeded();
    if (currentFrame < totalFrames - 1) {
      setDirection(1);
      setCurrentFrame(currentFrame + 1);
    }
  };

  const prevFrame = () => {
    unpauseIfNeeded();
    if (currentFrame > 0) {
      setDirection(-1);
      setCurrentFrame(currentFrame - 1);
    }
  };

  // Auto-advance: wait 8 s (minus any paused time), then move to next frame.
  const SEGMENT_DURATION = 8;
  useEffect(() => {
    const DURATION_MS = SEGMENT_DURATION * 1000;
    let accumulatedElapsed = 0;
    let segmentStart = Date.now();
    let wasPaused = false;

    const id = setInterval(() => {
      const nowPaused = isPausedRef.current;

      if (!wasPaused && nowPaused) {
        accumulatedElapsed += Date.now() - segmentStart;
        wasPaused = true;
      } else if (wasPaused && !nowPaused) {
        segmentStart = Date.now();
        wasPaused = false;
      }

      if (nowPaused) return;

      const totalElapsed = accumulatedElapsed + (Date.now() - segmentStart);
      if (totalElapsed >= DURATION_MS) {
        clearInterval(id);
        setDirection(1);
        setCurrentFrame(prev => prev < totalFrames - 1 ? prev + 1 : 0);
      }
    }, 100);

    return () => clearInterval(id);
  }, [currentFrame]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        nextFrame();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevFrame();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentFrame]);

  const isMobileViewport = () => window.innerWidth <= 480;

  const handlePhonePointerDown = (e: React.PointerEvent) => {
    if (!e.isPrimary) return;
    if (isPausedRef.current) {
      // Already paused (desktop) — resume and eat the subsequent nav click
      skipNextNavRef.current = true;
      isPausedRef.current = false;
      setIsPausedState(false);
      return;
    }
    if (isMobileViewport()) {
      // Mobile: only pause after a hold threshold — quick taps navigate normally
      holdTimerRef.current = setTimeout(() => {
        holdTimerRef.current = null;
        pressingRef.current = true;
        isPausedRef.current = true;
        document.getAnimations().forEach(a => a.pause());
      }, 300);
    } else {
      // Desktop: pause immediately; icon appears on pointerup
      pressingRef.current = true;
      isPausedRef.current = true;
      document.getAnimations().forEach(a => a.pause());
    }
  };

  const handlePhonePointerUp = (e: React.PointerEvent) => {
    if (!e.isPrimary) return;
    // Cancel hold timer if tap was released before threshold
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    if (pressingRef.current) {
      pressingRef.current = false;
      if (isMobileViewport()) {
        // Mobile hold released — resume silently, skip the nav click
        isPausedRef.current = false;
        setIsPausedState(false);
        skipNextNavRef.current = true;
      } else {
        // Desktop — show pause icon (animations already frozen)
        setIsPausedState(true);
      }
    }
  };

  const handlePhonePointerCancel = () => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    if (pressingRef.current) {
      pressingRef.current = false;
      isPausedRef.current = false;
      setIsPausedState(false);
    }
  };

  const frames = [
    <Frame1 key="frame1" />,
    <Frame2 key="frame2" />,
    <Frame3 key="frame3" />,
    <Frame4 key="frame4" />,
    <Frame5 key="frame5" />,
    <Frame6 key="frame6" />,
    <Frame7 key="frame7" />,
    <Frame8 key="frame8" />,
  ];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction === 0 ? 0 : direction > 0 ? 393 : -393,
      opacity: 0,
      scale: 0.97,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    // Exit drifts slightly in exit direction and scales back — cinematic "push away" feel
    exit: (direction: number) => ({
      x: direction > 0 ? -30 : 30,
      opacity: 0,
      scale: 0.92,
    }),
  };

  return (
    <div className="bg-[#0f0f0f] w-full h-screen overflow-hidden flex items-center justify-center">
      {/* Flex row: left arrow + phone + right arrow */}
      <div className="flex items-center gap-[24px]">
        {/* Left nav arrow — only on screens ≥ 480px */}
        <div className="hidden min-[480px]:flex">
          <NavArrow direction="left" onClick={prevFrame} disabled={currentFrame === 0} />
        </div>

        {/* Scaling wrapper — sized to the scaled phone dimensions for correct layout */}
        <div style={{ width: 393 * phoneScale, height: 852 * phoneScale, flexShrink: 0 }}>
          {/* iPhone frame container — full 393×852, scaled via transform */}
          <div
            className="relative w-[393px] h-[852px] overflow-hidden rounded-[40px] shadow-2xl select-none"
            style={{ transform: `scale(${phoneScale})`, transformOrigin: 'top left', WebkitUserSelect: 'none' }}
            onPointerDown={handlePhonePointerDown}
            onPointerUp={handlePhonePointerUp}
            onPointerCancel={handlePhonePointerCancel}
            onContextMenu={(e) => e.preventDefault()}
          >
          {/* Static chrome overlay: status bar, title bar, cancel — never animates */}
          <TopChrome />

          {/* Progress Indicator — sits above TopChrome gradient (top-[100px]) */}
          <ProgressIndicator currentFrame={currentFrame} totalFrames={totalFrames} durationSeconds={SEGMENT_DURATION} isPausedRef={isPausedRef} />

          {/* Clickable areas for navigation — mobile only (< 480px) */}
          <div
            className="absolute inset-0 z-40 cursor-pointer block min-[480px]:hidden"
            onClick={() => {
              if (skipNextNavRef.current) { skipNextNavRef.current = false; return; }
              nextFrame();
            }}
            aria-label="Next frame"
          />

          {/* Back button area (left 1/4 of screen) — mobile only */}
          {currentFrame > 0 && (
            <div
              className="absolute left-0 top-0 bottom-0 w-1/4 z-50 cursor-pointer block min-[480px]:hidden"
              onClick={(e) => {
                e.stopPropagation();
                if (skipNextNavRef.current) { skipNextNavRef.current = false; return; }
                prevFrame();
              }}
              aria-label="Previous frame"
            />
          )}

          {/* Animated frames */}
          <AnimatePresence initial={true} custom={direction} mode="wait">
            <motion.div
              key={currentFrame}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 380, damping: 38 },
                opacity: { duration: 0.18 },
                scale: { duration: 0.22 },
              }}
              className="absolute inset-0"
            >
              {frames[currentFrame]}
            </motion.div>
          </AnimatePresence>

          {/* Pause icon — desktop only (≥ 480px); never shown on mobile */}
          <div className="hidden min-[480px]:block">
          <AnimatePresence>
            {isPaused && (
              <motion.div
                className="absolute inset-0 z-[70] flex items-center justify-center pointer-events-none"
                initial={{ opacity: 0, scale: 0.72 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.72 }}
                transition={{ type: "spring", stiffness: 420, damping: 26 }}
              >
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{
                    width: 48 / phoneScale,
                    height: 48 / phoneScale,
                    background: "rgba(255,255,255,0.10)",
                    border: `${1.5 / phoneScale}px solid rgba(255,255,255,0.2)`,
                    mixBlendMode: "difference",
                  }}
                >
                  <Pause size={24 / phoneScale} strokeWidth={0} fill="white" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          </div>{/* end pause icon desktop wrapper */}
          </div>{/* end iPhone frame container */}
        </div>{/* end scaling wrapper */}

        {/* Right nav arrow — only on screens ≥ 480px */}
        <div className="hidden min-[480px]:flex">
          <NavArrow direction="right" onClick={nextFrame} disabled={currentFrame === totalFrames - 1} />
        </div>
      </div>
    </div>
  );
}
