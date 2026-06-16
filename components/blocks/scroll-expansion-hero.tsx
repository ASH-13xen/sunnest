"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollExpandMediaProps {
  mediaType?: "video" | "image";
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  titleLeft?: React.ReactNode;
  titleRight?: React.ReactNode;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  /** Tailwind text-color class for title/labels. Default: "text-white" */
  textColor?: string;
  children?: ReactNode;
  /** Only attach scroll/touch listeners when true (prevents conflict with bento ScrollHandler) */
  isActive?: boolean;
  /** Fires with true when media reaches full expansion, false when it collapses back */
  onExpansionChange?: (expanded: boolean) => void;
  /** Fires on every scroll tick with the current progress value (0–1) */
  onProgressChange?: (progress: number) => void;
  /** Custom className to adjust position/margins of the title container */
  titleContainerClassName?: string;
}

const ScrollExpandMedia = ({
  mediaType = "video",
  mediaSrc,
  posterSrc,
  bgImageSrc,
  titleLeft,
  titleRight,
  title,
  date,
  scrollToExpand,
  textBlend,
  textColor = "text-white",
  children,
  isActive = true,
  onExpansionChange,
  onProgressChange,
  titleContainerClassName,
}: ScrollExpandMediaProps) => {
  const [scrollProgress,     setScrollProgress]     = useState(0);
  const [showContent,        setShowContent]         = useState(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);
  const [touchStartY,        setTouchStartY]         = useState(0);
  const [isMobileState,      setIsMobileState]       = useState(false);

  const sectionRef           = useRef<HTMLDivElement | null>(null);
  const onExpansionChangeRef = useRef(onExpansionChange);
  const onProgressChangeRef  = useRef(onProgressChange);
  useEffect(() => { onExpansionChangeRef.current = onExpansionChange; }, [onExpansionChange]);
  useEffect(() => { onProgressChangeRef.current  = onProgressChange;  }, [onProgressChange]);

  useEffect(() => { onProgressChangeRef.current?.(scrollProgress); }, [scrollProgress]);



  useEffect(() => {
    if (!isActive) return; // don't intercept events when not the focused section

    const handleWheel = (e: WheelEvent) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        onExpansionChangeRef.current?.(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const newProgress = Math.min(Math.max(scrollProgress + e.deltaY * 0.0009, 0), 1);
        setScrollProgress(newProgress);
        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
          onExpansionChangeRef.current?.(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => setTouchStartY(e.touches[0].clientY);

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY) return;
      const deltaY = touchStartY - e.touches[0].clientY;
      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        onExpansionChangeRef.current?.(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const factor      = deltaY < 0 ? 0.008 : 0.005;
        const newProgress = Math.min(Math.max(scrollProgress + deltaY * factor, 0), 1);
        setScrollProgress(newProgress);
        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
          onExpansionChangeRef.current?.(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }
        setTouchStartY(e.touches[0].clientY);
      }
    };

    const handleTouchEnd = () => setTouchStartY(0);
    const handleScroll   = () => { if (!mediaFullyExpanded) window.scrollTo(0, 0); };

    window.addEventListener("wheel",      handleWheel,      { passive: false });
    window.addEventListener("scroll",     handleScroll);
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove",  handleTouchMove,  { passive: false });
    window.addEventListener("touchend",   handleTouchEnd);

    return () => {
      window.removeEventListener("wheel",      handleWheel);
      window.removeEventListener("scroll",     handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove",  handleTouchMove);
      window.removeEventListener("touchend",   handleTouchEnd);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY, isActive]);

  useEffect(() => {
    const check = () => setIsMobileState(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const mediaWidth     = 300 + scrollProgress * (isMobileState ? 650 : 1250);
  const mediaHeight    = 400 + scrollProgress * (isMobileState ? 200 : 400);
  const textTranslateX = scrollProgress * (isMobileState ? 180 : 150);
  const leftContent    = titleLeft || (title ? title.split(" ")[0] : "");
  const rightContent   = titleRight || (title ? title.split(" ").slice(1).join(" ") : "");

  return (
    <div ref={sectionRef} className="overflow-x-hidden">
      <section className="relative flex flex-col items-center justify-start min-h-[100dvh]">
        <div className="relative w-full flex flex-col items-center min-h-[100dvh]">

          {/* ── Background (fades out as media expands) ── */}
          <motion.div
            className="absolute inset-0 z-0 h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 - scrollProgress }}
            transition={{ duration: 0.1 }}
          >
            <img
              src={bgImageSrc}
              alt="Background"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/30" />
          </motion.div>

          <div className="container mx-auto flex flex-col items-center justify-start relative z-10">
            <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">

              {/* ── Expanding media card ── */}
              <div
                className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-none rounded-2xl overflow-hidden"
                style={{
                  width:     `${mediaWidth}px`,
                  height:    `${mediaHeight}px`,
                  maxWidth:  "95vw",
                  maxHeight: "85vh",
                  boxShadow: "0px 0px 60px rgba(0,0,0,0.5)",
                }}
              >
                {mediaType === "video" ? (
                  mediaSrc.includes("youtube.com") ? (
                    <div className="relative w-full h-full pointer-events-none">
                      <iframe
                        src={mediaSrc + (mediaSrc.includes("?") ? "&" : "?") + "autoplay=1&mute=1&loop=1&controls=0"}
                        className="w-full h-full"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                      />
                      <div className="absolute inset-0 z-10" style={{ pointerEvents: "none" }} />
                      <motion.div
                        className="absolute inset-0 bg-black/30"
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  ) : (
                    <div className="relative w-full h-full pointer-events-none">
                      <video
                        src={mediaSrc}
                        poster={posterSrc}
                        autoPlay muted loop playsInline preload="auto"
                        className="w-full h-full object-cover"
                        disablePictureInPicture
                        disableRemotePlayback
                      />
                      <div className="absolute inset-0 z-10" style={{ pointerEvents: "none" }} />
                      <motion.div
                        className="absolute inset-0 bg-black/30"
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  )
                ) : (
                  <div className="relative w-full h-full">
                    <img
                      src={mediaSrc}
                      alt={title || "Solar project"}
                      className="w-full h-full object-cover"
                    />
                    <motion.div
                      className="absolute inset-0 bg-black/50"
                      initial={{ opacity: 0.6 }}
                      animate={{ opacity: 0.6 - scrollProgress * 0.45 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                )}
              </div>

              {/* Labels at the bottom of the screen viewport — slide off sides as card expands */}
              <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center z-20 transition-none pointer-events-none">
                {date && (
                  <p
                    className={`text-xs font-black uppercase tracking-widest ${textColor} opacity-95`}
                    style={{ transform: `translateX(-${textTranslateX}vw)` }}
                  >
                    {date}
                  </p>
                )}
                {scrollToExpand && (
                  <p
                    className={`text-[10px] font-bold tracking-widest ${textColor} opacity-65 mt-1`}
                    style={{ transform: `translateX(${textTranslateX}vw)` }}
                  >
                    {scrollToExpand}
                  </p>
                )}
              </div>

              {/* ── Title (splits + slides off to sides) ── */}
              <div
                className={cn(
                  "flex items-center justify-center text-center gap-3 w-full relative z-10 transition-none flex-col pointer-events-none",
                  textBlend ? "mix-blend-difference" : "mix-blend-normal",
                  titleContainerClassName
                )}
              >
                <motion.div
                  className="transition-none drop-shadow-2xl leading-none text-center"
                  style={{ transform: `translateX(-${textTranslateX}vw)` }}
                >
                  {leftContent}
                </motion.div>
                <motion.div
                  className="transition-none drop-shadow-2xl leading-none text-center mt-2.5"
                  style={{ transform: `translateX(${textTranslateX}vw)` }}
                >
                  {rightContent}
                </motion.div>
              </div>
            </div>

            {/* ── Children (shown after full expansion) ── */}
            {children && (
              <motion.section
                className="flex flex-col w-full px-8 py-10 md:px-16 lg:py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: showContent ? 1 : 0 }}
                transition={{ duration: 0.7 }}
              >
                {children}
              </motion.section>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
