'use client'
import React from "react";
import Form from "../Form/Form";
import Companies from "../Companies/companies";
import PastInvoices from "../PastInvoices/PastInvoices";

export default function Dashboard() {
	
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
