import React from "react";

const PromotionDetailsModal = ({ show, onClose, promotion }) => {
  if (!show || !promotion) return null;

  return (
    <div
      className="modal fade show"
      style={{
        display: "block",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h4>Promotion Details</h4>

            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <div className="row">
              <div className="col-md-6">
                <h5>Personal Information</h5>
                <p>
                  <strong>Name:</strong> {promotion.fullName}
                </p>
                <p>
                  <strong>Business:</strong> {promotion.businessName}
                </p>
                <p>
                  <strong>Phone:</strong> {promotion.phone}
                </p>
                <p>
                  <strong>WhatsApp:</strong> {promotion.whatsapp}
                </p>
                <p>
                  <strong>Email:</strong> {promotion.email}
                </p>
              </div>

              <div className="col-md-6">
                <h5>Address</h5>
                <p>{promotion.address}</p>
                <p>{promotion.city}</p>
                <p>{promotion.state}</p>
                <p>{promotion.pincode}</p>
              </div>
            </div>

            <hr />

            <div className="row">
              <div className="col-md-6">
                <h5>Social Media</h5>

                <p>
                  <strong>Platform:</strong> {promotion.platform}
                </p>

                <p>
                  <strong>Instagram:</strong> {promotion.instagramUsername}
                </p>

                <p>
                  <strong>Followers:</strong> {promotion.followers}
                </p>
              </div>

              <div className="col-md-6">
                <h5>Campaign</h5>

                <p>
                  <strong>Campaign:</strong> {promotion.campaignName}
                </p>

                <p>
                  <strong>Product:</strong> {promotion.productName}
                </p>

                <p>
                  <strong>Quantity:</strong> {promotion.quantity}
                </p>
              </div>
            </div>

            <hr />

            <div className="row">
              <div className="col-md-4">
                <strong>Promotion Cost</strong>
                <p>₹ {promotion.promotionCost}</p>
              </div>

              <div className="col-md-4">
                <strong>Revenue</strong>
                <p>₹ {promotion.revenueGenerated}</p>
              </div>

              <div className="col-md-4">
                <strong>ROI</strong>
                <p>₹ {promotion.roi}</p>
              </div>
            </div>

            <hr />

            <h5>Notes</h5>

            <p>{promotion.notes || "No notes available"}</p>
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

export default PromotionDetailsModal;
