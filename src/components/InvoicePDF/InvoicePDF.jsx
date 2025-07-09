// src/components/InvoicePDF.js
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { formatMoney } from "../../utils/formatMoney";
import { getCurrentDateFormatted } from "../../utils/getDate"

// Create styles
const styles = StyleSheet.create({
	page: {
		padding: 50,
		fontSize: 12,
		fontFamily: "Times-Roman",
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 10,
	},
	leftHeader: {
		width: "50%",
		display: "flex",
		flexDirection: "column",
	},
	rightHeader: {
		width: "50%",
		display: "flex",
		flexDirection: "column",
	},
	title: {
		fontSize: 26,
		color: "#22649D",
		fontFamily: "Times-Bold",
	},
	name: {
		marginBottom: 8,
		fontSize: 14,
		fontFamily: "Times-Bold",
	},
	subtitle: {
		fontSize: 11,
		fontFamily: "Times-Italic",
	},
	box: {
		marginBottom: "40px",
		gap: 10,
	},
	contactLabel: {
		marginBottom: 8,
		fontSize: 12,
		fontFamily: "Times-Bold",
	},
	contactText: {
		marginBottom: 8,
		fontSize: 12,
	},
	invoiceText: {
		fontSize: 11,
		color: "#22649D",
		fontFamily: "Times-Bold",
	},
	billToLabel: {
		fontSize: 12,
		marginBottom: 8,
		fontFamily: "Times-Bold",
	},
	leftHeaderContents: {
		display: "flex",
		flexDirection: "column",
		height: "60%",
	},
	rightHeaderContents: {
		display: "flex",
		flexDirection: "column",
		height: "60%",
		alignSelf: "flex-end",
	},
	billToText: {
		marginBottom: 8,
		fontSize: 12,
	},
	serviceText: {
		fontSize: 12,
		marginBottom: 8,
		fontFamily: "Times-Bold",
	},
	table: {
		marginTop: 10,
	},
	tableHeader: {
		flexDirection: "row",
		marginBottom: 20,
	},
	tableHeaderText: {
		fontSize: 12,
		color: "#22649D",
		fontFamily: "Times-Bold",
	},
	tableRow: {
		flexDirection: "row",
		marginBottom: 5,
	},
	description: {
		width: 300,
		fontSize: 12,
		fontFamily: "Times-Bold",
	},
	date: {
		width: 200,
		fontSize: 12,
		fontFamily: "Times-Bold",
	},
	amount: {
		fontSize: 12,
	},
	paymentInstructions: {
		marginTop: 60,
	},
	paymentText: {
		fontSize: 12,
		marginBottom: 5,
	},
	footer: {
		position: "absolute",
		bottom: 50,
		left: 50,
		right: 50,
	},
	footerText: {
		fontSize: 12,
		marginBottom: 5,
	}
});

export const InvoicePDF = (props) => {
	console.log(props)
	const { invoiceNumber, amount, name, phone, address, city, state, companyName, companyAddress, companyCity, companyState, companyZip, zip, jobTitle, jobDescription } = props
	return (

		<Document>
		<Page size="LETTER" style={styles.page} data-testid='document'>
			{/* Header */}
			<View style={styles.header}>
				<View style={styles.leftHeader}>
					<View style={styles.leftHeaderContents}>
						<View style={styles.box}>
							<Text style={styles.name}>{name}</Text>
								<Text style={styles.subtitle}>{jobTitle}</Text>
						</View>
						<View style={styles.box}>
							<Text style={styles.contactLabel}>Street Address</Text>
								<Text style={styles.contactText}>{address}</Text>
								<Text style={styles.contactText}>{city}, {state} {zip}</Text>
								<Text style={styles.contactText}>{phone}</Text>
						</View>
						<View style={styles.box}>
							<Text style={styles.billToLabel}>TO</Text>
							<Text style={styles.billToText}>{companyName}</Text>
								<Text style={styles.billToText}>{companyAddress}</Text>
								<Text style={styles.billToText}>{companyCity}, {companyState} {companyZip}</Text>
							<Text style={styles.billToText}>888-588-3139</Text>
						</View>
					</View>
				</View>
				<View style={styles.rightHeader}>
					<View style={styles.rightHeaderContents}>
						<View style={styles.box}>
							<Text style={styles.title}>INVOICE</Text>
						</View>
						<View style={styles.box}>
							<Text style={styles.invoiceText}>
								INVOICE#: 2025-{invoiceNumber}
							</Text>
							<Text style={styles.invoiceText}>
								DATE: {getCurrentDateFormatted()}
							</Text>
						</View>
						<View style={styles.box}>
							<Text style={styles.serviceText}>FOR {jobDescription}</Text>
						</View>
					</View>
				</View>
			</View>

			{/* Table */}
			<View style={styles.table}>
				<View style={styles.tableHeader}>
					<Text style={[styles.tableHeaderText, { width: 300 }]}>
						Description
					</Text>
					<Text style={[styles.tableHeaderText, { width: 200 }]}>Date</Text>
					<Text style={styles.tableHeaderText}>Amount</Text>
				</View>
				<View style={styles.tableRow}>
						<Text style={styles.description}>{jobDescription}</Text>
					<Text style={styles.date}>{getCurrentDateFormatted()}</Text>
					<Text style={styles.amount}>{formatMoney(amount)}</Text>
				</View>
			</View>

			{/* Payment Instructions */}
			<View style={styles.paymentInstructions}>
				<Text style={styles.paymentText}>
					Make all checks payable to {name}
				</Text>
				<Text style={styles.paymentText}>is due within 30 days.</Text>
			</View>

			{/* Footer */}
			<View style={styles.footer}>
				<Text style={styles.footerText}>
					If you have any questions concerning this invoice, contact {name} at {phone}
				</Text>
			</View>
		</Page>
	</Document>
)
}

// Add default export for better compatibility
export default InvoicePDF;
