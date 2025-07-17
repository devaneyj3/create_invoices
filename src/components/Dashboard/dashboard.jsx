'use client'
import React from "react";
import SignedInUser from "../SignedInUser/SignedInUser";
import Form from "../Form/Form";
import Companies from "../Companies/companies";
import PastInvoices from "../PastInvoices/PastInvoices";
import { useCompany } from "@/context/companyContext";
import { useInvoice } from "@/context/InvoiceItemProvider";

export default function Dashboard() {
	const { isLoading: companiesLoading } = useCompany();
	const { isLoading: invoicesLoading } = useInvoice();
	
	// Show loading if either context is still loading
	if (companiesLoading || invoicesLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
					<p className="text-gray-600">Loading dashboard...</p>
				</div>
			</div>
		);
	}
	
	return (
		<div>
			<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
				<Companies />
        <PastInvoices/>
			</div>
			<Form/>
		</div>
	);
}
