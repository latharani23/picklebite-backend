import React from "react";

const WhatsappOrderTable = ({ orders, onEdit, onDelete }) => {
  return (
    <div className="card shadow border-0">
      <div className="card-body">
        <table className="table table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Customer</th>
              <th>Phone</th>
              <th>Products</th>
              <th>Qty</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Courier</th>
              <th>Tracking</th>
              <th width="170">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center">
                  No WhatsApp Orders Found
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.customerName}</td>

                  <td>{order.phone}</td>

                  <td>{order.products}</td>

                  <td>{order.quantity}</td>

                  <td>₹ {order.totalAmount}</td>

                  <td>
                    <span
                      className={`badge ${
                        order.paymentStatus === "Paid"
                          ? "bg-success"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`badge ${
                        order.orderStatus === "Delivered"
                          ? "bg-success"
                          : order.orderStatus === "Cancelled"
                            ? "bg-danger"
                            : "bg-primary"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>

                  <td>{order.courier || "-"}</td>

                  <td>{order.trackingId || "-"}</td>

                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => onEdit(order)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => onDelete(order._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WhatsappOrderTable;
