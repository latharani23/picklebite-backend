import React, { useEffect, useState } from "react";
import { getPromotions, deletePromotion } from "./PromotionService";

import PromotionForm from "./PromotionForm";
import PromotionTable from "./PromotionTable";
import { FaUsers, FaMoneyBillWave, FaChartLine, FaClock } from "react-icons/fa";
import PromotionDetailsModal from "./PromotionDetailsModal";
const Promotions = () => {
  const [promotions, setPromotions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showDetails, setShowDetails] = useState(false);
  const loadPromotions = async () => {
    try {
      const res = await getPromotions();
      setPromotions(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadPromotions();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this promotion?")) return;

    await deletePromotion(id);
    loadPromotions();
  };
  const totalPromotions = promotions.length;

  const totalSpend = promotions.reduce(
    (sum, item) => sum + Number(item.promotionCost || 0),
    0,
  );

  const totalRevenue = promotions.reduce(
    (sum, item) => sum + Number(item.revenueGenerated || 0),
    0,
  );

  const totalROI = totalRevenue - totalSpend;

  const pendingCount = promotions.filter(
    (item) => item.status === "Pending",
  ).length;
  const filteredPromotions = promotions.filter((item) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      item.fullName?.toLowerCase().includes(searchValue) ||
      item.phone?.includes(search) ||
      item.instagramUsername?.toLowerCase().includes(searchValue) ||
      item.productName?.toLowerCase().includes(searchValue);

    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>📢 Promotions & Collaborations</h2>

        <button
          className="btn btn-primary"
          onClick={() => {
            setSelectedPromotion(null);
            setShowForm(true);
          }}
        >
          + Add Promotion
        </button>
      </div>
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <FaUsers size={35} className="text-primary mb-2" />
              <h5>Total Promotions</h5>
              <h3>{totalPromotions}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <FaMoneyBillWave size={35} className="text-danger mb-2" />
              <h5>Total Spend</h5>
              <h3>₹ {totalSpend}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <FaChartLine size={35} className="text-success mb-2" />
              <h5>Revenue</h5>
              <h3>₹ {totalRevenue}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <FaClock size={35} className="text-warning mb-2" />
              <h5>Pending</h5>
              <h3>{pendingCount}</h3>
            </div>
          </div>
        </div>
      </div>
      <PromotionForm
        show={showForm}
        onClose={() => setShowForm(false)}
        onSuccess={loadPromotions}
        promotion={selectedPromotion}
      />
      <PromotionDetailsModal
        show={showDetails}
        promotion={selectedPromotion}
        onClose={() => setShowDetails(false)}
      />
      <div className="row mb-3">
        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Name, Phone, Instagram or Product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Product Sent">Product Sent</option>
            <option value="Reel Posted">Reel Posted</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>
      <PromotionTable
        promotions={filteredPromotions}
        onView={(promotion) => {
          setSelectedPromotion(promotion);
          setShowDetails(true);
        }}
        onEdit={(promotion) => {
          setSelectedPromotion(promotion);
          setShowForm(true);
        }}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Promotions;
