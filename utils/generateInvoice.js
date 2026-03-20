// const PDFDocument = require("pdfkit");
// const fs = require("fs");
// const path = require("path");

// const generateInvoice = (order) => {
//   return new Promise((resolve, reject) => {
//     const invoicesDir = path.join(__dirname, "../invoices");

//     // create folder if missing
//     if (!fs.existsSync(invoicesDir)) {
//       fs.mkdirSync(invoicesDir, { recursive: true });
//     }

//     const filePath = path.join(invoicesDir, `invoice-${order._id}.pdf`);

//     const doc = new PDFDocument();

//     const stream = fs.createWriteStream(filePath);

//     doc.pipe(stream);

//     /* HEADER */

//     doc.fontSize(22).text("Pickle Bite Invoice", { align: "center" });
//     doc.moveDown();

//     /* ORDER */

//     doc.fontSize(12).text(`Order ID: ${order._id}`);
//     doc.text(`Customer: ${order.customer.name}`);
//     doc.text(`Email: ${order.customer.email}`);
//     doc.text(`Phone: ${order.customer.phone}`);
//     doc.text(`Address: ${order.customer.address}`);

//     doc.moveDown();

//     doc.text("Items:");

//     order.items.forEach((item) => {
//       doc.text(
//         `${item.name} (${item.weight}) - Qty: ${item.quantity} - Rs.${item.price}`,
//       );
//     });

//     doc.moveDown();

//     doc.text(`Total: Rs.${order.totalAmount}`);

//     doc.end();

//     // wait until file is fully written
//     stream.on("finish", () => {
//       resolve(filePath);
//     });

//     stream.on("error", reject);
//   });
// };

// module.exports = generateInvoice;

const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const generateInvoice = (order) => {
  return new Promise((resolve, reject) => {
    const invoicesDir = path.join(__dirname, "../invoices");

    if (!fs.existsSync(invoicesDir)) {
      fs.mkdirSync(invoicesDir, { recursive: true });
    }

    const filePath = path.join(invoicesDir, `invoice-${order._id}.pdf`);

    const doc = new PDFDocument({ margin: 40 });
    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);

    /* ================= HEADER ================= */

    doc
      .fontSize(22)
      .fillColor("#ff6b00")
      .text("PICKLE BITE", { align: "center" });

    doc
      .fontSize(11)
      .fillColor("black")
      .text("Homemade • Authentic • Crafted with Love", {
        align: "center",
      });

    doc.moveDown();
    doc.moveTo(40, 80).lineTo(550, 80).stroke();

    /* ================= ORDER INFO ================= */

    doc.moveDown(2);

    doc.fontSize(14).text("Invoice Details", 40, 100);

    doc.fontSize(10);

    doc.text(`Order ID: ${order._id.toString().slice(-6)}`, 40, 120);
    doc.text(
      `Date: ${new Date(order.createdAt).toLocaleDateString()}`,
      40,
      135,
    );
    doc.text(`Payment Method: ${order.paymentMethod}`, 40, 150);
    doc.text(`Payment Status: ${order.paymentStatus}`, 40, 165);
    doc.text(`Order Status: ${order.orderStatus}`, 40, 180);

    /* ================= CUSTOMER ================= */

    doc.fontSize(14).text("Bill To:", 350, 100);

    doc.fontSize(10);

    doc.text(`Name: ${order.customer?.name || "-"}`, 350, 120);
    doc.text(`Email: ${order.customer?.email || "-"}`, 350, 135);
    doc.text(`Phone: ${order.customer?.phone || "-"}`, 350, 150);

    doc.text(`Address: ${order.customer?.address || "-"}`, 350, 165, {
      width: 200,
    });

    /* ================= ITEMS TABLE ================= */

    let tableTop = 230;

    doc
      .moveTo(40, tableTop - 10)
      .lineTo(550, tableTop - 10)
      .stroke();

    doc.fontSize(12).text("Ordered Items", 40, tableTop - 30);

    doc.fontSize(10);

    // table header
    doc.text("Item", 40, tableTop);
    doc.text("Weight", 220, tableTop);
    doc.text("Qty", 300, tableTop);
    doc.text("Price", 360, tableTop);
    doc.text("Total", 450, tableTop);

    doc
      .moveTo(40, tableTop + 10)
      .lineTo(550, tableTop + 10)
      .stroke();

    let y = tableTop + 25;

    order.items.forEach((item) => {
      doc.text(item.name, 40, y);
      doc.text(item.weight, 220, y);
      doc.text(String(item.quantity), 300, y);
      doc.text(`Rs. ${item.price}`, 360, y);
      doc.text(`Rs. ${item.price * item.quantity}`, 450, y);

      y += 20;
    });

    doc.moveTo(40, y).lineTo(550, y).stroke();

    /* ================= TOTAL ================= */

    y += 20;

    // Subtotal
    doc
      .fontSize(11)
      .fillColor("black")
      .text(`Subtotal: Rs. ${order.subtotal ?? 0}`, 350, y);

    // Delivery
    y += 15;
    doc.text(
      `Delivery: ${
        order.deliveryCharge === 0 ? "FREE" : `Rs. ${order.deliveryCharge}`
      }`,
      350,
      y,
    );

    // Grand Total
    y += 20;
    doc
      .fontSize(14)
      .fillColor("green")
      .text(`Grand Total: Rs. ${order.totalAmount ?? 0}`, 350, y);

    /* ================= FOOTER ================= */

    doc.fontSize(10).fillColor("gray");

    doc.text("Thank you for choosing Picklebite", 40, 750, {
      align: "center",
    });

    doc.end();

    stream.on("finish", () => {
      resolve(filePath);
    });

    stream.on("error", reject);
  });
};

module.exports = generateInvoice;
