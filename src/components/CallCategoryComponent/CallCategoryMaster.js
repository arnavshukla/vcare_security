import React, { useEffect, useState, Fragment } from "react";
import { nanoid } from "nanoid";
import "../../App.css";
import ReadOnlyRow from "./ReadOnlyRow"
import EditableRow from "./EditableRow";
import baseURL from "../../baseURL";
import Loader from "../Loader";
import Cookies from "js-cookie";
import LoaderContent from "../LoaderContent";
import ErrorManageComponent from "../ErrorManageComponent";

const CallCategoryMaster = ({ editEnabled, role }) => {
    const [contacts, setContacts] = useState(null);
    const [isLoading, setIsLoading] = useState();
    const [isContentLoading, setIsContentLoading] = useState();
    const [mainError, setMainError] = useState();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const data = await fetch(`${baseURL}/api/category/get`, {
                headers: {
                    token: Cookies.get('token'),
                }
            });
            const json = await data.json();
            setContacts(json.catTypes);
            setIsLoading(false);
        }
        fetchData()
            .catch(function (error) {
                setIsLoading(false);
                setMainError(error)
            });
    }, [])

    const [addFormData, setAddFormData] = useState({
        callType: "",
    });

    const [editFormData, setEditFormData] = useState({
        callType: "",
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
            callType: addFormData.callType,
        };

        fetch(`${baseURL}/api/category/save`, {
            method: "POST",
            body: JSON.stringify({
                id: nanoid(),
                callType: addFormData.callType,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                token: Cookies.get('token'),
            }
        }).then(response => response.json()).then(json => {
            if (json.responseMessage === 'success') {
                const newContacts = [...contacts, newContact];
                setContacts(newContacts);
                alert(json.responseMessage)
                setIsContentLoading(false);
            }
            else if (json.responseMessage === 'Call Type already exists') {
                alert(json.responseMessage)
                setIsContentLoading(false);
            }
            else{
                alert(json.responseMessage)
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
            callType: editFormData.callType,
        };

        const newContacts = [...contacts];

        const index = contacts.findIndex((contact) => contact.id === editContactId);

        setEditContactId(null);
        fetch(`${baseURL}/api/category/edit`, {
            method: "POST",
            body: JSON.stringify({
                id: editContactId,
                callType: editFormData.callType,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                token: Cookies.get('token'),
            }
        }).then(response => response.json()).then(json => {
            if (json.responseMessage === 'success') {
                newContacts[index] = editedContact;
                setContacts(newContacts);
                setEditContactId(null);
                alert(json.responseMessage)
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
            callType: contact.callType,
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
        fetch(`${baseURL}/api/category/delete`, {
            method: "POST",
            body: JSON.stringify({
                id: newContacts[index].id,
                callType: newContacts[index].callType,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                token: Cookies.get('token'),
            }
        }).then(response => response.json()).then(json => {
            if (json.responseMessage === 'Deleted CallCategory') {
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
                    Add a Category Type
                </div>
                <form onSubmit={handleAddFormSubmit}>
                    <div className="form">
                        <div className="inputfield">
                            <label>Name</label>
                            <input type="text" className="input" name="callType" required="required" onChange={handleAddFormChange} />
                        </div>
                        <div className="inputfield">
                            <input type="submit" value="Add" className="btn" />
                        </div>
                    </div>
                </form>
            </div>

            <div className="table-width">
                <form onSubmit={handleEditFormSubmit}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Category Type</th>
                                {editEnabled ? <th>Actions</th> : ""}
                            </tr>
                        </thead>

                        <tbody>
                            {contacts && contacts && contacts.map((contact, index) => (
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
        </div>
    );

}

export default CallCategoryMaster