import React, { useState, useEffect } from "react";
import axios from "axios";
const csrfToken = window.csrfToken;

function App() {
  const [expenses, setExpenses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
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

  // Define fetchExpenses outside useEffect to make it reusable
  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/admin/expense/show");
      
      setExpenses(response.data.Expense); // Assuming "Expense" is the key for the data array
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  // Call fetchExpenses in useEffect
  useEffect(() => {
    fetchExpenses();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData({ ...formData, reference_image: e.target.files[0] });
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
      
    });
    console.log(data);

    try {
      await axios.post("http://localhost:8000/api/admin/addexpense", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          // "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content,
          "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.content || csrfToken, // Fallback if meta tag is null

        },
      });
      setModalOpen(false); // Close the modal
      setFormData({
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
      fetchExpenses(); // Refresh expenses list
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <div className="App">
      <div style={{ padding: "20px" }}>
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

      {/* Modal */}
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h5>Add New Expense</h5>
            <form onSubmit={handleFormSubmit}>
              <div>
                <label>First Name:</label>
                <input type="text" name="first_name" value={formData.first_name} onChange={handleInputChange} />
              </div>
              <div>
                <label>Last Name:</label>
                <input type="text" name="last_name" value={formData.last_name} onChange={handleInputChange} />
              </div>
              <div>
                <label>Date:</label>
                <input type="date" name="date" value={formData.date} onChange={handleInputChange} />
              </div>
              <div>
                <label>Payment Type:</label>
                <select name="payment_type" value={formData.payment_type} onChange={handleInputChange}>
                  <option value="cash">Cash</option>
                  <option value="credit">Credit</option>
                  <option value="debit">Debit</option>
                  <option value="online">Online</option>
                </select>
              </div>
              <div>
                <label>Reference Image:</label>
                <input type="file" name="reference_image" onChange={handleFileChange} />
              </div>
              <div>
                <label>Expense Note:</label>
                <input type="text" name="expense_note" value={formData.expense_note} onChange={handleInputChange} />
              </div>
              <div>
                <label>Location:</label>
                <input type="text" name="location" value={formData.location} onChange={handleInputChange} />
              </div>
              <div>
                <label>Item Name:</label>
                <input type="text" name="item_name" value={formData.item_name} onChange={handleInputChange} />
              </div>
              <div>
                <label>Payment For:</label>
                <input type="text" name="payment_for" value={formData.payment_for} onChange={handleInputChange} />
              </div>
              <div>
                <label>Payment Status:</label>
                <input type="text" name="payment_status" value={formData.payment_status} onChange={handleInputChange} />
              </div>
              <button type="submit">Submit</button>
              <button type="button" onClick={() => setModalOpen(false)}>Close</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
