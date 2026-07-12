import React from "react";
import { jsPDF } from "jspdf";
import { toast } from "react-toastify";

const DownloadInvoice = ({ order }) => {
  const generateInvoice = () => {
    try {
      const doc = new jsPDF();

      /* ================= HEADER ================= */

      doc.setFontSize(22);
      doc.setTextColor(128, 0, 128);
      doc.text("PICKLEBITE", 105, 20, { align: "center" });

      doc.setFontSize(10);
      doc.setTextColor(80);
      doc.text("Homemade • No Preservatives • Crafted with Love", 105, 28, {
        align: "center",
      });

      doc.line(10, 35, 200, 35);

      /* ================= INVOICE TITLE ================= */

      doc.setFontSize(16);
      doc.setTextColor(0);
      doc.text("INVOICE", 15, 48);

      /* ================= ORDER DETAILS ================= */

      doc.setFontSize(10);

      doc.text(`Order ID : ${order._id?.slice(-6) || "-"}`, 15, 58);

      doc.text(
        `Date : ${new Date(order.createdAt).toLocaleDateString()}`,
        15,
        65,
      );

      doc.text(`Payment Method : ${order.paymentMethod || "-"}`, 15, 72);

      doc.text(`Payment Status : ${order.paymentStatus || "-"}`, 15, 79);

      doc.text(`Order Status : ${order.orderStatus || "-"}`, 15, 86);

      /* ================= CUSTOMER DETAILS ================= */

      doc.setFontSize(12);
      doc.text("Bill To", 120, 48);

      doc.setFontSize(10);

      doc.text(`Name : ${order.customer?.name || "-"}`, 120, 58);

      doc.text(`Email : ${order.customer?.email || "-"}`, 120, 65);

      doc.text(`Phone : ${order.customer?.phone || "-"}`, 120, 72);

      const addressLines = doc.splitTextToSize(
        order.customer?.address || "-",
        65,
      );

      doc.text("Address :", 120, 79);
      doc.text(addressLines, 120, 85);

      /* ================= ITEMS TABLE ================= */

      let y = 110;

      doc.setFontSize(12);
      doc.text("Ordered Items", 15, y);

      y += 10;

      doc.setFontSize(10);
      doc.setFont(undefined, "bold");

      doc.text("Item", 15, y);
      doc.text("Weight", 85, y);
      doc.text("Qty", 115, y);
      doc.text("Price", 140, y);
      doc.text("Total", 170, y);

      doc.line(10, y + 2, 200, y + 2);

      doc.setFont(undefined, "normal");

      y += 10;

      order.items?.forEach((item) => {
        doc.text(item.name || "-", 15, y);
        doc.text(item.weight || "-", 85, y);
        doc.text(String(item.quantity || 0), 115, y);
        doc.text(`Rs. ${item.price || 0}`, 140, y);
        doc.text(`Rs. ${(item.price || 0) * (item.quantity || 0)}`, 170, y);

        y += 8;
      });

      doc.line(10, y, 200, y);

      /* ================= SAMPLE BOX ================= */

      if (order.sampleBox?.length > 0) {
        y += 12;

        doc.setFillColor(245, 240, 255);
        doc.rect(15, y - 6, 180, 10, "F");

        doc.setFontSize(12);
        doc.setTextColor(128, 0, 128);

        doc.text(
          `Sample Box Preferences (${order.sampleBox.length} Items)`,
          18,
          y,
        );

        y += 12;

        doc.setFontSize(10);
        doc.setTextColor(0);

        order.sampleBox.forEach((sample) => {
          doc.text(`• ${sample}`, 20, y);
          y += 7;
        });

        doc.line(15, y, 195, y);
      }

      /* ================= TOTALS ================= */

      y += 15;

      doc.setFontSize(11);

      doc.text(`Subtotal : Rs. ${order.subtotal || 0}`, 135, y);

      y += 8;

      doc.text(
        `Delivery : ${
          order.deliveryCharge === 0 ? "FREE" : `Rs. ${order.deliveryCharge}`
        }`,
        135,
        y,
      );

      y += 10;

      doc.setFontSize(13);
      doc.setTextColor(0, 128, 0);

      doc.text(`Grand Total : Rs. ${order.totalAmount || 0}`, 135, y);

      /* ================= FOOTER ================= */

      doc.setTextColor(120);

      doc.line(10, 270, 200, 270);

      doc.setFontSize(10);

      doc.text("Thank you for choosing PickleBite ❤️", 105, 278, {
        align: "center",
      });

      doc.text("www.picklebite.in | +91 7975390038", 105, 284, {
        align: "center",
      });

      /* ================= SAVE PDF ================= */

      doc.save(`PickleBite_Invoice_${order._id?.slice(-6) || "Invoice"}.pdf`);
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
