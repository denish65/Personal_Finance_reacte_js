import React, { useState } from "react";
import axios from "axios";

const csrfToken = window.csrfToken;

const ExpenseForm = ({ onClose, fetchExpenses }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    date: "",
    payment_type: "cash",
    reference_image: null,
    expense_note: "",
    location: "",
    item_name: "",
    payment_for: "",
    payment_status: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, reference_image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

    try {
      await axios.post("http://localhost:8000/api/admin/addexpense", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRF-TOKEN": csrfToken,
        },
      });
      alert("Expense added successfully!");
      onClose();
      fetchExpenses();
    } catch (error) {
      console.error("Error adding expense:", error);
      alert("An error occurred.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleInputChange} />
      <input type="text" name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleInputChange} />
      <input type="date" name="date" value={formData.date} onChange={handleInputChange} />
      <select name="payment_type" value={formData.payment_type} onChange={handleInputChange}>
        <option value="cash">Cash</option>
        <option value="credit">Credit</option>
        <option value="debit">Debit</option>
        <option value="online">Online</option>
      </select>
      <input type="file" name="reference_image" onChange={handleFileChange} />
      <input type="text" name="expense_note" placeholder="Expense Note" value={formData.expense_note} onChange={handleInputChange} />
      <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleInputChange} />
      <input type="text" name="item_name" placeholder="Item Name" value={formData.item_name} onChange={handleInputChange} />
      <input type="text" name="payment_for" placeholder="Payment For" value={formData.payment_for} onChange={handleInputChange} />
      <input type="text" name="payment_status" placeholder="Payment Status" value={formData.payment_status} onChange={handleInputChange} />
      <button type="submit">Submit</button>
      <button type="button" onClick={onClose}>Close</button>
    </form>
  );
};

export default ExpenseForm;
