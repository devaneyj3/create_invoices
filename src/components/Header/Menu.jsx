"use client";
import { Button } from "@/components/ui/button";
import {
	EllipsisVertical,
	UserIcon,
	UserPen,
	LayoutDashboard,
} from "lucide-react";
import {
	Sheet,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import CreateInvoiceMenuItem from "./CreateInvoiceMenuItem";

const Menu = () => {
	const router = useRouter();
	return (
		<>
			<div className="flex justify-end gap-3">
				<nav className="md:flex hidden w-full max-w-xs gap-1">
					<CreateInvoiceMenuItem />
					<Button onClick={() => router.push("/dashboard")} variant="ghost">
						<LayoutDashboard />
						Dashboard
					</Button>
					<Button onClick={() => router.push("/profile")} variant="ghost">
						<UserPen />
						Profile
					</Button>
					<Button onClick={() => signOut({ callbackUrl: "/" })} variant="ghost">
						<UserIcon />
						Sign Out
					</Button>
				</nav>
				<nav className="md:hidden">
					<Sheet>
						<SheetTrigger className="align-middle">
							<EllipsisVertical />
						</SheetTrigger>
						<SheetContent className="flex flex-col items-start">
							<SheetTitle>Menu</SheetTitle>
							<CreateInvoiceMenuItem />
							<Button onClick={() => router.push("/dashboard")} variant="ghost">
								<LayoutDashboard />
								Dashboard
							</Button>
							<Button onClick={() => router.push("/profile")} variant="ghost">
								<UserPen />
								Profile
							</Button>
							<Button
								onClick={() => signOut({ callbackUrl: "/" })}
								variant="ghost">
								<UserIcon />
								Sign Out
							</Button>
						</SheetContent>
					</Sheet>
				</nav>
			</div>
		</>
	);
};

export default Menu;
