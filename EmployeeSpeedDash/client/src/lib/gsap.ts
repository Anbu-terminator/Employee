import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

export { gsap, ScrollTrigger, TextPlugin };

export const initializeGSAP = () => {
  // Set GSAP defaults
  gsap.defaults({
    ease: "power2.out",
    duration: 0.6,
  });

  // Configure ScrollTrigger
  ScrollTrigger.config({
    ignoreMobileResize: true,
  });
};

export const splitText = (element: HTMLElement) => {
  const text = element.textContent || "";
  element.innerHTML = "";
  
  [...text].forEach((char, i) => {
    const span = document.createElement("span");
    span.textContent = char === " " ? "\u00A0" : char;
    span.className = "char";
    element.appendChild(span);
  });
  
  return gsap.to(element.querySelectorAll(".char"), {
    y: 0,
    opacity: 1,
    duration: 0.8,
    stagger: 0.05,
    ease: "back.out(1.7)",
  });
};

export const animateCards = (cards: HTMLElement[]) => {
  return gsap.from(cards, {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out",
  });
};

export const magneticEffect = (element: HTMLElement) => {
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
};
