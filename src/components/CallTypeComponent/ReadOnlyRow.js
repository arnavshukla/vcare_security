import React from "react";

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick, editEnabled, role }) => {
  return (
    <tr>
      <td data-label="Call Type">{contact.callType}</td>
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
        </td> : null}
    </tr>
  );
};

export default ReadOnlyRow;
