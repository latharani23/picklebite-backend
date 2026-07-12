import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { API } from "../constants/const";

const ExpensesPage = () => {
  const [expenses, setExpenses] = useState([]);

  const [form, setForm] = useState({
    itemName: "",
    quantity: "",
    unit: "Kg",
    price: "",
    notes: "",
    purchaseDate: "",
  });

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const [purchaseDate, setPurchaseDate] = useState("");
  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const { data } = await axios.get(API.EXPENSES);
      setExpenses(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addExpense = async () => {
    try {
      if (!form.itemName || !form.price || !form.purchaseDate) {
        alert("All fields are required");
        return;
      }

      await axios.post(API.ADD_EXPENSE, form);

      setForm({
        itemName: "",
        quantity: "",
        unit: "Kg",
        price: "",
        notes: "",
        purchaseDate: "",
      });

      fetchExpenses();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteExpense = async (id) => {
    if (!window.confirm("Delete this expense?")) return;

    try {
      await axios.delete(`${API.EXPENSES}/${id}`);
      fetchExpenses();
    } catch (error) {
      console.error(error);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFillColor(75, 0, 130);
    doc.rect(0, 0, 210, 20, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.text("PickleBite Expense Report", 14, 13);

    autoTable(doc, {
      startY: 30,
      head: [["Date", "Item", "Qty", "Unit", "Price", "Notes"]],
      body: filteredExpenses.map((e) => [
        new Date(e.purchaseDate).toLocaleDateString(),
        e.itemName,
        e.quantity,
        e.unit,
        `₹${e.price}`,
        e.notes,
      ]),
    });

    doc.save("PickleBite-Expenses.pdf");
  };

  let filteredExpenses = expenses.filter((expense) =>
    expense.itemName?.toLowerCase().includes(search.toLowerCase()),
  );

  if (sort === "high") {
    filteredExpenses.sort((a, b) => b.price - a.price);
  }

  if (sort === "low") {
    filteredExpenses.sort((a, b) => a.price - b.price);
  }

  if (sort === "latest") {
    filteredExpenses.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
  }

  const totalExpenses = filteredExpenses.reduce(
    (sum, item) => sum + Number(item.price || 0),
    0,
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "30px",
        background: "linear-gradient(135deg,#2D004D,#4B0082,#7B2CBF)",
      }}
    >
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 style={{ color: "#fff" }}>💰 PickleBite Expenses</h1>

          <button className="btn btn-light" onClick={downloadPDF}>
            Download PDF
          </button>
        </div>

        {/* ADD FORM */}

        <div
          className="card shadow p-4 mb-4"
          style={{
            borderRadius: "15px",
            background: "#fff",
          }}
        >
          <h3 className="mb-3">Add Expense</h3>

          <input
            className="form-control mb-2"
            placeholder="Expense Name"
            value={form.itemName}
            onChange={(e) =>
              setForm({
                ...form,
                itemName: e.target.value,
              })
            }
          />

          <input
            type="number"
            className="form-control mb-2"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) =>
              setForm({
                ...form,
                quantity: e.target.value,
              })
            }
          />

          <select
            className="form-select mb-2"
            value={form.unit}
            onChange={(e) =>
              setForm({
                ...form,
                unit: e.target.value,
              })
            }
          >
            <option>Gram</option>
            <option>Kg</option>
            <option>Litre</option>
            <option>Piece</option>
          </select>

          <input
            type="number"
            className="form-control mb-2"
            placeholder="Price"
            value={form.price}
            onChange={(e) =>
              setForm({
                ...form,
                price: e.target.value,
              })
            }
          />

          <textarea
            className="form-control mb-3"
            placeholder="Notes"
            value={form.notes}
            onChange={(e) =>
              setForm({
                ...form,
                notes: e.target.value,
              })
            }
          />
          <div className="mb-3">
            <label className="form-label">
              Purchase Date <span style={{ color: "red" }}>*</span>
            </label>

            <input
              type="date"
              className="form-control"
              value={form.purchaseDate}
              onChange={(e) =>
                setForm({
                  ...form,
                  purchaseDate: e.target.value,
                })
              }
              required
            />
          </div>
          <button
            className="btn"
            style={{
              background: "#6A0DAD",
              color: "#fff",
            }}
            onClick={addExpense}
          >
            Add Expense
          </button>
        </div>

        {/* SUMMARY */}

        <div className="row mb-4">
          <div className="col-md-4">
            <div
              className="card p-3 text-center"
              style={{
                background: "#fff",
                borderRadius: "15px",
              }}
            >
              <h5>Total Expenses</h5>
              <h2>₹ {totalExpenses}</h2>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className="card p-3 text-center"
              style={{
                background: "#fff",
                borderRadius: "15px",
              }}
            >
              <h5>Total Records</h5>
              <h2>{filteredExpenses.length}</h2>
            </div>
          </div>
        </div>

        {/* SEARCH */}

        <div
          className="card p-3 mb-4"
          style={{
            background: "#fff",
            borderRadius: "15px",
          }}
        >
          <div className="row">
            <div className="col-md-6">
              <input
                className="form-control"
                placeholder="Search Expense..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <select
                className="form-select"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="latest">Latest</option>
                <option value="high">Price High → Low</option>
                <option value="low">Price Low → High</option>
              </select>
            </div>
          </div>
        </div>

        {/* TABLE */}

        <div
          className="card p-4"
          style={{
            background: "#fff",
            borderRadius: "15px",
          }}
        >
          <h3 className="mb-3">Expense Records</h3>

          <div className="table-responsive">
            <table className="table table-bordered">
              <thead
                style={{
                  background: "#6A0DAD",
                  color: "#fff",
                }}
              >
                <tr>
                  <th>Date</th>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Unit</th>
                  <th>Price</th>
                  <th>Notes</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredExpenses.map((expense) => (
                  <tr key={expense._id}>
                    <td>
                      {expense.purchaseDate
                        ? new Date(expense.purchaseDate).toLocaleDateString()
                        : "-"}
                    </td>
                    <td>{expense.itemName}</td>

                    <td>{expense.quantity}</td>

                    <td>{expense.unit}</td>

                    <td>₹ {expense.price}</td>

                    <td>{expense.notes}</td>

                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteExpense(expense._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredExpenses.length === 0 && (
              <div className="text-center p-3">No Expenses Found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpensesPage;
