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
                    required="required"
                    placeholder="Enter an email..."
                    name="email"
                    value={editFormData.email}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td data-label="PAN">
                <input
                    type="text"
                    required="required"
                    placeholder="Enter your PAN..."
                    name="pan"
                    value={editFormData.pan}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td data-label="Aadhar Number">
                <input
                    type="number"
                    required="required"
                    placeholder="Enter your Aadhar Number..."
                    name="aadhar"
                    value={editFormData.aadhar}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td data-label="Father Name">
                <input
                    type="text"
                    required="required"
                    placeholder="Enter your father's name..."
                    name="fatherName"
                    value={editFormData.fatherName}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td data-label="Password">
                <input
                    type="password"
                    required="required"
                    placeholder="Enter your password..."
                    name="password"
                    value={editFormData.password}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td data-label="User Type">
                <input
                    type="text"
                    required="required"
                    readOnly
                    name="role"
                    value={editFormData.role}
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
