import svgPaths from "@/imports/svg-8bogk18dpw";
import imgRectangle from "figma:asset/0d7546fb34dfac1319ca8a49a46036841fd71dbe.png";

function StatusIcons() {
  return (
    <div className="h-[12.414px] relative shrink-0 w-[72px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72.0001 12.4138">
        <g id="tc-icons-right">
          <g id="tc-battery">
            <path d={svgPaths.p20536370} opacity="0.35" stroke="white" strokeWidth="1.00749" />
            <path d={svgPaths.p1010f600} fill="white" opacity="0.4" />
            <path d={svgPaths.p3593f880} fill="white" />
          </g>
          <path d={svgPaths.p38613800} fill="white" id="tc-wi-fi" />
          <g id="tc-signal">
            <path d={svgPaths.p2d4a0780} fill="white" />
            <path d={svgPaths.p3524c400} fill="white" />
            <path d={svgPaths.p32c2e440} fill="white" />
            <path d={svgPaths.p3462d000} fill="white" />
          </g>
        </g>
      </svg>
    </div>
  );
}

// Static overlay that keeps the phone chrome (status bar, title bar, cancel) from
// animating during frame transitions. Rendered above AnimatePresence in App.tsx.
export default function TopChrome() {
  return (
    <div className="absolute inset-0 z-[60] pointer-events-none">
      {/* Gradient backdrop: opaque #0f0f0f through the chrome area, fades to transparent
          just before the progress bar at 100px so it shows through cleanly. */}
      <div
        className="absolute inset-x-0 top-0 h-[100px]"
        style={{ background: "linear-gradient(to bottom, #0f0f0f 82px, transparent 100px)" }}
      />

      {/* Status bar — time + icons */}
      <div className="absolute bottom-[95.31%] content-stretch flex gap-[206px] items-center left-[calc(50%-0.5px)] top-[2.82%] translate-x-[-50%]">
        <p className="font-['SF_Pro_Display:Medium',sans-serif] leading-[16px] not-italic relative shrink-0 text-[16px] text-center text-nowrap text-white tracking-[0.2px]">
          10:53
        </p>
        <StatusIcons />
      </div>

      {/* HBO Max logo mark */}
      <div className="absolute inset-[7.51%_88.86%_90.14%_4.07%]">
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgRectangle} />
        </div>
      </div>

      {/* 2025 Rewind label */}
      <p className="absolute bottom-[90.26%] font-['Hanken_Grotesk:Bold',sans-serif] leading-[normal] left-[calc(50%-140.7px)] not-italic text-[18px] text-nowrap text-white top-[7.63%]">
        2025 Rewind
      </p>

      {/* Cancel / X button */}
      <div className="absolute left-[352px] size-[20px] top-[64px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
          <path
            d={svgPaths.p34daed80}
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.66667"
          />
        </svg>
      </div>
    </div>
  );
}
