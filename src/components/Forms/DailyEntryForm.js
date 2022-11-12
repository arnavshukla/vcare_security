import React, { useEffect, useState } from 'react';
import baseURL from '../../baseURL';
import './DailyEntryForm.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loader from "../Loader";
import Cookies from 'js-cookie';
import LoaderContent from '../LoaderContent';
import ErrorManageComponent from '../ErrorManageComponent';

export default function DailyEntryForm() {

    const [dailyEntryData, setDailyEntryData] = useState({
        callTypeId: '',
        categoryType: '',
        employeeId: '',
        clientId: '',
        serviceDate: '',
        issueDetail: '',
        workStatus: '',
        completionDate: '',
        bookChallanNo: '',
        margChallanNo: '',
        billNum: '',
        totalPayment: '',
        balancePayment: '',
        paymentRecieved: '',
        paymentStatus: '',
        paymentReminder: ''
    });

    const [categoryList, setCategoryList] = useState();
    const [callTypeList, setCallTypeList] = useState();
    const [clientList, setClientList] = useState();
    const [employeeList, setEmployeeList] = useState();
    const [serviceDateNew, setServiceDateNew] = useState();
    const [completionDateNew, setCompletionDateNew] = useState();
    const [reminderDateNew, setReminderDateNew] = useState();
    const [isLoading, setIsLoading] = useState();
    const [isContentLoading, setIsContentLoading] = useState();
    const [mainError, setMainError] = useState();

    function convertDate(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear()].join("-");
    }

    const handleDataRole = (event) => {
        setDailyEntryData({ ...dailyEntryData, [event.target.name]: event.target.value });
    }

    const handlePaymentStatus = (event) => {
        if (parseInt(dailyEntryData.totalPayment) === parseInt(event.target.value)) {
            setDailyEntryData({ ...dailyEntryData, paymentStatus: "clear", [event.target.name]: event.target.value });
        }
        if (parseInt(dailyEntryData.totalPayment) > parseInt(event.target.value)) {
            setDailyEntryData({ ...dailyEntryData, paymentStatus: "pending", [event.target.name]: event.target.value });
        }
        if (parseInt(dailyEntryData.totalPayment) < parseInt(event.target.value)) {
            setDailyEntryData({ ...dailyEntryData, paymentStatus: "advance", [event.target.name]: event.target.value });
        }
    }

    const handleServiceDate = (date) => {
        setServiceDateNew(date);
        setDailyEntryData({ ...dailyEntryData, serviceDate: convertDate(date) });
    }

    const handleCompletionDate = (date) => {
        setCompletionDateNew(date);
        setDailyEntryData({ ...dailyEntryData, completionDate: convertDate(date) });
    }

    const handlePaymentReminderDate = (date) => {
        setReminderDateNew(date);
        setDailyEntryData({ ...dailyEntryData, paymentReminder: convertDate(date) });
    }

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            const data = await fetch(`${baseURL}/api/entry/get`, {
                credentials: "include",
                headers: {
                    token: Cookies.get('token'),
                }
            });
            const json = await data.json();
            setCategoryList(json.categoryList);
            setCallTypeList(json.callTypeList);
            setClientList(json.clientList);
            setEmployeeList(json.employeeList);
            setIsLoading(false);
        }
        fetchData()
            .catch(function (error) {
                setIsLoading(false)
                setMainError(error)
            });
    }, [])

    const handleDailyEntryData = (event) => {
        event.preventDefault();
        setIsContentLoading(true);
        fetch(`${baseURL}/api/entry/save`, {
            method: "POST",
            body: JSON.stringify(dailyEntryData),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                token: Cookies.get('token'),
            }
        }).then(response => response.json())
            .then(json => {
                if (json.responseMessage) {
                    alert(json.responseMessage);
                    setIsContentLoading(false);
                }
                else {
                    setIsContentLoading(false);
                    alert(json.responseMessage);
                }
            },
            err => {
                setIsLoading(false);
                setMainError(err)
            });
        setDailyEntryData({
            callTypeId: '',
            categoryType: '',
            employeeId: '',
            clientId: '',
            serviceDate: '',
            issueDetail: '',
            workStatus: '',
            completionDate: '',
            bookChallanNo: '',
            margChallanNo: '',
            billNum: '',
            totalPayment: '',
            balancePayment: '',
            paymentRecieved: '',
            paymentStatus: '',
            paymentReminder: ''
        })
    }

    if (isLoading) {
        return <Loader />
    }

    if (isContentLoading) {
        return <LoaderContent />
    }

    if (mainError) {
        return <ErrorManageComponent />
    }

    return (
        <div className="wrapper">
            <div className="title">
                Daily Entry Form
            </div>
            <form onSubmit={handleDailyEntryData}>
                <div className="form">
                    <div className="inputfield" style={{ fontSize: '13px' }} >
                        <label>Service Date</label>
                        <DatePicker selected={serviceDateNew} minDate={new Date()} name="serviceDate" value={serviceDateNew} onChange={(date) => handleServiceDate(date)} />
                    </div>
                    <div className="inputfield">
                        <label>Type of Category</label>
                        <div className="custom_select">
                            <select required="required" name="categoryType" value={dailyEntryData.categoryType} onChange={handleDataRole}>
                                <option value="">Select</option>
                                {categoryList && categoryList.map((content, index) =>
                                    <option key={index} value={content.id}>{content.name}</option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="inputfield">
                        <label>Type of Call</label>
                        <div className="custom_select">
                            <select required="required" name="callTypeId" value={dailyEntryData.callTypeId} onChange={handleDataRole}>
                                <option value="">Select</option>
                                {callTypeList && callTypeList.map((content, index) =>
                                    <option key={index} value={content.id}>{content.name}</option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="inputfield">
                        <label>Issue Detail</label>
                        <input type="text" name="issueDetail" className="input" value={dailyEntryData.issueDetail} onChange={handleDataRole} />
                    </div>
                    <div className="inputfield">
                        <label>Work Status</label>
                        <div className="custom_select">
                            <select required="required" name="workStatus" value={dailyEntryData.workStatus} onChange={handleDataRole}>
                                <option value="">Select</option>
                                <option value="assigned">Assigned</option>
                                <option value="notassigned">Not Assigned</option>
                                <option value="inprogress">Inprogress</option>
                                <option value="pending">Pending</option>
                                <option value="complete">Complete</option>
                            </select>
                        </div>
                    </div>
                    <div className="inputfield">
                        <label>Client Name</label>
                        <div className="custom_select">
                            <select required="required" name="clientId" value={dailyEntryData.clientId} onChange={handleDataRole}>
                                <option value="">Select</option>
                                {clientList && clientList.map((content, index) =>
                                    <option key={index} value={content.id}>{content.name}</option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="inputfield">
                        <label>Engineer Assign Name</label>
                        <div className="custom_select">
                            <select required="required" name="employeeId" value={dailyEntryData.employeeId} onChange={handleDataRole}>
                                <option value="">Select</option>
                                {employeeList && employeeList.map((content, index) =>
                                    <option key={index} value={content.id}>{content.name}</option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="inputfield" style={{ fontSize: '13px' }}>
                        <label>Completion Date</label>
                        <DatePicker selected={completionDateNew} minDate={serviceDateNew} name="completionDate" value={completionDateNew} onChange={(date) => handleCompletionDate(date)} />
                    </div>
                    <div className="inputfield">
                        <label>Book Challan Number</label>
                        <input type="text" className="input" name="bookChallanNo" value={dailyEntryData.bookChallanNo} onChange={handleDataRole} />
                    </div>
                    <div className="inputfield">
                        <label>Marg Challan Number</label>
                        <input type="text" className="input" name="margChallanNo" value={dailyEntryData.margChallanNo} onChange={handleDataRole} />
                    </div>
                    <div className="inputfield">
                        <label>Bill Number/Stock Issue Number</label>
                        <input type="text" className="input" name="billNum" value={dailyEntryData.billNum} onChange={handleDataRole} />
                    </div>
                    <div className="inputfield">
                        <label>Total Payment</label>
                        <input type="number" className="input" name="totalPayment" value={dailyEntryData.totalPayment} onChange={handleDataRole} />
                    </div>
                    <div className="inputfield">
                        <label>Payment Received</label>
                        <input type="number" className="input" name="paymentRecieved" value={dailyEntryData.paymentRecieved} onChange={handlePaymentStatus} />
                    </div>
                    <div className="inputfield">
                        <label>Balance Payment</label>
                        <input type="number" className="input" name="balancePayment" value={dailyEntryData.totalPayment - dailyEntryData.paymentRecieved} readOnly />
                    </div>
                    <div className="inputfield">
                        <label>Payment Status</label>
                        <input type="text" className="input" name="paymentStatus" value={dailyEntryData.paymentStatus} readOnly />
                    </div>
                    <div className="inputfield" style={{ fontSize: '13px' }}>
                        <label>Next Payment Date Reminder</label>
                        <DatePicker selected={reminderDateNew} minDate={new Date()} name="paymentReminder" value={reminderDateNew} onChange={(date) => handlePaymentReminderDate(date)} />
                    </div>
                    <div className="inputfield">
                        <input type="submit" value="Submit" className="btn" />
                    </div>
                </div>
            </form>
        </div>
    )
}
