"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const NotFoundPage = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<Image
				src="/images/invoice.png"
				width={200}
				height={200}
				alt={'Invoice logo'}
				priority={true}
			/>
			<div className="p-6 w-1/3 rounded-lg shadow-md text-center">
				<div className="text-3xl font-bold mb-4">
					<div className="text-destructive">Not Found</div>
					<Button
						variant="outline"
						className="mt-4 ml-2"
						onClick={() => (window.location.href = "/dashboard")}>
						Back To Dashboard
					</Button>
				</div>
			</div>
		</div>
	);
};

export default NotFoundPage;
