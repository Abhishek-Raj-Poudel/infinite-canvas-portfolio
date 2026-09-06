"use client";
import {
	useEffect,
	useRef,
	useState,
	MouseEventHandler,
	TouchEventHandler,
} from "react";

function easeInOutCubic(t: number): number {
	return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function useCanvasPan() {
	const [offset, setOffset] = useState({ x: 0, y: 0 });
	const isDragging = useRef(false);
	const lastMouse = useRef({ x: 0, y: 0 });
	const animationRef = useRef<number>(0);
	const offsetRef = useRef({ x: 0, y: 0 });

	const setOffsetBoth = (next: { x: number; y: number }) => {
		offsetRef.current = next;
		setOffset(next);
	};

	// Center canvas on mount (window not available during SSR)
	useEffect(() => {
		setOffsetBoth({
			x: window.innerWidth / 2,
			y: window.innerHeight / 2,
		});
	}, []);

	useEffect(() => {
		return () => cancelAnimationFrame(animationRef.current);
	}, []);

	const cancelAnimation = () => {
		cancelAnimationFrame(animationRef.current);
		animationRef.current = 0;
	};

	const centerOnSection = (id: string) => {
		if (typeof window === "undefined") return;
		const el = document.getElementById(id);
		if (!el) return;

		const rect = el.getBoundingClientRect();
		const sectionCenterX = rect.left + rect.width / 2;
		const sectionCenterY = rect.top + rect.height / 2;

		const screenCenterX = window.innerWidth / 2;
		const screenCenterY = window.innerHeight / 2;

		// How much we need to pan to bring the section center to the screen center
		const panX = screenCenterX - sectionCenterX;
		const panY = screenCenterY - sectionCenterY;

		const start = offsetRef.current;
		const target = { x: start.x + panX, y: start.y + panY };
		const startTime = performance.now();
		const duration = 600;

		cancelAnimation();

		const step = (now: number) => {
			if (isDragging.current) return;
			const elapsed = now - startTime;
			const progress = Math.min(1, elapsed / duration);
			const eased = easeInOutCubic(progress);

			setOffsetBoth({
				x: start.x + (target.x - start.x) * eased,
				y: start.y + (target.y - start.y) * eased,
			});

			if (progress < 1) {
				animationRef.current = requestAnimationFrame(step);
			} else {
				animationRef.current = 0;
			}
		};

		animationRef.current = requestAnimationFrame(step);
	};

	// Mouse events
	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (!isDragging.current) return;

			cancelAnimation();

			const dx = e.clientX - lastMouse.current.x;
			const dy = e.clientY - lastMouse.current.y;

			setOffset((prev) => {
				const next = { x: prev.x + dx, y: prev.y + dy };
				offsetRef.current = next;
				return next;
			});
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

			cancelAnimation();

			const dx = e.touches[0].clientX - lastMouse.current.x;
			const dy = e.touches[0].clientY - lastMouse.current.y;

			setOffset((prev) => {
				const next = { x: prev.x + dx, y: prev.y + dy };
				offsetRef.current = next;
				return next;
			});
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
		centerOnSection,
		handlers: {
			onMouseDown: handleMouseDown,
			onTouchStart: handleTouchStartReact,
		},
	};
}
