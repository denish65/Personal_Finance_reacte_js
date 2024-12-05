import React from "react";

const ExpenseList = ({ expenses, handleDeleteExpense }) => {
  return (
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
  );
};

export default ExpenseList;
