import React from "react";
import '../../App.css'

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick, editEnabled, role }) => {
  return (
    <tr>
      <td data-label="Name">{contact.name}</td>
      <td data-label="Address">{contact.address}</td>
      <td data-label="Phone Number">{contact.mobile}</td>
      <td data-label="Email">{contact.email}</td>
      <td data-label="PAN">{contact.pan}</td>
      <td data-label="Aadhar Number">{contact.aadhar}</td>
      <td data-label="Father Name">{contact.fatherName}</td>
      <td data-label="Password"><div className="hidetext">{contact.password}</div></td>
      <td data-label="User Type">{contact.role}</td>
      {editEnabled ?
        <td data-label="Actions">
          <button style={{ borderColor: 'whitesmoke', padding: '5px' }}
            type="button"
            onClick={(event) => handleEditClick(event, contact)}
          >
            Edit
          </button>
          {role === 'admin' ?
            <button style={{ borderColor: 'whitesmoke', padding: '5px' }}
              type="button" onClick={() => handleDeleteClick(contact.id)}>
              Delete
            </button>
            : null}
        </td> : ""}
    </tr>
  );
};

export default ReadOnlyRow;
