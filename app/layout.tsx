import type { Metadata } from "next";
import { Lilita_One } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const lilitaOne = Lilita_One({
	weight: "400",
	subsets: ["latin"],
	variable: "--font-lilita",
});

const excalifont = localFont({
	src: "./fonts/Excalifont-Regular.woff2",
	weight: "400",
	variable: "--font-excalifont",
});

export const metadata: Metadata = {
	title: "",
	description: "",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html
			lang="en"
			className={`h-full antialiased ${lilitaOne.variable} ${excalifont.variable}`}
		>
			<body className="min-h-full flex flex-col">{children}</body>
		</html>
	);
}
