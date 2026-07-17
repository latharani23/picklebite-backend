import React from "react";

const PromotionTable = ({ promotions, onEdit, onDelete, onView }) => {
  return (
    <div className="card shadow">
      <div className="card-body">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Instagram</th>
              <th>Product</th>
              <th>Cost</th>
              <th>Revenue</th>
              <th>ROI</th>
              <th>Status</th>
              <th width="170">Actions</th>
            </tr>
          </thead>

          <tbody>
            {promotions.length === 0 ? (
              <tr>
                <td colSpan="11" className="text-center">
                  No Promotions Found
                </td>
                c
              </tr>
            ) : (
              promotions.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>
                    {item.profileImage ? (
                      <img
                        src={`http://localhost:5000/uploads/${item.profileImage}`}
                        alt={item.fullName}
                        width="50"
                        height="50"
                        className="rounded-circle"
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>
                  <td>{item.fullName}</td>

                  <td>{item.phone}</td>

                  <td>{item.instagramUsername}</td>

                  <td>{item.productName}</td>

                  <td>₹ {item.promotionCost}</td>

                  <td>₹ {item.revenueGenerated}</td>

                  <td
                    className={
                      item.roi >= 0
                        ? "text-success fw-bold"
                        : "text-danger fw-bold"
                    }
                  >
                    ₹ {item.roi}
                  </td>

                  <td>
                    <span
                      className={`badge ${
                        item.status === "Completed"
                          ? "bg-success"
                          : item.status === "Pending"
                            ? "bg-warning text-dark"
                            : item.status === "Cancelled"
                              ? "bg-danger"
                              : "bg-primary"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="btn btn-sm btn-info me-2"
                      onClick={() => onView(item)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => onEdit(item)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => onDelete(item._id)}
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

export default PromotionTable;
