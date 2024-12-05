import React, { useState, useEffect } from "react";
import axios from "axios";
import ExpenseForm from "./ExpenseForm";
import Modal from "./Modal";

const csrfToken = window.csrfToken;

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/admin/expense/show");
      setExpenses(response.data.Expense);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleDeleteExpense = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;

    try {
      await axios.post(`http://localhost:8000/api/admin/deleteExpense/${id}`, {}, {
        headers: { "X-CSRF-TOKEN": csrfToken },
      });
      alert("Expense deleted successfully!");
      fetchExpenses();
    } catch (error) {
      console.error("Error deleting expense:", error);
      alert("An error occurred while deleting the expense.");
    }
  };

  return (
    <div>
      <h1>Expense List</h1>
      <button onClick={() => setModalOpen(true)}>Add Expense</button>
      <table border="1" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date</th>
            <th>Payment Type</th>
            <th>Reference Image</th>
            <th>Expense Note</th>
            <th>Location</th>
            <th>Item Name</th>
            <th>Payment For</th>
            <th>Payment Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.id}</td>
              <td>{expense.first_name}</td>
              <td>{expense.last_name}</td>
              <td>{expense.date}</td>
              <td>{expense.payment_type}</td>
              <td>
                <img
                  src={`http://localhost:8000/storage/${expense.reference_image}`}
                  alt="Reference"
                  style={{ width: "100px" }}
                />
              </td>
              <td>{expense.expense_note}</td>
              <td>{expense.location}</td>
              <td>{expense.item_name}</td>
              <td>{expense.payment_for}</td>
              <td>{expense.payment_status}</td>
              <td>
                <button onClick={() => handleDeleteExpense(expense.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && <Modal onClose={() => setModalOpen(false)}>
        <ExpenseForm onClose={() => setModalOpen(false)} fetchExpenses={fetchExpenses} />
      </Modal>}
    </div>
  );
};

export default Expenses;
