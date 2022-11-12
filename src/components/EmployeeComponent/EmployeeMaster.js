import React, { useEffect, useState, Fragment } from "react";
import { nanoid } from "nanoid";
import '../../App.css';
import ReadOnlyRow from "./ReadOnlyRow"
import EditableRow from "./EditableRow";
import baseURL from "../../baseURL";
import Loader from "../Loader";
import Cookies from "js-cookie";
import LoaderContent from "../LoaderContent";
import ErrorManageComponent from "../ErrorManageComponent";

const EmployeeMaster = ({ editEnabled, role }) => {

    const [contacts, setContacts] = useState(null);
    const [isLoading, setIsLoading] = useState();
    const [isContentLoading, setIsContentLoading] = useState();
    const [mainError, setMainError] = useState();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const data = await fetch(`${baseURL}/api/employee/get`, {
                credentials: "include",
                headers: {
                    token: Cookies.get('token'),
                }
            });
            const json = await data.json();
            setContacts(json.emplpoyeeData);
            setIsLoading(false);
        }
        fetchData()
            .catch(function (error) {
                setIsLoading(false);
                setMainError(error)
            });
    }, [])

    const [addFormData, setAddFormData] = useState({
        name: "",
        address: "",
        mobile: "",
        email: "",
        pan: "",
        aadhar: "",
        fatherName: "",
        password: "",
        role: ""
    });

    const [editFormData, setEditFormData] = useState({
        name: "",
        address: "",
        mobile: "",
        email: "",
        pan: "",
        aadhar: "",
        fatherName: "",
        password: "",
        role: ""
    });

    const [editContactId, setEditContactId] = useState(null);

    const handleAddFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...addFormData };
        newFormData[fieldName] = fieldValue;

        setAddFormData(newFormData);
    };

    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    };

    const handleAddFormSubmit = (event) => {
        event.preventDefault();
        setIsContentLoading(true);
        const newContact = {
            id: nanoid(),
            name: addFormData.name,
            address: addFormData.address,
            mobile: addFormData.mobile,
            email: addFormData.email,
            pan: addFormData.pan,
            aadhar: addFormData.aadhar,
            fatherName: addFormData.fatherName,
            password: addFormData.password,
            role: addFormData.role,
        };

        fetch(`${baseURL}/api/employee/save`, {
            method: "POST",
            body: JSON.stringify({
                id: nanoid(),
                name: addFormData.name,
                address: addFormData.address,
                mobile: addFormData.mobile,
                email: addFormData.email,
                pan: addFormData.pan,
                aadhar: addFormData.aadhar,
                fatherName: addFormData.fatherName,
                password: addFormData.password,
                role: addFormData.role,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                token: Cookies.get('token')
            }
        }).then(response => response.json()).then(json => {
            if (json.responseMessage === 'success') {
                const newContacts = [...contacts, newContact];
                setContacts(newContacts);
                alert(json.responseMessage);
                setIsContentLoading(false);
            }
            else if (json.responseMessage === 'Employee Already Exists with the same name') {
                alert(json.responseMessage);
                setIsContentLoading(false);
            }
            else{
                alert(json.responseMessage);
                setIsContentLoading(false);
            }
        },
            err => {
                setIsLoading(false);
                setMainError(err)
            })
    };

    const handleEditFormSubmit = (event) => {
        event.preventDefault();
        setIsContentLoading(true);
        const editedContact = {
            id: editContactId,
            name: editFormData.name,
            address: editFormData.address,
            mobile: editFormData.mobile,
            email: editFormData.email,
            pan: editFormData.pan,
            aadhar: editFormData.aadhar,
            fatherName: editFormData.fatherName,
            password: editFormData.password,
            role: editFormData.role,
        };

        const newContacts = [...contacts];

        const index = contacts.findIndex((contact) => contact.id === editContactId);

        fetch(`${baseURL}/api/employee/edit`, {
            method: "POST",
            body: JSON.stringify({
                id: editContactId,
                name: editFormData.name,
                address: editFormData.address,
                mobile: editFormData.mobile,
                email: editFormData.email,
                pan: editFormData.pan,
                aadhar: editFormData.aadhar,
                fatherName: editFormData.fatherName,
                password: editFormData.password,
                role: editFormData.role,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                token: Cookies.get('token')
            }
        }).then(response => response.json()).then(json => {
            if (json.responseMessage === 'success') {
                newContacts[index] = editedContact;
                setContacts(newContacts);
                setEditContactId(null);
                alert(json.responseMessage);
                setIsContentLoading(false);
            }
            else{
                alert(json.responseMessage);
                setIsContentLoading(false);
            }
        },
            err => {
                setIsLoading(false);
                setMainError(err)
            })
    };

    const handleEditClick = (event, contact) => {
        event.preventDefault();
        setEditContactId(contact.id);

        const formValues = {
            name: contact.name,
            address: contact.address,
            mobile: contact.mobile,
            email: contact.email,
            pan: contact.pan,
            aadhar: contact.aadhar,
            fatherName: contact.fatherName,
            password: contact.password,
            role: contact.role,
        };

        setEditFormData(formValues);
    };

    const handleCancelClick = () => {
        setEditContactId(null);
    };

    const handleDeleteClick = (contactId) => {
        setIsContentLoading(true);
        const newContacts = [...contacts];
        const index = contacts.findIndex((contact) => contact.id === contactId);

        fetch(`${baseURL}/api/employee/delete`, {
            method: "POST",
            body: JSON.stringify({
                id: newContacts[index].id,
                name: newContacts[index].name,
                address: newContacts[index].address,
                mobile: newContacts[index].mobile,
                email: newContacts[index].email,
                pan: newContacts[index].pan,
                aadhar: newContacts[index].aadhar,
                fatherName: newContacts[index].fatherName,
                password: newContacts[index].password,
                role: newContacts[index].role,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                token: Cookies.get('token')
            }
        }).then(response => response.json()).then(json => {
            if (json.responseMessage === 'Deleted Employee') {
                newContacts.splice(index, 1);
                setContacts(newContacts);
                alert(json.responseMessage);
                setIsContentLoading(false);
            }
            else{
                alert(json.responseMessage);
                setIsContentLoading(false);
            }
        },
            err => {
                setIsLoading(false);
                setMainError(err)
            })
    };

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
        <div style={{ paddingTop: '10px' }}>
            <div className="wrapper">
                <div className="title">
                    Add Employee
                </div>
                <form onSubmit={handleAddFormSubmit}>
                    <div className="form">
                        <div className="inputfield">
                            <label>Name</label>
                            <input type="text" className="input" name="name" required="required" onChange={handleAddFormChange} />
                        </div>
                        <div className="inputfield">
                            <label>Address</label>
                            <input type="text" className="input" name="address" required="required" onChange={handleAddFormChange} />
                        </div>
                        <div className="inputfield">
                            <label>Phone Number</label>
                            <input type="number" className="input" name="mobile" required="required" onChange={handleAddFormChange} />
                        </div>
                        <div className="inputfield">
                            <label>Email</label>
                            <input type="email" className="input" name="email" required="required" onChange={handleAddFormChange} />
                        </div>
                        <div className="inputfield">
                            <label>PAN</label>
                            <input type="text" className="input" name="pan" required="required" onChange={handleAddFormChange} />
                        </div>
                        <div className="inputfield">
                            <label>Aadhar Number</label>
                            <input type="number" className="input" name="aadhar" required="required" onChange={handleAddFormChange} />
                        </div>
                        <div className="inputfield">
                            <label>Father's Name</label>
                            <input type="text" className="input" name="fatherName" required="required" onChange={handleAddFormChange} />
                        </div>
                        <div className="inputfield">
                            <label>Password</label>
                            <input type="password" required="required" className="input" name="password" onChange={handleAddFormChange} />
                        </div>
                        <div className="inputfield">
                            <label>Choose an Employee Type</label>
                            <div className="custom_select">
                                <select name="role" id="role" required="required" onChange={handleAddFormChange}>
                                    <option value="">Select</option>
                                    <option value="admin">Admin</option>
                                    <option value="manager">Manager</option>
                                    <option value="employee">Employee</option>
                                </select>
                            </div>
                        </div>
                        <div className="inputfield">
                            <input type="submit" value="Add" className="btn" />
                        </div>
                    </div>
                </form>
            </div>
            <form onSubmit={handleEditFormSubmit}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th>PAN</th>
                            <th>Aadhar Number</th>
                            <th>Father Name</th>
                            <th>Password</th>
                            <th>User Type</th>
                            {editEnabled ? <th>Actions</th> : ""}
                        </tr>
                    </thead>

                    <tbody>
                        {contacts && contacts.map((contact, index) => (
                            <Fragment key={index}>
                                {editContactId === contact.id ? (
                                    <EditableRow
                                        editFormData={editFormData}
                                        handleEditFormChange={handleEditFormChange}
                                        handleCancelClick={handleCancelClick}
                                    />
                                ) : (
                                    <ReadOnlyRow
                                        contact={contact}
                                        handleEditClick={handleEditClick}
                                        handleDeleteClick={handleDeleteClick}
                                        editEnabled={editEnabled}
                                        role={role}
                                    />
                                )}
                            </Fragment>
                        ))}
                    </tbody>
                </table>
            </form>
        </div>
    );

}

export default EmployeeMaster