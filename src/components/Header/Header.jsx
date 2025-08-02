import React from "react";
import Menu from "./Menu";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
	return (
		<header className="w-full border-b">
			<div className="wrapper flex-between">
				<div className="flex-start">
					<Link href="/dashboard" className="flex-start">
						<Image
							priority={true}
							src="/images/invoice.png"
							width={130}
							height={130}
							alt="Invoice logo"
						/>
						<span className="hidden lg:block font-bold text-2xl ml-3"></span>
					</Link>
				</div>

				<Menu />
			</div>
		</header>
	);
}
