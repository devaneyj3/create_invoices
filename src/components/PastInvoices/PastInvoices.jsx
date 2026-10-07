"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useInvoice } from "@/context/InvoiceItemProvider";
import { useAuth } from "@/context/authContext";
import { useCompany } from "@/context/companyContext";
import styles from "./PastInvoices.module.scss";
import { formatMoney } from "@/utils/formatMoney";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { generatePdf } from "@/lib/generatePDF";

const PAGE_SIZE = 10;

export default function PastInvoices() {
	const { invoices, isLoading, error, setSelectedInvoice, selectedInvoice } =
		useInvoice();
	const { signedInUser } = useAuth();
	const { companies } = useCompany();

	const [page, setPage] = useState(0);
	const [search, setSearch] = useState("");
	const [year, setYear] = useState("all");
	const [viewOpen, setViewOpen] = useState(false);
	const [isDownloading, setIsDownloading] = useState(false);

	const years = useMemo(() => {
		const unique = new Set(
			invoices.map((inv) => new Date(inv.date).getFullYear().toString())
		);
		return Array.from(unique).sort((a, b) => Number(b) - Number(a));
	}, [invoices]);

	const filteredInvoices = useMemo(() => {
		const query = search.trim().toLowerCase();

		return [...invoices]
			.filter((inv) => {
				if (year !== "all") {
					const invYear = new Date(inv.date).getFullYear().toString();
					if (invYear !== year) return false;
				}
				if (!query) return true;
				return (
					String(inv.invoiceNumber).toLowerCase().includes(query) ||
					String(inv.to).toLowerCase().includes(query)
				);
			})
			.sort((a, b) => new Date(b.date) - new Date(a.date));
	}, [invoices, search, year]);

	const amount = filteredInvoices.reduce(
		(current, inv) => current + Number(inv.amount),
		0
	);

	const totalPages = Math.max(1, Math.ceil(filteredInvoices.length / PAGE_SIZE));
	const currentPage = Math.min(page, totalPages - 1);
	const paginatedInvoices = filteredInvoices.slice(
		currentPage * PAGE_SIZE,
		currentPage * PAGE_SIZE + PAGE_SIZE
	);

	useEffect(() => {
		setPage(0);
	}, [search, year]);

	const openInvoice = (inv) => {
		setSelectedInvoice(inv);
		setViewOpen(true);
	};

	const handleDownload = async () => {
		if (!selectedInvoice || !signedInUser) return;

		const company = companies.find(
			(c) => c.companyName === selectedInvoice.to
		);

		setIsDownloading(true);
		try {
			await generatePdf(
				{
					...signedInUser,
					...(company || { companyName: selectedInvoice.to }),
					invoiceNumber: selectedInvoice.invoiceNumber,
					amount: selectedInvoice.amount,
					jobDescription: selectedInvoice.description,
					date: selectedInvoice.date,
				},
				{ email: false }
			);
		} finally {
			setIsDownloading(false);
		}
	};

	if (isLoading) {
		return <div className={styles.loading}>Loading invoices...</div>;
	}

	if (error) {
		return <div className={styles.error}>Error: {error}</div>;
	}

	if (!invoices.length) {
		return <div className={styles.empty}>No past invoices found.</div>;
	}

	return (
		<div className="px-10 py-10">
			<h2 className={styles.heading}>Past Invoices</h2>

			<p>Invoices Totaling: {formatMoney(amount.toString())}</p>

			<div className={styles.filters}>
				<input
					type="search"
					className={styles.searchInput}
					placeholder="Search by company or invoice #"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					aria-label="Search invoices"
				/>
				<select
					className={styles.yearSelect}
					value={year}
					onChange={(e) => setYear(e.target.value)}
					aria-label="Filter by year"
				>
					<option value="all">All years</option>
					{years.map((y) => (
						<option key={y} value={y}>
							{y}
						</option>
					))}
				</select>
			</div>

			{!filteredInvoices.length ? (
				<div className={styles.empty}>No invoices match your filters.</div>
			) : (
				<>
					{/* Mobile/Tablet View - Cards */}
					<div className={styles.mobileView}>
						{paginatedInvoices.map((inv) => (
							<button
								type="button"
								key={inv.id}
								className={styles.invoiceCard}
								onClick={() => openInvoice(inv)}
							>
								<div className={styles.cardHeader}>
									<span className={styles.invoiceNumber}>
										#{inv.invoiceNumber}
									</span>
									<span className={styles.amount}>
										{formatMoney(inv.amount)}
									</span>
								</div>
								<div className={styles.cardContent}>
									<div className={styles.cardRow}>
										<span className={styles.label}>Date:</span>
										<span className={styles.value}>
											{new Date(inv.date).toLocaleDateString()}
										</span>
									</div>
									<div className={styles.cardRow}>
										<span className={styles.label}>To:</span>
										<span className={styles.value}>{inv.to}</span>
									</div>
								</div>
							</button>
						))}
					</div>

					{/* Desktop View - Table */}
					<div className={styles.desktopView}>
						<table className={styles.table}>
							<thead className={styles.thead}>
								<tr>
									<th className={styles.th}>Invoice #</th>
									<th className={styles.th}>Date</th>
									<th className={styles.th}>To</th>
									<th className={styles.th}>Amount</th>
								</tr>
							</thead>
							<tbody>
								{paginatedInvoices.map((inv) => (
									<tr
										key={inv.id}
										className={styles.clickableRow}
										onClick={() => openInvoice(inv)}
										onKeyDown={(e) => {
											if (e.key === "Enter" || e.key === " ") {
												e.preventDefault();
												openInvoice(inv);
											}
										}}
										tabIndex={0}
										role="button"
									>
										<td className={styles.td}>{inv.invoiceNumber}</td>
										<td className={styles.td}>
											{new Date(inv.date).toLocaleDateString()}
										</td>
										<td className={styles.td}>{inv.to}</td>
										<td className={styles.td}>
											{formatMoney(inv.amount)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					{totalPages > 1 && (
						<div className={styles.pagination}>
							<Button
								variant="outline"
								size="sm"
								onClick={() => setPage((p) => Math.max(0, p - 1))}
								disabled={currentPage === 0}
							>
								Previous
							</Button>
							<span className={styles.pageInfo}>
								Page {currentPage + 1} of {totalPages}
							</span>
							<Button
								variant="outline"
								size="sm"
								onClick={() =>
									setPage((p) => Math.min(totalPages - 1, p + 1))
								}
								disabled={currentPage >= totalPages - 1}
							>
								Next
							</Button>
						</div>
					)}
				</>
			)}

			<Dialog open={viewOpen} onOpenChange={setViewOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							Invoice #{selectedInvoice?.invoiceNumber}
						</DialogTitle>
						<DialogDescription>
							View details or download a copy of this invoice.
						</DialogDescription>
					</DialogHeader>

					{selectedInvoice && (
						<div className={styles.detailGrid}>
							<div className={styles.detailRow}>
								<span className={styles.detailLabel}>Date</span>
								<span>
									{new Date(selectedInvoice.date).toLocaleDateString()}
								</span>
							</div>
							<div className={styles.detailRow}>
								<span className={styles.detailLabel}>To</span>
								<span>{selectedInvoice.to}</span>
							</div>
							<div className={styles.detailRow}>
								<span className={styles.detailLabel}>Amount</span>
								<span>{formatMoney(selectedInvoice.amount)}</span>
							</div>
							<div className={styles.detailRow}>
								<span className={styles.detailLabel}>Description</span>
								<span>{selectedInvoice.description}</span>
							</div>
						</div>
					)}

					<DialogFooter>
						<Button
							onClick={handleDownload}
							disabled={isDownloading || !signedInUser}
						>
							{isDownloading ? "Downloading..." : "Download PDF"}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
