import { useEffect, useRef } from "react";
import { gsap, initializeGSAP } from "@/lib/gsap";

export const useGSAP = () => {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initializeGSAP();
      initialized.current = true;
    }
  }, []);

  return { gsap };
};

export const useSplitText = (text: string, deps: any[] = []) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && text) {
      const element = ref.current;
      element.innerHTML = "";
      
      [...text].forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.className = "char";
        element.appendChild(span);
      });
      
      gsap.to(element.querySelectorAll(".char"), {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.05,
        ease: "back.out(1.7)",
      });
    }
  }, [text, ...deps]);

  return ref;
};

export const useCardAnimation = (deps: any[] = []) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const cards = ref.current.querySelectorAll(".employee-card");
      gsap.from(cards, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      });
    }
  }, deps);

  return ref;
};

export const useMagneticButton = () => {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseEnter = () => {
      gsap.to(element, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return ref;
};
