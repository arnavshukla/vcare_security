import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditableRow = ({
    editFormData,
    handleEditFormChange,
    handleCancelClick,
    handleServiceDate,
    handleCompletionDate,
    handlePaymentReminderDate
}) => {
    return (
        <tr>
            <td data-label="serviceDate">
                <DatePicker minDate={new Date()} name="serviceDate" value={editFormData.serviceDate} onChange={(date) => handleServiceDate(date)} />
            </td>
            <td data-label="issueDetail">
                <input
                    type="text"
                    required="required"
                    name="issueDetail"
                    value={editFormData.issueDetail}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td data-label="workStatus">
                <input
                    type="text"
                    required="required"
                    name="workStatus"
                    value={editFormData.workStatus}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td data-label="completionDate">
                <DatePicker minDate={new Date()} name="completionDate" value={editFormData.completionDate} onChange={(date) => handleCompletionDate(date)} />
            </td>
            <td data-label="bookChallanNo">
                <input
                    type="number"
                    required="required"
                    name="bookChallanNo"
                    value={editFormData.bookChallanNo}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td data-label="margChallanNo">
                <input
                    type="number"
                    required="required"
                    name="margChallanNo"
                    value={editFormData.margChallanNo}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td data-label="billNum">
                <input
                    type="number"
                    required="required"
                    name="billNum"
                    value={editFormData.billNum}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td data-label="totalPayment">
                <input
                    type="number"
                    required="required"
                    name="totalPayment"
                    value={editFormData.totalPayment}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td data-label="balancePayment">
                <input
                    type="number"
                    required="required"
                    name="balancePayment"
                    value={editFormData.balancePayment}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td data-label="paymentRecieved">
                <input
                    type="number"
                    required="required"
                    name="paymentRecieved"
                    value={editFormData.paymentRecieved}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td data-label="paymentStatus">
                <input
                    type="text"
                    required="required"
                    name="paymentStatus"
                    value={editFormData.paymentStatus}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td data-label="paymentReminder">
                <DatePicker minDate={new Date()} name="paymentReminder" value={editFormData.paymentReminder} onChange={(date) => handlePaymentReminderDate(date)} />
            </td>
            <td data-label="callTypeName">
                <input
                    type="text"
                    required="required"
                    name="callTypeName"
                    value={editFormData.callTypeName}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td data-label="categoryTypeName">
                <input
                    type="text"
                    required="required"
                    name="categoryTypeName"
                    value={editFormData.categoryTypeName}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td data-label="empName">
                <input
                    type="text"
                    required="required"
                    name="empName"
                    value={editFormData.empName}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td data-label="clientName">
                <input
                    type="text"
                    required="required"
                    name="clientName"
                    value={editFormData.clientName}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td data-label="jobId">
                <input
                    type="number"
                    required="required"
                    name="jobId"
                    value={editFormData.jobId}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td data-label="Actions">
                <button style={{ borderColor: 'whitesmoke', padding: '5px' }} type="submit">Save</button>
                <button style={{ borderColor: 'whitesmoke', padding: '5px' }} type="button" onClick={handleCancelClick}>
                    Cancel
                </button>
            </td>
        </tr>
    );
};

export default EditableRow;
