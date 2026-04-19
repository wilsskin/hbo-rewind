import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Frame1 from "@/app/components/Frame1";
import Frame2 from "@/app/components/Frame2";
import Frame3 from "@/app/components/Frame3";
import Frame4 from "@/app/components/Frame4";
import Frame5 from "@/app/components/Frame5";
import Frame6 from "@/app/components/Frame6";
import Frame7 from "@/app/components/Frame7";
import Frame8 from "@/app/components/Frame8";
import ProgressIndicator from "@/app/components/ProgressIndicator";

export default function App() {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [direction, setDirection] = useState(0);
  const totalFrames = 8;

  const nextFrame = () => {
    if (currentFrame < totalFrames - 1) {
      setDirection(1);
      setCurrentFrame(currentFrame + 1);
    }
  };

  const prevFrame = () => {
    if (currentFrame > 0) {
      setDirection(-1);
      setCurrentFrame(currentFrame - 1);
    }
  };

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
      x: direction > 0 ? 400 : -400,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -400 : 400,
      opacity: 0,
      scale: 0.8,
    }),
  };

  return (
    <div className="bg-[#0f0f0f] relative w-full min-h-screen overflow-auto flex items-center justify-center py-4">
      {/* iPhone frame container */}
      <div className="relative w-[393px] h-[852px] overflow-hidden rounded-[40px] shadow-2xl">
        {/* Progress Indicator */}
        <ProgressIndicator currentFrame={currentFrame} totalFrames={totalFrames} />
        
        {/* Clickable areas for navigation */}
        <div
          className="absolute inset-0 z-40 cursor-pointer"
          onClick={nextFrame}
          aria-label="Next frame"
        />
        
        {/* Back button area (left 1/4 of screen) */}
        {currentFrame > 0 && (
          <div
            className="absolute left-0 top-0 bottom-0 w-1/4 z-50 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
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
              x: { type: "spring", stiffness: 350, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 },
            }}
            className="absolute inset-0"
          >
            {frames[currentFrame]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}