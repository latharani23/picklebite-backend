const express = require("express");

const {
  getExpenses,
  addExpense,
  deleteExpense,
  updateExpense,
} = require("../controllers/expenseController");

const router = express.Router();

router.get("/", getExpenses);
router.post("/", addExpense);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

module.exports = router;
