"use client";

import React from "react";
import { jsPDF } from "jspdf";
import { toast } from "react-toastify";

const DownloadInvoice = ({ order }) => {
  const generateInvoice = () => {
    try {
      const doc = new jsPDF();

      /* ================= HEADER ================= */
      doc.setFontSize(22);
      doc.setTextColor(255, 107, 0);
      doc.text("PICKLE BITE", 105, 20, { align: "center" });

      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.text("Homemade • Authentic • Crafted with Love", 105, 28, {
        align: "center",
      });

      doc.line(10, 35, 200, 35);

      /* ================= ORDER INFO ================= */
      doc.setFontSize(12);
      doc.text("Invoice Details", 15, 45);

      doc.setFontSize(10);
      doc.text(`Order ID: ${order._id.slice(-6)}`, 15, 55);
      doc.text(
        `Date: ${new Date(order.createdAt).toLocaleDateString()}`,
        15,
        62,
      );
      doc.text(`Payment Method: ${order.paymentMethod}`, 15, 69);
      doc.text(`Payment Status: ${order.paymentStatus}`, 15, 76);
      doc.text(`Order Status: ${order.orderStatus}`, 15, 83);

      /* ================= CUSTOMER DETAILS ================= */
      doc.setFontSize(12);
      doc.text("Bill To:", 120, 45);

      doc.setFontSize(10);
      doc.text(`Name: ${order.customer?.name || "-"}`, 120, 55);
      doc.text(`Email: ${order.customer?.email || "-"}`, 120, 62);
      doc.text(`Phone: ${order.customer?.phone || "-"}`, 120, 69);

      const addressLines = doc.splitTextToSize(
        `Address: ${order.customer?.address || "-"}`,
        70,
      );
      doc.text(addressLines, 120, 76);

      /* ================= ITEMS TABLE ================= */
      doc.line(10, 100, 200, 100);

      doc.setFontSize(12);
      doc.text("Ordered Items", 15, 110);

      doc.setFontSize(10);

      // Table Header
      let y = 120;
      doc.text("Item", 15, y);
      doc.text("Weight", 90, y);
      doc.text("Qty", 120, y);
      doc.text("Price", 140, y);
      doc.text("Total", 170, y);

      doc.line(10, y + 2, 200, y + 2);
      y += 10;

      order.items?.forEach((item, index) => {
        doc.text(item.name, 15, y);
        doc.text(item.weight, 90, y);
        doc.text(String(item.quantity), 120, y);
        doc.text(`Rs. ${item.price}`, 140, y);
        doc.text(`Rs. ${item.price * item.quantity}`, 170, y);
        y += 8;
      });

      doc.line(10, y + 5, 200, y + 5);

      /* ================= TOTAL ================= */
      doc.setFontSize(12);

      y += 15;

      // Subtotal (from DB)
      doc.setFontSize(11);
      doc.text(`Subtotal: Rs. ${order.subtotal ?? 0}`, 140, y);

      // Delivery (from DB)
      y += 8;
      doc.text(
        `Delivery: ${
          order.deliveryCharge === 0 ? "FREE" : `Rs. ${order.deliveryCharge}`
        }`,
        140,
        y,
      );

      // Grand Total (from DB)
      y += 10;
      doc.setFontSize(13);
      doc.setTextColor(0, 128, 0);
      doc.text(`Grand Total: Rs. ${order.totalAmount ?? 0}`, 140, y);

      // Reset color
      doc.setTextColor(0, 0, 0);

      /* ================= FOOTER ================= */
      doc.setFontSize(10);
      doc.setTextColor(120);
      doc.text("Thank you for choosing Picklebite", 105, 280, {
        align: "center",
      });

      doc.save(`PickleBite_Invoice_${order._id.slice(-6)}.pdf`);
    } catch (error) {
      console.error("Invoice Error:", error);
      toast.error("Invoice generation failed");
    }
  };

  return (
    <button
      className="btn btn-sm btn-outline-success w-100 mt-2"
      onClick={generateInvoice}
    >
      Download Invoice
    </button>
  );
};

export default DownloadInvoice;
