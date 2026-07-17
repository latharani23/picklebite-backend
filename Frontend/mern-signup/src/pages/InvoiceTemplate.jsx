import React, { forwardRef } from "react";

const InvoiceTemplate = forwardRef(({ order }, ref) => {
  const items = order?.items || [
    {
      productName: order?.products || "-",
      quantity: order?.quantity || 1,
      price: order?.totalAmount || 0,
    },
  ];

  return (
    <div
      ref={ref}
      style={{
        width: "800px",
        margin: "0 auto",
        padding: "30px",
        fontFamily: "Arial",
        background: "#fff",
        color: "#000",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "2px solid #6A0DAD",
          paddingBottom: "15px",
        }}
      >
        <div>
          <h1 style={{ color: "#6A0DAD", margin: 0 }}>PickleBite</h1>
          <p>Homemade Pickles & Powders</p>
          <p>No Oil | No Preservatives</p>
          <p>www.picklebite.in</p>
        </div>

        <div style={{ textAlign: "right" }}>
          <h2>INVOICE</h2>
          <p>
            <b>Invoice No:</b> INV-{order?._id?.slice(-6) || "000001"}
          </p>
          <p>
            <b>Order ID:</b> {order?.orderId || order?._id}
          </p>
          <p>
            <b>Date:</b>{" "}
            {order?.createdAt
              ? new Date(order.createdAt).toLocaleDateString()
              : new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      <h3 style={{ color: "#6A0DAD" }}>Customer Details</h3>

      <table width="100%">
        <tbody>
          <tr>
            <td>
              <b>Name</b>
            </td>
            <td>{order?.customerName || "-"}</td>
          </tr>

          <tr>
            <td>
              <b>Email</b>
            </td>
            <td>{order?.email || "-"}</td>
          </tr>

          <tr>
            <td>
              <b>Phone</b>
            </td>
            <td>{order?.phone || "-"}</td>
          </tr>

          <tr>
            <td>
              <b>Address</b>
            </td>
            <td>{order?.address || "-"}</td>
          </tr>

          <tr>
            <td>
              <b>City</b>
            </td>
            <td>{order?.city || "-"}</td>
          </tr>

          <tr>
            <td>
              <b>State</b>
            </td>
            <td>{order?.state || "-"}</td>
          </tr>

          <tr>
            <td>
              <b>Country</b>
            </td>
            <td>{order?.country || "India"}</td>
          </tr>

          <tr>
            <td>
              <b>Pincode</b>
            </td>
            <td>{order?.pincode || "-"}</td>
          </tr>
        </tbody>
      </table>

      <br />

      <h3 style={{ color: "#6A0DAD" }}>Items Ordered</h3>

      <table
        width="100%"
        border="1"
        cellPadding="8"
        style={{ borderCollapse: "collapse" }}
      >
        <thead style={{ background: "#6A0DAD", color: "#fff" }}>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.productName}</td>
              <td>{item.quantity}</td>
              <td>₹ {item.price}</td>
              <td>₹ {item.quantity * item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      <table width="100%">
        <tbody>
          <tr>
            <td>
              <b>Delivery Charges</b>
            </td>
            <td align="right">₹ {order?.deliveryCharges || 0}</td>
          </tr>

          <tr>
            <td>
              <b>Total Paid</b>
            </td>
            <td align="right">
              <h2 style={{ color: "#6A0DAD" }}>₹ {order?.totalAmount || 0}</h2>
            </td>
          </tr>
        </tbody>
      </table>

      <hr />

      <h3 style={{ color: "#6A0DAD" }}>Payment Details</h3>

      <table width="100%">
        <tbody>
          <tr>
            <td>
              <b>Payment Mode</b>
            </td>
            <td>{order?.paymentMode || "-"}</td>
          </tr>

          <tr>
            <td>
              <b>Payment Status</b>
            </td>
            <td>{order?.paymentStatus || "-"}</td>
          </tr>
        </tbody>
      </table>

      <div
        style={{
          marginTop: "30px",
          textAlign: "center",
          borderTop: "2px solid #6A0DAD",
          paddingTop: "20px",
        }}
      >
        <h2 style={{ color: "#6A0DAD" }}>Thank You!</h2>
        <p>Thank you for shopping with PickleBite.</p>
        <p>
          <strong>No Oil | No Preservatives</strong>
        </p>
        <p>www.picklebite.in</p>
      </div>
    </div>
  );
});

export default InvoiceTemplate;
