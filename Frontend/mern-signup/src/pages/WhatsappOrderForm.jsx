import React, { useEffect, useState } from "react";
import {
  createWhatsappOrder,
  updateWhatsappOrder,
} from "./WhatsappOrderService";

const WhatsappOrderForm = ({ show, onClose, onSuccess, order }) => {
  const initialState = {
    customerName: "",
    phone: "",
    products: "",
    quantity: 1,
    totalAmount: "",
    paymentMode: "COD",
    paymentStatus: "Pending",
    orderStatus: "Received",
    courier: "",
    trackingId: "",
    address: "",
    notes: "",
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (order) {
      setFormData(order);
    } else {
      setFormData(initialState);
    }
  }, [order]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (order) {
        await updateWhatsappOrder(order._id, formData);
      } else {
        await createWhatsappOrder(formData);
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to save order.");
    }
  };

  if (!show) return null;

  return (
    <>
      <div className="modal d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4>{order ? "Edit WhatsApp Order" : "Add WhatsApp Order"}</h4>

              <button className="btn-close" onClick={onClose}></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>Customer Name</label>
                    <input
                      className="form-control"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Phone</label>
                    <input
                      className="form-control"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-12 mb-3">
                    <label>Products</label>
                    <input
                      className="form-control"
                      name="products"
                      value={formData.products}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label>Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label>Total Amount</label>
                    <input
                      type="number"
                      className="form-control"
                      name="totalAmount"
                      value={formData.totalAmount}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label>Payment Mode</label>
                    <select
                      className="form-select"
                      name="paymentMode"
                      value={formData.paymentMode}
                      onChange={handleChange}
                    >
                      <option>COD</option>
                      <option>UPI</option>
                      <option>Cash</option>
                      <option>Bank Transfer</option>
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Payment Status</label>
                    <select
                      className="form-select"
                      name="paymentStatus"
                      value={formData.paymentStatus}
                      onChange={handleChange}
                    >
                      <option>Pending</option>
                      <option>Paid</option>
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Order Status</label>
                    <select
                      className="form-select"
                      name="orderStatus"
                      value={formData.orderStatus}
                      onChange={handleChange}
                    >
                      <option>Received</option>
                      <option>Packing</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                      <option>Cancelled</option>
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Courier</label>
                    <input
                      className="form-control"
                      name="courier"
                      value={formData.courier}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Tracking ID</label>
                    <input
                      className="form-control"
                      name="trackingId"
                      value={formData.trackingId}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-12 mb-3">
                    <label>Address</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-12">
                    <label>Notes</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={onClose}
                >
                  Cancel
                </button>

                <button className="btn btn-primary" type="submit">
                  {order ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhatsappOrderForm;
