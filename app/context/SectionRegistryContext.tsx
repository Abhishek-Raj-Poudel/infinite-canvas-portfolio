"use client";

import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
	type ReactNode,
} from "react";

interface SectionPosition {
	x: number;
	y: number;
}

interface SectionRegistryValue {
	sections: { [id: string]: SectionPosition };
	register: (id: string, x: number, y: number) => void;
	unregister: (id: string) => void;
	getSection: (id: string) => SectionPosition | undefined;
}

const SectionRegistryContext = createContext<SectionRegistryValue | null>(null);

export function SectionRegistryProvider({
	children,
}: {
	children: ReactNode;
}) {
	const [sections, setSections] = useState<{ [id: string]: SectionPosition }>(
		{},
	);

	const register = useCallback((id: string, x: number, y: number) => {
		setSections((prev) => ({ ...prev, [id]: { x, y } }));
	}, []);

	const unregister = useCallback((id: string) => {
		setSections((prev) => {
			const next = { ...prev };
			delete next[id];
			return next;
		});
	}, []);

	const getSection = useCallback(
		(id: string) => sections[id],
		[sections],
	);

	const value = useMemo(
		() => ({ sections, register, unregister, getSection }),
		[sections, register, unregister, getSection],
	);

	return (
		<SectionRegistryContext.Provider value={value}>
			{children}
		</SectionRegistryContext.Provider>
	);
}

export function useSectionRegistry() {
	const context = useContext(SectionRegistryContext);
	if (!context) {
		throw new Error(
			"useSectionRegistry must be used within a SectionRegistryProvider",
		);
	}
	return context;
}
