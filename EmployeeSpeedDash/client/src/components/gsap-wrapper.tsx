import { useEffect, useRef } from "react";
import { useGSAP } from "@/hooks/use-gsap";

interface GSAPWrapperProps {
  children: React.ReactNode;
}

export function GSAPWrapper({ children }: GSAPWrapperProps) {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  const { gsap } = useGSAP();

  useEffect(() => {
    const cursorDot = cursorDotRef.current;
    const cursorOutline = cursorOutlineRef.current;

    if (!cursorDot || !cursorOutline) return;

    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });

      gsap.to(cursorOutline, {
        x: e.clientX - 20,
        y: e.clientY - 20,
        duration: 0.3,
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [gsap]);

  return (
    <div className="relative min-h-screen">
      {/* Custom Cursor */}
      <div ref={cursorDotRef} className="cursor-dot" />
      <div ref={cursorOutlineRef} className="cursor-outline" />
      
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full animate-float" />
        <div className="absolute top-1/2 -left-20 w-60 h-60 bg-primary/10 rounded-full animate-float" style={{ animationDelay: "-1s" }} />
        <div className="absolute bottom-20 right-1/4 w-40 h-40 bg-primary/10 rounded-full animate-float" style={{ animationDelay: "-2s" }} />
      </div>

      {children}
    </div>
  );
}
