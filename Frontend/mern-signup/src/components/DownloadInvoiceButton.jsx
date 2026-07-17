import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "./InvoicePDF";

const DownloadInvoiceButton = ({ order }) => {
  return (
    <PDFDownloadLink
      document={<InvoicePDF order={order} />}
      fileName={`PickleBite-Invoice-${order.orderId || order._id}.pdf`}
      className="btn btn-success"
    >
      {({ loading }) => (loading ? "Generating..." : "Download Invoice")}
    </PDFDownloadLink>
  );
};

export default DownloadInvoiceButton;
