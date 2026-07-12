import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const DownloadReportButton = ({
  orders,
  revenue,
  pending,
  usersCount,
  formatOrderId,
  formatDateTime,
}) => {
  const downloadPDF = () => {
    const doc = new jsPDF("landscape");

    // Title
    doc.setFontSize(18);
    doc.text("Admin Dashboard Report", 14, 20);

    // Summary
    doc.setFontSize(12);
    doc.text(`Total Orders: ${orders.length}`, 14, 35);
    doc.text(`Revenue: Rs. ${revenue}`, 14, 43);
    doc.text(`Pending Amount: Rs. ${pending}`, 14, 51);
    doc.text(`Total Users: ${usersCount}`, 14, 59);

    // Table Columns
    const tableColumn = [
      "Customer",
      "Email",
      "Phone",
      "Address",
      "Pincode",
      "Items",
      "Subtotal",
      "Delivery",
      "Total",
      "Payment Method",
      "Payment Status",
      "Order Status",
      "Date",
    ];
    // Table Rows
    const tableRows = [];

    orders.forEach((order) => {
      const items = order.items
        ?.map((item) => `${item.name} (${item.weight}) x ${item.quantity}`)
        .join(", ");
      tableRows.push([
        order.customer?.name || "",
        order.customer?.email || "",
        order.customer?.phone || "",
        order.customer?.address || "",
        order.customer?.pincode || "",
        `#${formatOrderId(order._id)}`,
        items,
        `Rs. ${order.subtotal || order.totalAmount}`,
        order.deliveryCharge === 0
          ? "FREE"
          : `Rs. ${order.deliveryCharge || 0}`,
        `Rs. ${order.totalAmount}`,
        order.paymentMethod || "",
        order.paymentStatus || "",
        order.orderStatus || "",
        formatDateTime(order.createdAt),
      ]);
    });

    // Generate Table
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 70,
      styles: {
        fontSize: 6,
        cellWidth: "wrap",
      },
      headStyles: {
        fillColor: [123, 44, 191],
      },
    });

    // Download
    doc.save("admin-dashboard-report.pdf");
  };

  return (
    <button onClick={downloadPDF} className="btn btn-success">
      Download PDF
    </button>
  );
};

export default DownloadReportButton;
