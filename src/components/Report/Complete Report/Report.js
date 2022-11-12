import React, { Fragment, useEffect, useState } from 'react'
import baseURL from '../../../baseURL';
import ReadOnlyRow from './ReadOnlyRow';
import ReadOnlyRowJob from './ReadOnlyRowJob';
import { Pagination } from 'react-bootstrap';
import './Pagination.css';
import Loader from "../../Loader";
import LoaderContent from '../../LoaderContent';
import Cookies from 'js-cookie';
import ErrorManageComponent from '../../ErrorManageComponent';
import EditableRow from './EditableRow';

export default function Report({ flag, setFlag, editEnabled }) {

    const [tableHeaders, setTableHeaders] = useState();
    const [jobTableHeaders, setJobTableHeaders] = useState();
    const [tableData, setTableData] = useState();
    const [jobData, setJobData] = useState();
    const [pageCount, setPageCount] = useState();
    const [startpage, setStartPage] = useState(1);
    const [endpage, setEndPage] = useState();
    const [activePage, setActivePage] = useState();
    const [isLoading, setIsLoading] = useState();
    const [isContentLoading, setIsContentLoading] = useState();
    const [contentFlag, setContentFlag] = useState(false);
    const [mainError, setMainError] = useState();

    const [editFormData, setEditFormData] = useState({
        serviceDate: "",
        issueDetail: "",
        workStatus: "",
        completionDate: "",
        bookChallanNo: "",
        margChallanNo: "",
        billNum: "",
        totalPayment: "",
        balancePayment: "",
        paymentRecieved: "",
        paymentStatus: "",
        paymentReminder: "",
        callTypeName: "",
        categoryTypeName: "",
        empName: "",
        clientName: "",
        jobId: "",
    });

    const [editContactId, setEditContactId] = useState(null);
    const [editCallTypeId, setEditCallTypeId] = useState(null);
    const [editCategoryType, setEditCategoryType] = useState(null);
    const [editEmployeeId, setEditEmployeeId] = useState(null);
    const [editClientId, setEditClientId] = useState(null);

    function convertDate(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear()].join("-");
    }

    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    };

    const handleServiceDate = (date) => {
        setEditFormData({ ...editFormData, serviceDate: convertDate(date) });
    }
    
    const handleCompletionDate = (date) => {
        setEditFormData({ ...editFormData, completionDate: convertDate(date) });
    }

    const handlePaymentReminderDate = (date) => {
        setEditFormData({ ...editFormData, paymentReminder: convertDate(date) });
    }

    const handleEditClick = (event, tableContent) => {
        event.preventDefault();
        setEditContactId(tableContent.id);
        setEditCallTypeId(tableContent.callTypeId)
        setEditCategoryType(tableContent.categoryType)
        setEditEmployeeId(tableContent.employeeId)
        setEditClientId(tableContent.clientId)

        const formValues = {
            serviceDate: tableContent.serviceDate,
            issueDetail: tableContent.issueDetail,
            workStatus: tableContent.workStatus,
            completionDate: tableContent.completionDate,
            bookChallanNo: tableContent.bookChallanNo,
            margChallanNo: tableContent.margChallanNo,
            billNum: tableContent.billNum,
            totalPayment: tableContent.totalPayment,
            balancePayment: tableContent.balancePayment,
            paymentRecieved: tableContent.paymentRecieved,
            paymentStatus: tableContent.paymentStatus,
            paymentReminder: tableContent.paymentReminder,
            callTypeName: tableContent.callTypeName,
            categoryTypeName: tableContent.categoryTypeName,
            empName: tableContent.empName,
            clientName: tableContent.clientName,
            jobId: tableContent.jobId,
        };

        setEditFormData(formValues);
    };

    const handleCancelClick = () => {
        setEditContactId(null);
    };

    const handleEditFormSubmit = (event) => {
        event.preventDefault();
        const editedContact = {
            id: editContactId,
            callTypeId: editCallTypeId,
            categoryType: editCategoryType,
            employeeId: editEmployeeId,
            clientId: editClientId,
            serviceDate: editFormData.serviceDate,
            issueDetail: editFormData.issueDetail,
            workStatus: editFormData.workStatus,
            completionDate: editFormData.completionDate,
            bookChallanNo: editFormData.bookChallanNo,
            margChallanNo: editFormData.margChallanNo,
            billNum: editFormData.billNum,
            totalPayment: editFormData.totalPayment,
            balancePayment: editFormData.balancePayment,
            paymentRecieved: editFormData.paymentRecieved,
            paymentStatus: editFormData.paymentStatus,
            paymentReminder: editFormData.paymentReminder,
            callTypeName: editFormData.callTypeName,
            categoryTypeName: editFormData.categoryTypeName,
            empName: editFormData.empName,
            clientName: editFormData.clientName,
            jobId: editFormData.jobId,
        };

        const newTableData = [...tableData];

        const index = tableData.findIndex((contact) => contact.id === editContactId);

        fetch(`${baseURL}/api/entry/edit`, {
            method: "POST",
            body: JSON.stringify(editedContact),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                token: Cookies.get('token')
            }
        }).then(response => response.json()).then(json => {
            if (json.responseMessage === 'success') {
                newTableData[index] = editedContact;
                setTableData(newTableData);
                setEditContactId(null);
            }
        },
            err => {
                setIsLoading(false);
                setMainError(err)
            })

    };

    let items = [];
    for (let number = startpage; number <= (endpage); number++) {
        items.push(
            <Pagination.Item key={number} active={number === activePage}>
                {number}
            </Pagination.Item>,
        );
    }

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            const data = await fetch(`${baseURL}/api/entry/get/data/1`, {
                method: "GET",
                headers: {
                    token: Cookies.get('token'),
                }
            });
            const json = await data.json();
            setTableHeaders(Object.keys(json.entryDataList[0]).splice(5, 17));
            setTableData(json.entryDataList);
            setPageCount(json.pageCount);
            setEndPage(pageCount > 5 ? 5 : pageCount);
            setIsLoading(false);
        }
        fetchData()
            .catch(function (error) {
                setIsLoading(false);
                setMainError(error)
            });
    }, [pageCount])

    const prevPageCalculation = () => {
        if (pageCount - endpage < 4) {
            setStartPage(startpage - 5);
            setEndPage(startpage - 1)
        }
        else {
            setStartPage(startpage - 5);
            setEndPage(endpage - 5)
        }
    }

    const nextPageCalculation = () => {
        if (pageCount - endpage > 5) {
            setStartPage(startpage + 5);
            setEndPage(endpage + 5)
        }
        else if (pageCount - endpage < 5) {
            setStartPage(startpage + 5);
            setEndPage(pageCount)
        }

    }

    const nextPageData = async (pageNo) => {
        setActivePage(parseInt(pageNo.key));
        const data = await fetch(`${baseURL}/api/entry/get/data/${pageNo.key}`, {
            method: "GET",
            credentials: "include",
            headers: {
                token: Cookies.get('token'),
            }
        });
        const json = await data.json();
        if (!json.entryDataList.length) return setContentFlag(true);
        setTableHeaders(Object.keys(json.entryDataList[0]).splice(5, 17));
        setTableData(json.entryDataList);
        setPageCount(json.pageCount);
    }

    const displayContent = async (jobId) => {
        // setIsContentLoading(true);
        const data = await fetch(`${baseURL}/api/employeedata/get/${jobId}`, {
            method: "GET",
            credentials: "include",
            headers: {
                token: Cookies.get('token'),
            }
        });
        const json = await data.json();
        setJobData(json.dataForJobId);
        if (json.dataForJobId[0]) {
            setJobTableHeaders(Object.keys(json.dataForJobId[0]));
            setIsContentLoading(false)
        }

        else {
            setJobTableHeaders();
            setFlag(false);
            setIsContentLoading(false)
        }
    }

    if (contentFlag) {
        return (
            <div style={{ paddingTop: '10px' }}>
                <div style={{ color: 'white', fontWeight: 'bold', paddingBottom: '10px' }}>Base Entry Form</div><br />
                <center style={{ color: 'white', fontWeight: 'bold' }}>No Data Found</center>
            </div>
        )
    }

    if (isLoading) {
        return <Loader />
    }

    if (isContentLoading) {
        return <LoaderContent />
    }

    if (mainError) {
        return <ErrorManageComponent/>
    }

    return (
        <div style={{ paddingTop: '10px' }}>
            <div style={{ color: 'white', fontWeight: 'bold', paddingBottom: '10px' }}>Base Entry Form</div>
            <form onSubmit={handleEditFormSubmit}>
                <table className="tableReport">
                    <thead>
                        <tr>
                            {tableHeaders && tableHeaders.map((content, key) => {
                                const result = content.replace(/([A-Z])/g, " $1");
                                const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
                                return <th key={key}>{finalResult}</th>
                            }
                            )}
                            {editEnabled ? <th>Action</th> : ""}
                        </tr>
                    </thead>

                    <tbody>
                        {tableData && tableData.map((tableContent, index) => (
                            <Fragment key={index}>
                                {editContactId === tableContent.id ? (
                                    <EditableRow
                                        editFormData={editFormData}
                                        handleEditFormChange={handleEditFormChange}
                                        handleCancelClick={handleCancelClick}
                                        handleServiceDate={handleServiceDate}
                                        handleCompletionDate={handleCompletionDate}
                                        handlePaymentReminderDate={handlePaymentReminderDate}
                                    />
                                ) : (
                                    <ReadOnlyRow 
                                        tableContent={tableContent} 
                                        displayContent={displayContent} 
                                        editEnabled={editEnabled}
                                        handleEditClick={handleEditClick}
                                    />
                                )}
                            </Fragment>
                        ))}
                    </tbody>
                </table>
            </form><br/>

            <div>
                <Pagination>
                    <Pagination size="sm">
                        <Pagination.Item disabled={startpage === 1 ? true : false} onClick={prevPageCalculation}>{'Prev'}</Pagination.Item>
                    </Pagination>
                    {items.map((pageNo, index) =>
                        <Pagination key={index} value={pageNo} size="sm" onClick={() => nextPageData(pageNo)}>{pageNo}</Pagination>
                    )}
                    <Pagination size="sm">
                        <Pagination.Item disabled={pageCount === endpage || pageCount < 5 ? true : false} onClick={nextPageCalculation}>{'Next'}</Pagination.Item>
                    </Pagination>
                </Pagination>
            </div><br />

            {jobTableHeaders ?
                <>
                    <div style={{ color: 'white', fontWeight: 'bold', paddingBottom: '10px', paddingTop: '30px' }}>Engineer Update</div>
                    <table className="tableReport">
                        <thead>
                            <tr>
                                {jobTableHeaders && jobTableHeaders.map((content, key) => {
                                    const result = content.replace(/([A-Z])/g, " $1");
                                    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
                                    return <th key={key}>{finalResult}</th>
                                }
                                )}
                            </tr>
                        </thead>

                        <tbody>
                            {jobData && jobData.map((tableContent, index) => (
                                <Fragment key={index}>
                                    <ReadOnlyRowJob tableContent={tableContent} />
                                </Fragment>
                            ))}
                        </tbody>
                    </table>
                </> :
                (flag ?
                    null :
                    <>
                        <div style={{ color: 'white', fontWeight: 'bold', paddingBottom: '10px', paddingTop: '30px' }}>Engineer Update</div><br />
                        <center style={{ color: 'white', fontWeight: 'bold' }}>No Data Found</center>
                    </>
                )
            }
        </div>
    )
}
