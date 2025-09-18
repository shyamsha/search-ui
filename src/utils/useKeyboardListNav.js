import { useEffect, useState } from "react";

export function useKeyboardListNav(ids = [], { onEnter } = {}) {
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    function onKey(e) {
      if (!ids.length) return;
      if (["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) {
        e.preventDefault();
      }
      if (e.key === "ArrowDown") setActiveIndex((i) => (i + 1) % ids.length);
      if (e.key === "ArrowUp")
        setActiveIndex((i) => (i <= 0 ? ids.length - 1 : i - 1));
      if (e.key === "Home") setActiveIndex(0);
      if (e.key === "End") setActiveIndex(ids.length - 1);
      if (e.key === "Enter" && activeIndex >= 0 && onEnter)
        onEnter(ids[activeIndex]);
      if (e.key === "Escape") setActiveIndex(-1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ids, activeIndex, onEnter]);

  return { activeIndex, setActiveIndex };
}
