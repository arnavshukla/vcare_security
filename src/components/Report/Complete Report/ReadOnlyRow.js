import React from "react";
import { useState } from "react";
import ErrorManageComponent from "../../ErrorManageComponent";
import LoaderContent from "../../LoaderContent";

const ReadOnlyRow = ({ tableContent, displayContent, editEnabled, handleEditClick }) => {

    const [mainError, setMainError] = useState();
    const [isContentLoading, setIsContentLoading] = useState();

    if (isContentLoading) {
        return <LoaderContent />
    }

    if (mainError) {
        return <ErrorManageComponent />
    }

    return (
        <tr style={{ cursor: 'pointer' }} onClick={() => displayContent(tableContent.jobId).catch(function (error) {
            setIsContentLoading(false)
            setMainError(error)
        })}>
            <td data-label="Service Date">{tableContent.serviceDate}</td>
            <td data-label="Issue Detail">{tableContent.issueDetail}</td>
            <td data-label="Work Status">{tableContent.workStatus}</td>
            <td data-label="Completion Date">{tableContent.completionDate}</td>
            <td data-label="Book Challan No">{tableContent.bookChallanNo}</td>
            <td data-label="Marg Challan No">{tableContent.margChallanNo}</td>
            <td data-label="Bill Num">{tableContent.billNum}</td>
            <td data-label="Total Payment">{tableContent.totalPayment}</td>
            <td data-label="Balance Payment">{tableContent.balancePayment}</td>
            <td data-label="Payment Recieved">{tableContent.paymentRecieved}</td>
            <td data-label="Payment Status">{tableContent.paymentStatus}</td>
            <td data-label="Payment Reminder">{tableContent.paymentReminder}</td>
            <td data-label="Call Type Name">{tableContent.callTypeName}</td>
            <td data-label="Category Type Name">{tableContent.categoryTypeName}</td>
            <td data-label="Emp Name">{tableContent.empName}</td>
            <td data-label="Client Name">{tableContent.clientName}</td>
            <td data-label="Job Id">{tableContent.jobId}</td>
            {editEnabled ?
                <td data-label="Actions">
                    <button style={{ borderColor: 'whitesmoke', padding: '5px' }}
                        type="button"
                        onClick={(event) => handleEditClick(event, tableContent)}
                    >
                        Edit
                    </button>
                </td> : null}
        </tr>
    );
};

export default ReadOnlyRow;
