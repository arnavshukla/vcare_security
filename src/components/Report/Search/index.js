import Cookies from 'js-cookie';
import React, { Fragment, useEffect, useState } from 'react'
import { Pagination } from 'react-bootstrap';
import baseURL from '../../../baseURL';
import ReadOnlyRow from '../Complete Report/ReadOnlyRow';
import ReadOnlyRowJob from '../Complete Report/ReadOnlyRowJob';
import Loader from '../../Loader';
import './Search.css';
import '../Complete Report/Pagination.css';
import LoaderContent from '../../LoaderContent';
import ErrorManageComponent from '../../ErrorManageComponent';

export default function Search({ flag, setFlag }) {

    const [filterArray] = useState([
        "employeeName",
        "clientName",
        "workStatus",
        "jobId"
    ])
    const [filterAmendArray, setFilterAmendArray] = useState(filterArray);
    const [filters, setFilters] = useState([]);
    const [tableHeaders, setTableHeaders] = useState();
    const [tableData, setTableData] = useState();
    const [page, setPage] = useState(1);
    const [submitData, setSubmitData] = useState(false)
    const [searchData, setSearchData] = useState({
        employeeName: '',
        clientName: '',
        workStatus: '',
        jobId: ''
    })
    const [jobTableHeaders, setJobTableHeaders] = useState();
    const [jobData, setJobData] = useState();
    const [headingFlag, setHeadingFlag] = useState(flag);
    const [contentFlag, setContentFlag] = useState(false);
    const [paginationFlag, setPaginationFlag] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isContentLoading, setIsContentLoading] = useState(false);
    const [mainError, setMainError] = useState();

    useEffect(() => {
        setIsLoading(true)
        setTimeout(() => setIsLoading(false), 1500);
    }, [])

    const addFilter = (event) => {
        event.preventDefault();
        setFilterAmendArray(filterAmendArray.filter(item => item !== event.target.value))
        if (event.target.value && !(filters.includes(event.target.value)))
            setFilters(filters.concat(event.target.value))
        if (filters.length + 1)
            setSubmitData(true);
        event.target.value = <option value="">Select</option>
    }

    const handleFilter = (event) => {
        setSearchData({ ...searchData, [event.target.name]: event.target.value });
    }

    const removeFilter = (key) => {
        setFilters(filters => filters.filter((item, index) => key !== index));
        let excludedFilter = filters.filter((item, index) => key === index).toString();
        setFilterAmendArray([...filterAmendArray, excludedFilter])
        if (excludedFilter === 'employeeName')
            setSearchData({ ...searchData, employeeName: "" })
        if (excludedFilter === 'clientName')
            setSearchData({ ...searchData, clientName: "" })
        if (excludedFilter === 'workStatus')
            setSearchData({ ...searchData, workStatus: "" })
        if (excludedFilter === 'jobId')
            setSearchData({ ...searchData, jobId: "" })
        if (filters.length === 1) return setSubmitData(false);
    }

    const submitSearchData = (event) => {
        event.preventDefault();
        setIsContentLoading(true);
        fetch(`${baseURL}/api/entry/search/${page}`, {
            method: "POST",
            body: JSON.stringify(searchData),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                token: Cookies.get('token'),
            }
        }).then(response => response.json())
            .then(json => {
                if (!json.entryDataList.length) return setContentFlag(true);
                setTableHeaders(Object.keys(json.entryDataList[0]).splice(5, 17));
                setTableData(json.entryDataList);
                setIsContentLoading(false);
                setHeadingFlag(false);
                setContentFlag(false)
            },
                err => {
                    setIsContentLoading(false);
                    setMainError(err)
                });
    }

    const updatedPage = async (event) => {
        if (event.target.outerText === 'Prev') {
            setIsContentLoading(true);
            setPage(page - 1);
            fetch(`${baseURL}/api/entry/search/${page - 1}`, {
                method: "POST",
                body: JSON.stringify(searchData),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    token: Cookies.get('token'),
                }
            }).then(response => response.json())
                .then(json => {
                    if (!json.entryDataList.length) {
                        setContentFlag(true);
                        setPaginationFlag(true);
                        setIsContentLoading(false);
                    }
                    else if (json.error) {
                        setContentFlag(true);
                        setPaginationFlag(true);
                        setIsContentLoading(false);
                    }
                    else {
                        setTableHeaders(Object.keys(json.entryDataList[0]).splice(5, 17));
                        setTableData(json.entryDataList);
                        setContentFlag(false);
                        setPaginationFlag(false);
                        setIsContentLoading(false);
                    }
                },
                    err => {
                        setIsContentLoading(false);
                        setMainError(err)
                    })
        }
        else if (event.target.outerText === 'Next') {
            setPage(page + 1);
            setIsContentLoading(true);
            fetch(`${baseURL}/api/entry/search/${page + 1}`, {
                method: "POST",
                body: JSON.stringify(searchData),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    token: Cookies.get('token'),
                }
            }).then(response => response.json())
                .then(json => {
                    if (!json.entryDataList.length) {
                        setContentFlag(true);
                        setPaginationFlag(true);
                        setIsContentLoading(false);
                    }
                    else if (json.error) {
                        setContentFlag(true);
                        setPaginationFlag(true);
                        setIsContentLoading(false);
                    }
                    else {
                        setTableHeaders(Object.keys(json.entryDataList[0]).splice(5, 17));
                        setTableData(json.entryDataList);
                        setContentFlag(false);
                        setPaginationFlag(false);
                        setIsContentLoading(false);
                    }
                },
                    err => {
                        setIsContentLoading(false);
                        setMainError(err)
                    })
        }
    }

    const displayContent = async (jobId) => {
        setIsContentLoading(true);
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
            setIsContentLoading(false);
        }

        else {
            setJobTableHeaders();
            setFlag(false);
            setIsContentLoading(false);
        }
    }

    if (contentFlag) {
        return (
            <>
                <div className="selectfield">
                    <label className="labelHeading">Filters:</label>
                    <select required="required" className="search" name="search" onChange={addFilter}>
                        {filterAmendArray && filterAmendArray.map((content, index) => {
                            const result = content.replace(/([A-Z])/g, " $1")
                            return <option key={index} value={content}>{result.charAt(0).toUpperCase() + result.slice(1)}</option>
                        })}
                    </select>
                </div>

                {filters && filters.map((filter, index) => {
                    const result = filter.replace(/([A-Z])/g, " $1");
                    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
                    return (
                        <div className="filterfield" key={index}>
                            <div style={{ width: '80%' }}>
                                <label className="labelStyle">{finalResult}</label>
                                <input className="textArea" type="text" name={filter} onChange={handleFilter} />
                                <button type="submit" className="filterBtn" onClick={() => removeFilter(index)}>X</button>
                            </div>
                        </div>
                    )
                })}

                {submitData &&
                    <div className="inputfield">
                        <input type="submit" value="Search" className="btn" onClick={submitSearchData} />
                    </div>}
                <div style={{ paddingTop: '40px' }}>
                    <div style={{ color: 'white', fontWeight: 'bold', paddingBottom: '10px' }}>Base Entry Form</div><br />
                    <center style={{ color: 'white', fontWeight: 'bold', paddingBottom: '10px' }}>No Data Found</center>
                </div>

                {paginationFlag &&
                    <div>
                        <Pagination>
                            <Pagination size="sm">
                                <Pagination.Item disabled={page === 1 ? true : false} onClick={updatedPage}>{'Prev'}</Pagination.Item>
                            </Pagination>
                            <Pagination size="sm">
                                <Pagination.Item >{page}</Pagination.Item>
                            </Pagination>
                            <Pagination size="sm">
                                <Pagination.Item disabled={paginationFlag} onClick={updatedPage}>{'Next'}</Pagination.Item>
                            </Pagination>
                        </Pagination>
                    </div>}
            </>
        )
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
        <>
            <div className="selectfield">
                <label className="labelHeading">Filters:</label>
                <select required="required" className="search" name="search" onChange={addFilter}>
                    <option value="">Select</option>
                    {/* <option value="employeeName">Emp Name</option>
                    <option value="clientName">Client Name</option>
                    <option value="workStatus">Work Status</option> */}
                    {filterAmendArray && filterAmendArray.map((content, index) => {
                        const result = content.replace(/([A-Z])/g, " $1")
                        return <option key={index} value={content}>{result.charAt(0).toUpperCase() + result.slice(1)}</option>
                    })}
                </select>
            </div>

            {filters && filters.map((filter, index) => {
                const result = filter.replace(/([A-Z])/g, " $1");
                const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
                return (
                    <div className="filterfield" key={index}>
                        <div>
                            <label className="labelStyle">{finalResult}</label>
                            <div style={{ display: 'flex', paddingRight: '50px' }}>
                                <input className="textArea" type="text" name={filter} onChange={handleFilter} />
                                <button type="submit" className="filterBtn" onClick={() => removeFilter(index)}>X</button>
                            </div>
                        </div>
                    </div>
                )
            })}

            {submitData &&
                <div className="inputfield">
                    <input type="submit" value="Search" className="btn" onClick={submitSearchData} />
                </div>}

            <div style={{ paddingTop: '40px' }}>
                {headingFlag ? null : <div style={{ color: 'white', fontWeight: 'bold', paddingBottom: '10px' }}>Base Entry Form</div>}
                <>
                    <table className="tableReport">
                        <thead>
                            <tr>
                                {tableHeaders && tableHeaders.map((content, key) => {
                                    const result = content.replace(/([A-Z])/g, " $1");
                                    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
                                    return <th key={key}>{finalResult}</th>
                                }
                                )}
                            </tr>
                        </thead>

                        <tbody>
                            {tableData && tableData.map((tableContent, index) => (
                                <Fragment key={index}>
                                    <ReadOnlyRow tableContent={tableContent} displayContent={displayContent} />
                                </Fragment>
                            ))}
                        </tbody>
                    </table><br />
                </>

                {!headingFlag &&
                    <div>
                        <Pagination>
                            <Pagination size="sm">
                                <Pagination.Item disabled={page === 1 ? true : false} onClick={updatedPage}>{'Prev'}</Pagination.Item>
                            </Pagination>
                            <Pagination size="sm">
                                <Pagination.Item >{page}</Pagination.Item>
                            </Pagination>
                            <Pagination size="sm">
                                <Pagination.Item onClick={updatedPage}>{'Next'}</Pagination.Item>
                            </Pagination>
                        </Pagination>
                    </div>}

                {jobTableHeaders ?
                    <>
                        <div style={{ color: 'white', fontWeight: 'bold', paddingTop: '30px', paddingBottom: '10px' }}>Engineer Update</div>
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
                            <center style={{ color: 'white', fontWeight: 'bold', paddingBottom: '10px' }}>No Data Found</center>
                        </>
                    )
                }
            </div>
        </>
    )
}
