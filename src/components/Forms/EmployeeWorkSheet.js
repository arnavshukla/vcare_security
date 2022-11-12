import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import baseURL from '../../baseURL';
import ErrorManageComponent from '../ErrorManageComponent';
import Loader from "../Loader";

export default function EmployeeWorkSheet({ name }) {

    const [employeeWorkData, setEmployeeWorkData] = useState({
        updateDate: '',
        jobId: 0,
        employeeId: '',
        clientId: '',
        bookChallanNo: '',
        itemUsed: '',
        itemReturned: '',
        workStatus: '',
        engineerStatus: '',
        paymentUpdate: ''
    });

    const [serviceDateNew, setServiceDateNew] = useState();
    const [userName] = useState({
        employeeName: name
    });
    const [jobID, setJobID] = useState(null);
    const [workData, setWorkData] = useState();
    const [selectedJobID, setSelectedJobID] = useState(null);
    const [Message, setMessage] = useState('');
    const [status, setStatus] = useState('');
    const [isLoading, setIsLoading] = useState();
    const [mainError, setMainError] = useState();

    function convertDate(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear()].join("-");
    }

    const handleJobId = (event) => {
        setSelectedJobID(event.target.value)
        setEmployeeWorkData({ ...employeeWorkData, jobId: event.target.value });
    }

    const handleDataRole = (event) => {
        setEmployeeWorkData({ ...employeeWorkData, [event.target.name]: event.target.value });
    }

    const handleServiceDate = (date) => {
        setServiceDateNew(date);
        setEmployeeWorkData({ ...employeeWorkData, updateDate: convertDate(date) });
    }

    useEffect(() => {
        setIsLoading(true);
        const getDevices = async () => {
            const fetchResponse = await fetch(`${baseURL}/api/employeedata/get`, {
                method: 'POST',
                body: JSON.stringify(userName),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    token: Cookies.get('token'),
                }
            });
            const data = await fetchResponse.json();
            setJobID(Object.keys(data.employeeDataList));
            setWorkData(data.employeeDataList);
            setIsLoading(false);
        }
        getDevices()
            .catch(function (error) {
                setIsLoading(false)
                setMainError(error)
            });
    }, [userName])

    const handleDailyEntryData = (event) => {
        event.preventDefault();
        fetch(`${baseURL}/api/employeedata/save`, {
            method: "POST",
            body: JSON.stringify(employeeWorkData),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                token: Cookies.get('token'),
            }
        }).then(response => response.json())
            .then(json => {
                if (json.responseMessage) {
                    setMessage(json.responseMessage);
                    setStatus(json.httpStatus);
                }
                else {
                    setMessage(json.responseMessage);
                }
            },
            err => {
                setIsLoading(false);
                setMainError(err)
            });
    }

    if (isLoading) {
        return <Loader />
    }

    if (mainError) {
        return <ErrorManageComponent />
    }

    return (
        <div className="wrapper">
            <div className="title">
                Employee Work Sheet
            </div>
            <div className="form">
                <div className="inputfield">
                    <label>Select Job ID</label>
                    <div className="custom_select">
                        <select required="required" name="jobID" value={selectedJobID} onChange={handleJobId}>
                            <option value="">Select</option>
                            {jobID && jobID.map((content, index) =>
                                <option key={index} value={content}>{content}</option>
                            )}
                        </select>
                    </div>
                </div>
            </div>

            {selectedJobID &&
                <form onSubmit={handleDailyEntryData}>
                    <div className="form">
                        <div className="inputfield">
                            <label>Update for which date</label>
                            <DatePicker selected={serviceDateNew} minDate={new Date()} name="updateDate" value={serviceDateNew} onChange={(date) => handleServiceDate(date)} />
                        </div>
                        <div className="inputfield">
                            <label>Engineer Name</label>
                            <div className="custom_select">
                                <select required="required" name="employeeId" value={employeeWorkData.employeeId} onChange={handleDataRole}>
                                    <option value="">Select</option>
                                    <option value={workData[selectedJobID].employeeId}>{workData[selectedJobID].employeeName}</option>
                                </select>
                            </div>
                        </div>
                        <div className="inputfield">
                            <label>Book Challan Number</label>
                            <input type="text" className="input" name="bookChallanNo" value={employeeWorkData.bookChallanNo} onChange={handleDataRole} />
                        </div>
                        <div className="inputfield">
                            <label>Item used from Challan</label>
                            <textarea className="textarea" name="itemUsed" value={employeeWorkData.itemUsed} onChange={handleDataRole} />
                        </div>
                        <div className="inputfield">
                            <label>Item Return to office from Challan</label>
                            <textarea className="textarea" name="itemReturned" value={employeeWorkData.itemReturned} onChange={handleDataRole} />
                        </div>
                        <div className="inputfield">
                            <label>Client Name</label>
                            <div className="custom_select">
                                <select required="required" name="clientId" value={employeeWorkData.clientId} onChange={handleDataRole}>
                                    <option value="">Select</option>
                                    <option value={workData[selectedJobID].clientId}>{workData[selectedJobID].clientName}</option>
                                </select>
                            </div>
                        </div>
                        <div className="inputfield">
                            <label>Work Status</label>
                            <textarea className="textarea" name="workStatus" value={employeeWorkData.workStatus} onChange={handleDataRole} />
                        </div>
                        <div className="inputfield">
                            <label>Work Status from Engineer</label>
                            <div className="custom_select">
                                <select required="required" name="engineerStatus" value={employeeWorkData.engineerStatus} onChange={handleDataRole}>
                                    <option value="">Select</option>
                                    <option value="inprogress">Inprogress</option>
                                    <option value="pending">Pending</option>
                                    <option value="complete">Complete</option>
                                </select>
                            </div>
                        </div>
                        <div className="inputfield">
                            <label>Payment Update</label>
                            <input type="text" className="input" name="paymentUpdate" value={employeeWorkData.paymentUpdate} onChange={handleDataRole} />
                        </div>
                        <div className="inputfield">
                            <input type="submit" value="Submit" className="btn" />
                        </div>
                    </div>
                </form>
            }
            <div className={`${status === 'OK' ? "Message" : "errorMessage"}`}>{Message}</div>
        </div>
    )
}
