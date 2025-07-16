'use client'
import React from "react";
import SignedInUser from "../SignedInUser/SignedInUser";
import Form from "../Form/Form";
import Companies from "../Companies/companies";
import PastInvoices from "../PastInvoices/PastInvoices";

export default function Dashboard() {
	
	return (
		<div>
			<div className="flex justify-between border-1">
				<Companies />
        <PastInvoices/>
			</div>
			<Form/>
		</div>
	);
}
