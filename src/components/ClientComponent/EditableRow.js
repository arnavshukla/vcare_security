import React from "react";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td data-label="Name">
        <input
          type="text"
          required="required"
          placeholder="Enter a name..."
          name="name"
          value={editFormData.name}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td data-label="Address">
        <input
          type="text"
          required="required"
          placeholder="Enter an address..."
          name="address"
          value={editFormData.address}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td data-label="Phone Number">
        <input
          type="number"
          required="required"
          placeholder="Enter a phone number..."
          name="mobile"
          value={editFormData.mobile}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td data-label="Email">
        <input
          type="email"
          placeholder="Enter an email..."
          name="email"
          value={editFormData.email}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td data-label="Actions">
        <button style={{borderColor: 'whitesmoke', padding: '5px'}} type="submit">Save</button>
        <button style={{borderColor: 'whitesmoke', padding: '5px'}} type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;
