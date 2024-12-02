import logo from './logo.svg';
import './App.css';
// import Library from './components/Library';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import axios from "axios";


function App() {

  const [expenses, setExpenses] = useState([]);

  // Fetching data from the API
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/admin/expense/show");
        setExpenses(response.data.Expense); // Assuming "Expense" is the key for the data array
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };
    fetchExpenses();
  }, []);
  return (
    <div className="App">
     <div style={{ padding: "20px" }}>
      <h1>Expense List</h1>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      <div>
    {/* <Library/> */}
  </div>
    </div>
    
  );
}

export default App;
