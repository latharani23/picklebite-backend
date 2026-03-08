const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const generateInvoice = (order) => {
  return new Promise((resolve, reject) => {
    const invoicesDir = path.join(__dirname, "../invoices");

    // create folder if missing
    if (!fs.existsSync(invoicesDir)) {
      fs.mkdirSync(invoicesDir, { recursive: true });
    }

    const filePath = path.join(invoicesDir, `invoice-${order._id}.pdf`);

    const doc = new PDFDocument();

    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);

    /* HEADER */

    doc.fontSize(22).text("Pickle Bite Invoice", { align: "center" });
    doc.moveDown();

    /* ORDER */

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

    // wait until file is fully written
    stream.on("finish", () => {
      resolve(filePath);
    });

    stream.on("error", reject);
  });
};

module.exports = generateInvoice;
