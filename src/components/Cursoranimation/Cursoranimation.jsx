import { useEffect, useRef } from "react";
import "./Cursoranimation.css";

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: -200, y: -200 });
  const ring = useRef({ x: -200, y: -200 });
  const rafRef = useRef(null);
  const styleRef = useRef(null);

  useEffect(() => {
    // Inject cursor:none globally while this component is mounted
    const style = document.createElement("style");
    style.textContent = "*, *::before, *::after { cursor: none !important; }";
    document.head.appendChild(style);
    styleRef.current = style;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e) => {
      const hovered = e.target.closest("a, button, [role='button'], input, label, select, textarea");
      if (hovered) {
        dotRef.current?.classList.add("is-hover");
        ringRef.current?.classList.add("is-hover");
      } else {
        dotRef.current?.classList.remove("is-hover");
        ringRef.current?.classList.remove("is-hover");
      }
    };

    const tick = () => {
      const { x, y } = pos.current;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
      ring.current.x += (x - ring.current.x) * 0.1;
      ring.current.y += (y - ring.current.y) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(rafRef.current);
      styleRef.current?.remove();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="rw-cursor-dot" />
      <div ref={ringRef} className="rw-cursor-ring" />
    </>
  );
};

export default CustomCursor;
