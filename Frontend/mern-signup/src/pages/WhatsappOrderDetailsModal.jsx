import React from "react";

const WhatsappOrderDetailsModal = ({ show, order, onClose }) => {
  if (!show || !order) return null;

  return (
    <div className="modal d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h4>WhatsApp Order Details</h4>

            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <div className="row">
              <div className="col-md-6 mb-3">
                <strong>Customer Name</strong>
                <p>{order.customerName}</p>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Phone</strong>
                <p>{order.phone}</p>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Products</strong>
                <p>{order.products}</p>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Quantity</strong>
                <p>{order.quantity}</p>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Total Amount</strong>
                <p>₹ {order.totalAmount}</p>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Payment Mode</strong>
                <p>{order.paymentMode}</p>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Payment Status</strong>
                <p>
                  <span
                    className={`badge ${
                      order.paymentStatus === "Paid"
                        ? "bg-success"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </p>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Order Status</strong>
                <p>
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
                </p>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Courier</strong>
                <p>{order.courier || "-"}</p>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Tracking ID</strong>
                <p>{order.trackingId || "-"}</p>
              </div>

              <div className="col-md-12 mb-3">
                <strong>Address</strong>
                <p>{order.address || "-"}</p>
              </div>

              <div className="col-md-12">
                <strong>Notes</strong>
                <p>{order.notes || "-"}</p>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsappOrderDetailsModal;
