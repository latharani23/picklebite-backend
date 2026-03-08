const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const generateInvoice = (order) => {
  return new Promise((resolve) => {
    const filePath = path.join(
      __dirname,
      `../invoices/invoice-${order._id}.pdf`,
    );

    const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(20).text("Pickle Bite Invoice", { align: "center" });

    doc.moveDown();

    doc.fontSize(12).text(`Order ID: ${order._id}`);
    doc.text(`Customer: ${order.customer.name}`);
    doc.text(`Email: ${order.customer.email}`);
    doc.text(`Phone: ${order.customer.phone}`);
    doc.text(`Address: ${order.customer.address}`);

    doc.moveDown();

    doc.text("Items:");

    order.items.forEach((item) => {
      doc.text(
        `${item.name} (${item.weight}) - Qty: ${item.quantity} - Rs.${item.price}`,
      );
    });

    doc.moveDown();

    doc.text(`Total: Rs.${order.totalAmount}`);

    doc.end();

    resolve(filePath);
  });
};

module.exports = generateInvoice;
