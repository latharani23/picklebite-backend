import React, { useEffect, useState } from "react";
import { createPromotion, updatePromotion } from "./PromotionService";

const PromotionForm = ({ show, onClose, onSuccess, promotion }) => {
  const initialState = {
    fullName: "",
    businessName: "",
    phone: "",
    whatsapp: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    platform: "Instagram",
    instagramUsername: "",
    followers: "",
    averageViews: "",
    engagementRate: "",
    campaignName: "",
    productName: "",
    quantity: 1,
    promotionCost: "",
    couponCode: "",
    expectedPostDate: "",
    actualPostDate: "",
    courierPartner: "",
    trackingNumber: "",
    courierCharge: "",
    ordersGenerated: "",
    revenueGenerated: "",
    roi: "",
    status: "Pending",
    notes: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  useEffect(() => {
    if (promotion) {
      setFormData(promotion);
    } else {
      setFormData(initialState);
    }
  }, [promotion]);
  const roi =
    Number(formData.revenueGenerated || 0) -
    Number(formData.promotionCost || 0);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    if (formData.phone.length !== 10) {
      alert("Phone number must contain exactly 10 digits.");
      return;
    }

    if (formData.whatsapp && formData.whatsapp.length !== 10) {
      alert("WhatsApp number must contain exactly 10 digits.");
      return;
    }

    if (Number(formData.quantity) < 1) {
      alert("Quantity must be at least 1.");
      return;
    }

    if (Number(formData.promotionCost) < 0) {
      alert("Promotion cost cannot be negative.");
      return;
    }
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    data.append("roi", roi);

    if (image) {
      data.append("profileImage", image);
    }

    try {
      if (promotion?._id) {
        await updatePromotion(promotion._id, data);
      } else {
        await createPromotion(data);
      }

      setFormData(initialState);
      setImage(null);
      setPreview("");

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  if (!show) return null;

  return (
    <div className="card p-4 mb-4 shadow">
      <h4>{promotion ? "Edit Promotion" : "Add Promotion"}</h4>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Full Name</label>
            <input
              className="form-control"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Profile Image</label>

            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={handleImageChange}
            />

            {preview && (
              <div className="mt-3">
                <img
                  src={preview}
                  alt="Preview"
                  width="120"
                  height="120"
                  className="rounded-circle border"
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}

            {!preview && promotion?.profileImage && (
              <div className="mt-3">
                <img
                  src={`https://picklebite-backend.onrender.com/uploads/${promotion.profileImage}`}
                  alt="Profile"
                  width="120"
                  height="120"
                  className="rounded-circle border"
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
          </div>
          <div className="col-md-6 mb-3">
            <label>Phone</label>
            <input
              type="tel"
              className="form-control"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              maxLength={10}
              pattern="[0-9]{10}"
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Business Name</label>
            <input
              className="form-control"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>WhatsApp</label>
            <input
              type="tel"
              className="form-control"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              maxLength={10}
              pattern="[0-9]{10}"
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Address</label>
            <textarea
              className="form-control"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>City</label>
            <input
              className="form-control"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>State</label>
            <input
              className="form-control"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Pincode</label>
            <input
              type="text"
              className="form-control"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              maxLength={6}
              pattern="[0-9]{6}"
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Followers</label>
            <input
              type="number"
              className="form-control"
              name="followers"
              value={formData.followers}
              onChange={handleChange}
              min="0"
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Average Views</label>
            <input
              type="number"
              className="form-control"
              name="averageViews"
              value={formData.averageViews}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Engagement Rate (%)</label>
            <input
              type="number"
              className="form-control"
              name="engagementRate"
              value={formData.engagementRate}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Campaign Name</label>
            <input
              className="form-control"
              name="campaignName"
              value={formData.campaignName}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Quantity</label>
            <input
              type="number"
              className="form-control"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Coupon Code</label>
            <input
              className="form-control"
              name="couponCode"
              value={formData.couponCode}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Expected Post Date</label>
            <input
              type="date"
              className="form-control"
              name="expectedPostDate"
              value={formData.expectedPostDate}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Actual Post Date</label>
            <input
              type="date"
              className="form-control"
              name="actualPostDate"
              value={formData.actualPostDate}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Orders Generated</label>
            <input
              type="number"
              className="form-control"
              name="ordersGenerated"
              value={formData.ordersGenerated}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Revenue Generated</label>
            <input
              type="number"
              className="form-control"
              name="revenueGenerated"
              value={formData.revenueGenerated}
              onChange={handleChange}
              min="0"
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>ROI</label>

            <input
              type="text"
              className="form-control"
              value={`₹ ${roi}`}
              readOnly
            />
          </div>
          <div className="col-md-12 mb-3">
            <label>Notes</label>
            <textarea
              className="form-control"
              rows="3"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Instagram</label>
            <input
              className="form-control"
              name="instagramUsername"
              value={formData.instagramUsername}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Product</label>
            <input
              className="form-control"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Promotion Cost</label>
            <input
              type="number"
              className="form-control"
              name="promotionCost"
              value={formData.promotionCost}
              onChange={handleChange}
              min="0"
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Status</label>
            <select
              className="form-select"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option>Pending</option>
              <option>Product Sent</option>
              <option>Reel Posted</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>
        <div className="d-flex justify-content-end gap-2 mt-4">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={onClose}
          >
            Cancel
          </button>

          <button type="submit" className="btn btn-primary">
            {promotion ? "Update Promotion" : "Save Promotion"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PromotionForm;
