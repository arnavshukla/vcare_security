import React from "react";

const ReadOnlyRowJob = ({ tableContent }) => {
    return (
        <tr>
            <td data-label="Update Date">{tableContent.updateDate}</td>
            <td data-label="Book Challan No">{tableContent.bookChallanNo}</td>
            <td data-label="Item Used">{tableContent.itemUsed}</td>
            <td data-label="Item Returned">{tableContent.itemReturned}</td>
            <td data-label="Work Status">{tableContent.workStatus}</td>
            <td data-label="Engineer Status">{tableContent.engineerStatus}</td>
            <td data-label="Payment Update">{tableContent.paymentUpdate}</td>
            <td data-label="Engineer Name">{tableContent.engineerName}</td>
        </tr>
    );
};

export default ReadOnlyRowJob;
