"use client";
import { useEffect, useRef, useState, MouseEventHandler, TouchEventHandler } from "react";

export default function useCanvasPan() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });

  // Center canvas on mount (window not available during SSR)
  useEffect(() => {
    setOffset({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });
  }, []);

  // Mouse events
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;

      const dx = e.clientX - lastMouse.current.x;
      const dy = e.clientY - lastMouse.current.y;

      setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
      lastMouse.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // Touch events
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      isDragging.current = true;
      lastMouse.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;

      const dx = e.touches[0].clientX - lastMouse.current.x;
      const dy = e.touches[0].clientY - lastMouse.current.y;

      setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
      lastMouse.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    };

    const handleTouchEnd = () => {
      isDragging.current = false;
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  const handleMouseDown: MouseEventHandler = (e) => {
    isDragging.current = true;
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handleTouchStartReact: TouchEventHandler = (e) => {
    isDragging.current = true;
    lastMouse.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  return {
    offset,
    handlers: {
      onMouseDown: handleMouseDown,
      onTouchStart: handleTouchStartReact,
    },
  };
}
