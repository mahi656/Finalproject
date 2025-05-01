import { useEffect, useRef } from "react";
import "../styles/TrailingCursor.css";

const TrailingCursor = () => {
  const dotsRef = useRef([]);
  const coords = { x: 0, y: 0 };

  useEffect(() => {
    const handleMouseMove = (e) => {
      coords.x = e.clientX;
      coords.y = e.clientY;
    };

    document.addEventListener("mousemove", handleMouseMove);

    const animateDots = () => {
      let x = coords.x;
      let y = coords.y;

      dotsRef.current.forEach((dot, index) => {
        if (!dot) return;
        
        const nextDot = dotsRef.current[index + 1] || dotsRef.current[0];
        if (!nextDot) return;

        dot.style.left = x + "px";
        dot.style.top = y + "px";

        const dx = nextDot.offsetLeft - dot.offsetLeft;
        const dy = nextDot.offsetTop - dot.offsetTop;

        x += dx * 0.35;
        y += dy * 0.35;
      });

      requestAnimationFrame(animateDots);
    };

    animateDots();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (dotsRef.current[i] = el)}
          className="dot"
        ></div>
      ))}
    </>
  );
};

export default TrailingCursor;