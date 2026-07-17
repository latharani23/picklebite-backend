import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 11,
    fontFamily: "Helvetica",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: "2 solid #6A0DAD",
    paddingBottom: 10,
    marginBottom: 20,
  },

  companyName: {
    fontSize: 24,
    color: "#6A0DAD",
    fontWeight: "bold",
  },

  title: {
    fontSize: 22,
    color: "#6A0DAD",
    fontWeight: "bold",
  },

  sectionTitle: {
    fontSize: 15,
    color: "#6A0DAD",
    marginTop: 15,
    marginBottom: 10,
    fontWeight: "bold",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },

  label: {
    fontWeight: "bold",
    width: "40%",
  },

  value: {
    width: "60%",
  },

  table: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#6A0DAD",
    color: "#fff",
    fontWeight: "bold",
    padding: 8,
  },

  tableRow: {
    flexDirection: "row",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },

  col1: { width: "40%" },
  col2: { width: "20%" },
  col3: { width: "20%" },
  col4: { width: "20%" },

  totalSection: {
    marginTop: 20,
    alignItems: "flex-end",
  },

  total: {
    fontSize: 16,
    color: "#6A0DAD",
    fontWeight: "bold",
  },

  footer: {
    marginTop: 40,
    textAlign: "center",
    borderTop: "2 solid #6A0DAD",
    paddingTop: 15,
  },
});

const InvoicePDF = ({ order }) => {
  const items = order.items || [
    {
      productName: order.products,
      quantity: order.quantity,
      price: order.totalAmount,
    },
  ];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* HEADER */}

        <View style={styles.header}>
          <View>
            <Text style={styles.companyName}>PickleBite</Text>
            <Text>Homemade Pickles & Powders</Text>
            <Text>No Oil | No Preservatives</Text>
            <Text>www.picklebite.in</Text>
          </View>

          <View>
            <Text style={styles.title}>INVOICE</Text>

            <Text>Invoice No : INV-{order._id?.slice(-6)}</Text>

            <Text>Order ID : {order.orderId || order._id}</Text>

            <Text>Date : {new Date(order.createdAt).toLocaleDateString()}</Text>
          </View>
        </View>

        {/* CUSTOMER */}

        <Text style={styles.sectionTitle}>Customer Details</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Customer Name</Text>
          <Text style={styles.value}>{order.customerName}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{order.email}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>{order.phone}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Address</Text>
          <Text style={styles.value}>{order.address}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>City</Text>
          <Text style={styles.value}>{order.city}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>State</Text>
          <Text style={styles.value}>{order.state}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Country</Text>
          <Text style={styles.value}>{order.country || "India"}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Pincode</Text>
          <Text style={styles.value}>{order.pincode}</Text>
        </View>

        {/* ITEMS */}

        <Text style={styles.sectionTitle}>Items Ordered</Text>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.col1}>Product</Text>
            <Text style={styles.col2}>Qty</Text>
            <Text style={styles.col3}>Price</Text>
            <Text style={styles.col4}>Total</Text>
          </View>

          {items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.col1}>{item.productName}</Text>

              <Text style={styles.col2}>{item.quantity}</Text>

              <Text style={styles.col3}>₹ {item.price}</Text>

              <Text style={styles.col4}>₹ {item.quantity * item.price}</Text>
            </View>
          ))}
        </View>

        {/* TOTAL */}

        <View style={styles.totalSection}>
          <Text>Delivery Charges : ₹ {order.deliveryCharges || 0}</Text>

          <Text>Payment Mode : {order.paymentMode}</Text>

          <Text>Payment Status : {order.paymentStatus}</Text>

          <Text style={styles.total}>Total Paid : ₹ {order.totalAmount}</Text>
        </View>

        {/* FOOTER */}

        <View style={styles.footer}>
          <Text>Thank you for shopping with PickleBite ❤️</Text>

          <Text>No Oil | No Preservatives</Text>

          <Text>www.picklebite.in</Text>
        </View>
      </Page>
    </Document>
  );
};

export default InvoicePDF;
