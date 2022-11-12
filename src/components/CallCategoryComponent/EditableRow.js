import React from "react";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td data-label="Call Type">
        <input
          type="text"
          required="required"
          placeholder="Enter a Call Type..."
          name="callType"
          value={editFormData.callType}
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
