"use client";

import { IconCloud } from "@/components/ui/icon-cloud";

const techIcons = [
	"https://cdn.simpleicons.org/typescript",
	"https://cdn.simpleicons.org/javascript",
	"https://cdn.simpleicons.org/react",
	"https://cdn.simpleicons.org/nextdotjs",
	"https://cdn.simpleicons.org/nodedotjs",
	"https://cdn.simpleicons.org/laravel",
	"https://cdn.simpleicons.org/postgresql",
	"https://cdn.simpleicons.org/mysql",
	"https://cdn.simpleicons.org/tailwindcss",
	"https://cdn.simpleicons.org/git",
	"https://cdn.simpleicons.org/html5",
	"https://cdn.simpleicons.org/css3",
	"https://cdn.simpleicons.org/figma",
	"https://cdn.simpleicons.org/go",
	"https://cdn.simpleicons.org/inertia",
	"https://cdn.simpleicons.org/redis",
	"https://cdn.simpleicons.org/linux",
	"https://cdn.simpleicons.org/docker",
	"https://cdn.simpleicons.org/nginx",
	"https://cdn.simpleicons.org/wordpress",
	"https://cdn.simpleicons.org/python",
	"https://cdn.simpleicons.org/odinlanguage",
];

export default function AboutSection() {
	return (
		<>
			{/* Left: picture square */}
			<div
				className="absolute -translate-x-1/2 -translate-y-1/2 bg-amber-400 text-black rounded-xl overflow-hidden aspect-square"
				style={{ left: -430, top: 0, width: 260, height: 400 }}
			>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src="/profile-pic.jpg"
					alt="Profile"
					className="h-full w-full object-cover"
				/>
			</div>

			{/* Middle: title + content */}
			<div
				className="absolute -translate-x-1/2 -translate-y-1/2 text-black rounded-xl p-8"
				style={{ left: 0, top: 0, width: 520 }}
			>
				<h2 className="text-ex-lg font-display mb-4">Full Stack Developer</h2>
				<p className="text-ex-sm leading-relaxed">
					I’m a Digital Solutions Coordinator and Full-Stack Developer with a
					strong focus on frontend development, UI/UX, and digital project
					coordination. I work across the development lifecycle—from
					understanding requirements and planning tasks to development, QA,
					deployment, and troubleshooting.
					<br />
					<br />
					My core experience includes React, Next.js, Laravel, Inertia,
					Filament, Tailwind CSS, MySQL, Git, and CI/CD. I enjoy turning ideas
					and designs into responsive, functional, and polished digital
					experiences.
					<br />
					<br />
					Beyond development, I’m interested in UI/UX, creative development,
					and game development, and I’m continuously working to strengthen both
					my technical and design skills.
					<br />
					<br />
					My long-term goal is to become a product-minded developer and
					creative technologist who can design, build, and lead meaningful
					digital products.
				</p>
			</div>

			{/* Right: another square */}
			<div
				className="absolute -translate-x-1/2 -translate-y-1/2 bg-white text-black rounded-xl flex items-center justify-center overflow-hidden h-fit"
				style={{ left: 430, top: 0, width: 260, height: 400 }}
			>
				<div style={{ transform: "scale(1)" }}>
					<IconCloud images={techIcons} />
				</div>
			</div>
		</>
	);
}
