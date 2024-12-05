import React from "react";

const AddExpenseModal = ({
  modalOpen,
  setModalOpen,
  formData,
  handleInputChange,
  handleFileChange,
  handleFormSubmit,
}) => {
  if (!modalOpen) return null;

  return (
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
  );
};

export default AddExpenseModal;
