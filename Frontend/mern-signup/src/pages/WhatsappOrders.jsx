import React, { useEffect, useState } from "react";
import { getWhatsappOrders, deleteWhatsappOrder } from "./WhatsappOrderService";

import WhatsappOrderForm from "./WhatsappOrderForm";
import WhatsappOrderTable from "./WhatsappOrderTable";
import WhatsappOrderDetailsModal from "./WhatsappOrderDetailsModal";

const WhatsappOrders = () => {
  const [orders, setOrders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const loadOrders = async () => {
    try {
      const data = await getWhatsappOrders();
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this order?")) return;

    await deleteWhatsappOrder(id);
    loadOrders();
  };

  const filteredOrders = orders.filter((item) => {
    const value = search.toLowerCase();

    const matchesSearch =
      item.customerName?.toLowerCase().includes(value) ||
      item.phone?.includes(search) ||
      item.products?.toLowerCase().includes(value);

    const matchesStatus =
      statusFilter === "All" || item.orderStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalOrders = orders.length;

  const totalRevenue = orders.reduce(
    (sum, item) => sum + Number(item.totalAmount || 0),
    0,
  );

  const delivered = orders.filter((o) => o.orderStatus === "Delivered").length;

  const pending = orders.filter((o) => o.orderStatus !== "Delivered").length;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>📱 WhatsApp Orders</h2>

        <button
          className="btn btn-primary"
          onClick={() => {
            setSelectedOrder(null);
            setShowForm(true);
          }}
        >
          + Add WhatsApp Order
        </button>
      </div>

      {/* Summary Cards */}

      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <h5>Total Orders</h5>
              <h3>{totalOrders}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <h5>Total Revenue</h5>
              <h3>₹ {totalRevenue}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <h5>Delivered</h5>
              <h3>{delivered}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <h5>Pending</h5>
              <h3>{pending}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}

      <div className="row mb-3">
        <div className="col-md-8">
          <input
            className="form-control"
            placeholder="Search by Customer, Phone or Product..."
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
            <option>All</option>
            <option>Received</option>
            <option>Packing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </div>
      </div>

      <WhatsappOrderTable
        orders={filteredOrders}
        onEdit={(order) => {
          setSelectedOrder(order);
          setShowForm(true);
        }}
        onDelete={handleDelete}
      />

      <WhatsappOrderForm
        show={showForm}
        order={selectedOrder}
        onClose={() => setShowForm(false)}
        onSuccess={loadOrders}
      />

      <WhatsappOrderDetailsModal
        show={showDetails}
        order={selectedOrder}
        onClose={() => setShowDetails(false)}
      />
    </div>
  );
};

export default WhatsappOrders;
