// src/components/InvoicePDF.js
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { formatMoney } from "@/utils/formatMoney";
import { getCurrentDateFormatted } from "@/utils/getDate";

// Create styles
const styles = StyleSheet.create({
	page: {
		padding: 30,
		fontSize: 12,
		fontFamily: "Times-Roman",
	},
	header: {
		marginBottom: 20,
	},
	title: {
		fontSize: 24,
		marginBottom: 10,
		color: "#22649D",
	},
	section: {
		margin: 10,
		padding: 10,
	},
	row: {
		flexDirection: "row",
		marginBottom: 5,
	},
	label: {
		width: 100,
		fontFamily: "Times-Bold",
	},
	value: {
		flex: 1,
	},
	contactInfo: {
		marginTop: 20,
	},
	footer: {
		position: "absolute",
		bottom: 30,
		left: 30,
		right: 30,
		textAlign: "center",
	},
});

export const InvoicePDF = ({ invoiceNumber, amount }) => (
	<Document>
		<Page size="A4" style={styles.page}>
			{/* Header */}
			<View style={styles.header}>
				<Text style={styles.title}>INVOICE</Text>
				<Text style={styles.label}>JORDAN DEVANEY</Text>
				<Text>Full Stack Web Developer</Text>
			</View>

			{/* Contact Information */}
			<View style={styles.contactInfo}>
				<Text>Street Address</Text>
				<Text>Whitmore Lake, MI</Text>
				<Text>810.772.0086</Text>
			</View>

			{/* Invoice Details */}
			<View style={styles.section}>
				<View style={styles.row}>
					<Text style={styles.label}>Invoice Number:</Text>
					<Text style={styles.value}>2025-{invoiceNumber}</Text>
				</View>
				<View style={styles.row}>
					<Text style={styles.label}>Date:</Text>
					<Text style={styles.value}>{getCurrentDateFormatted()}</Text>
				</View>
			</View>

			{/* Bill To Section */}
			<View style={styles.section}>
				<Text style={styles.label}>Bill To:</Text>
				<Text>AG-USA LLC</Text>
				<Text>119 PALMETTO</Text>
				<Text>ROAD</Text>
				<Text>TYRONE, GA 30290</Text>
				<Text>888-588-3139</Text>
			</View>

			{/* Amount Section */}
			<View style={styles.section}>
				<View style={styles.row}>
					<Text style={styles.label}>Amount:</Text>
					<Text style={styles.value}>{formatMoney(amount)}</Text>
				</View>
			</View>

			{/* Footer */}
			<View style={styles.footer}>
				<Text>Make all checks payable to JORDAN DEVANEY</Text>
				<Text>Payment is due within 30 days.</Text>
			</View>
		</Page>
	</Document>
);
