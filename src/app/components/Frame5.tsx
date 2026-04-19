import { motion } from "motion/react";
import svgPaths from "@/imports/svg-fngzbo20sg";
import imgRectangle from "figma:asset/0d7546fb34dfac1319ca8a49a46036841fd71dbe.png";
import imgGeminiGeneratedImageV58Jeav58Jeav58J1 from "figma:asset/d0993d19f46b04ad547f65d0f4c7fd8c3949e7c8.png";

function IconsRight() {
  return (
    <div className="h-[12.414px] relative shrink-0 w-[72px]" data-name="icons-right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72.0001 12.4138">
        <g id="icons-right">
          <g id="battery">
            <path d={svgPaths.p20536370} id="outline" opacity="0.35" stroke="var(--stroke-0, white)" strokeWidth="1.00749" />
            <path d={svgPaths.p1010f600} fill="var(--fill-0, white)" id="end" opacity="0.4" />
            <path d={svgPaths.p3593f880} fill="var(--fill-0, white)" id="charged" />
          </g>
          <path d={svgPaths.p38613800} fill="var(--fill-0, white)" id="wi-fi" />
          <g id="signal">
            <path d={svgPaths.p2d4a0780} fill="var(--fill-0, white)" />
            <path d={svgPaths.p3524c400} fill="var(--fill-0, white)" />
            <path d={svgPaths.p32c2e440} fill="var(--fill-0, white)" />
            <path d={svgPaths.p3462d000} fill="var(--fill-0, white)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame1Component() {
  return (
    <div className="absolute bottom-[95.31%] content-stretch flex gap-[206px] items-center left-[calc(50%-0.5px)] top-[2.82%] translate-x-[-50%]">
      <p className="font-['SF_Pro_Display:Medium',sans-serif] leading-[16px] not-italic relative shrink-0 text-[16px] text-center text-white tracking-[0.2px] whitespace-pre">10:53</p>
      <IconsRight />
    </div>
  );
}

function Component3D911979508D4E9EA9D4806Ff143C() {
  return (
    <div className="absolute contents inset-[7.51%_88.86%_90.14%_4.07%]" data-name="3d911979-508d-4e9e-a9d4-806ff143c538">
      <div className="absolute inset-[7.51%_88.86%_90.14%_4.07%]" data-name="Rectangle">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgRectangle} />
        </div>
      </div>
    </div>
  );
}

function Cancel() {
  return (
    <div className="absolute left-[352px] size-[20px] top-[64px]" data-name="cancel-01">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="cancel-01">
          <path d={svgPaths.p34daed80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[27.23%_-40.71%_33.22%_-10.94%]" data-name="Group">
      <div className="absolute inset-[-18.76%_-10.61%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 722.428 463.428">
          <g filter="url(#filter0_f_2002_167)" id="Group" opacity="0.85">
            <path d={svgPaths.pd24ef80} fill="url(#paint0_linear_2002_167)" id="Vector" opacity="0.85" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="463.428" id="filter0_f_2002_167" width="722.428" x="0" y="-2.73413e-08">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_2002_167" stdDeviation="31.607" />
            </filter>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_2002_167" x1="731.791" x2="-14.0137" y1="149.275" y2="409.191">
              <stop offset="0.03125" stopColor="#00315F" />
              <stop offset="0.645533" stopColor="#40137A" />
              <stop offset="0.941677" stopColor="#7A1363" stopOpacity="0.32" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

export default function Frame5() {
  return (
    <div className="bg-[#0f0f0f] relative size-full" data-name="F5">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Group />
      </motion.div>
      
      <div className="absolute bg-[rgba(15,15,15,0.9)] h-[169px] left-1/2 top-0 translate-x-[-50%] w-[393px]" data-name="Rectangle" />
      
      <Frame1Component />
      <Component3D911979508D4E9EA9D4806Ff143C />
      <p className="absolute bottom-[90.26%] font-['Proxima_Nova:Bold',sans-serif] leading-[normal] left-[calc(50%-140.7px)] not-italic text-[18px] text-white top-[7.63%] whitespace-pre">{`2025 Rewind `}</p>
      <Cancel />

      {/* Animated intro text */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="absolute font-['Proxima_Nova:Bold',sans-serif] leading-[16px] left-1/2 not-italic text-[18px] text-center text-white top-[192px] translate-x-[-50%] whitespace-pre"
      >
        You're the
      </motion.p>

      {/* Animated badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.6, type: "spring", stiffness: 150 }}
        className="absolute bg-white content-stretch flex items-center justify-center left-1/2 px-[8px] py-[4px] top-[224px] translate-x-[-50%]"
      >
        <p className="font-['Proxima_Nova:Bold',sans-serif] leading-[28px] not-italic relative shrink-0 text-[#25272d] text-[28px] text-center whitespace-pre">Binge Watching Warrior</p>
      </motion.div>

      {/* Animated illustration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8, type: "spring", stiffness: 100 }}
        className="absolute h-[249.369px] left-[calc(50%+0.5px)] top-[308px] translate-x-[-50%] w-[240px]"
        data-name="Gemini_Generated_Image_v58jeav58jeav58j 1"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[147.98%] left-[-23.12%] max-w-none top-[-39.74%] w-[153.75%]" src={imgGeminiGeneratedImageV58Jeav58Jeav58J1} />
        </div>
      </motion.div>

      {/* Animated description text */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.6 }}
        className="absolute font-['Proxima_Nova:Regular',sans-serif] leading-[1.33] left-[197px] not-italic text-[#ccc] text-[18px] text-center top-[605px] translate-x-[-50%] w-[258px] whitespace-pre-wrap"
      >
        <span>{`You finished the first season of Succession in just `}</span>
        <span className="font-['Proxima_Nova:Bold',sans-serif]">3</span>
        <span>{` days `}</span>
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute font-['Proxima_Nova:Regular',sans-serif] leading-[1.33] left-[197px] not-italic text-[#ccc] text-[18px] text-center top-[677px] translate-x-[-50%] w-[258px] whitespace-pre-wrap"
      >
        No days off in the Roy family
      </motion.p>

      {/* Decorative lines and blurs */}
      <div className="absolute flex h-[85.5px] items-center justify-center left-[-34px] top-[767px] w-[474px]">
        <div className="flex-none scale-y-[-100%]">
          <div className="h-[85.5px] relative w-[474px]">
            <div className="absolute inset-[-0.54%_-0.04%_22.59%_-0.01%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 474.248 66.6476">
                <path d={svgPaths.p1cb16ec0} id="Vector 8" stroke="var(--stroke-0, #CCCCCC)" strokeOpacity="0.1" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute h-[85.5px] left-[-34px] top-[706px] w-[474px]">
        <div className="absolute inset-[-0.54%_-0.04%_22.59%_-0.01%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 474.248 66.6476">
            <path d={svgPaths.p1cb16ec0} id="Vector 7" stroke="var(--stroke-0, #CCCCCC)" strokeOpacity="0.1" />
          </svg>
        </div>
      </div>
      <div className="absolute flex h-[177.252px] items-center justify-center left-[-43px] top-[749.54px] w-[458.326px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[10deg]">
          <div className="blur-[24.8px] filter h-[101.067px] w-[447.575px]" style={{ backgroundImage: "linear-gradient(101.11deg, rgba(15, 15, 15, 0.45) 3.6252%, rgba(64, 19, 122, 0.18) 78.791%)" }} />
        </div>
      </div>
      <div className="absolute flex h-[180.511px] items-center justify-center left-[145.83px] top-[709.15px] w-[353.227px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[346deg]">
          <div className="blur-[24.8px] filter h-[101.586px] rounded-bl-[300px] w-[338.712px]" style={{ backgroundImage: "linear-gradient(114.101deg, rgba(15, 15, 15, 0.45) 2.836%, rgba(0, 49, 95, 0.18) 72.76%)" }} />
        </div>
      </div>
      <div className="absolute flex h-[48.152px] items-center justify-center left-[-13px] top-[759px] w-[158.094px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[3deg]">
          <div className="blur-[24.8px] filter h-[40.031px] w-[156.213px]" style={{ backgroundImage: "linear-gradient(96.8226deg, rgba(0, 49, 95, 0.12) 9.6738%, rgba(15, 15, 15, 0.3) 83.745%)" }} />
        </div>
      </div>
      <div className="absolute flex h-[85.5px] items-center justify-center left-[0.8px] top-[25.2px] w-[474px]">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <div className="h-[85.5px] relative w-[474px]">
            <div className="absolute inset-[-0.54%_-0.04%_22.59%_-0.01%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 474.248 66.6476">
                <path d={svgPaths.p1cb16ec0} id="Vector 9" stroke="var(--stroke-0, #CCCCCC)" strokeOpacity="0.1" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[101.067px] items-center justify-center left-[31.85px] top-[-14px] w-[447.575px]">
        <div className="flex-none rotate-[180deg]">
          <div className="blur-[24.8px] filter h-[101.067px] rounded-tr-[500px] w-[447.575px]" style={{ backgroundImage: "linear-gradient(111.639deg, rgba(64, 19, 122, 0.18) 3.2331%, rgba(15, 15, 15, 0.45) 104.94%)" }} />
        </div>
      </div>
    </div>
  );
}
