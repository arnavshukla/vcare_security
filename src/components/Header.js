import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, Route, Routes } from 'react-router-dom';
import ClientMaster from './ClientComponent/ClientMaster';
import EmployeeMaster from './EmployeeComponent/EmployeeMaster'
import CallTypeMaster from './CallTypeComponent/CallTypeMaster';
import CallCategoryMaster from './CallCategoryComponent/CallCategoryMaster';
import DailyEntryForm from './Forms/DailyEntryForm'
import EmployeeWorkSheet from './Forms/EmployeeWorkSheet';
import CreateUser from './CreateUser';
import '../App.css';
import Report from './Report/Complete Report/Report';
import { useState } from 'react';
import DeleteUser from './DeleteUser';
import Search from './Report/Search';
import PageNotFound from './PageNotFound/PageNotFound';
import baseURL from '../baseURL';
import Cookies from 'js-cookie';
import Loader from './Loader';
import { useNavigate } from "react-router-dom";

const Header = ({ name, editEnabled, role, setIsValidToken }) => {
    const [flag, setFlag] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const history = useNavigate();

    const SignOut = async () => {
        setIsLoading(true);
        const data = await fetch(`${baseURL}/api/auth/logout`, {
            credentials: "include",
            headers: {
                token: Cookies.get('token'),
            }
        });
        if (data.status === 200) {
            setIsValidToken(false);
            Cookies.remove('token');
            Cookies.remove('editEnabled');
            Cookies.remove('role');
            Cookies.remove('name');
            setIsLoading(false);
            history("/")
        }
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            <Navbar expand="lg" variant="dark" bg="red">
                <Container>
                    <Navbar.Brand >V Care Security Solutions</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <NavDropdown title="Forms" id="basic-nav-dropdown">
                                {(role === 'admin' || role === 'manager') && <NavDropdown.Item as={NavLink} to="/dailyform">Daily Entry Form</NavDropdown.Item>}
                                {role === 'employee' && <NavDropdown.Item as={NavLink} to="/employeeworksheet">Employee Work Sheet</NavDropdown.Item>}
                            </NavDropdown>
                            {(role === 'admin' || role === 'manager') &&
                                <NavDropdown title="Report" id="basic-nav-dropdown">
                                    <NavDropdown.Item as={NavLink} to="/completereport">Complete Report</NavDropdown.Item>
                                    <NavDropdown.Item as={NavLink} to="/searchreport">Search Report</NavDropdown.Item>
                                </NavDropdown>}
                            {(role === 'admin' || role === 'manager') &&
                                <>
                                    <Nav.Link as={NavLink} to="/clientmaster">Client Master</Nav.Link>
                                    <Nav.Link as={NavLink} to="/employeemaster">Employee Master</Nav.Link>
                                    <Nav.Link as={NavLink} to="/calltypemaster">Call Type Master</Nav.Link>
                                    <Nav.Link as={NavLink} to="/callcategorymaster">Call Category Master</Nav.Link>
                                </>}
                            <Nav.Link onClick={SignOut}>Signout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Routes>
                <Route exact path="/" element={<PageNotFound role={role} />} />
                <Route exact path="/employeeworksheet" element={<EmployeeWorkSheet name={name} />} />

                {(role === 'admin' || role === 'manager') &&
                    <>
                        <Route exact path="/dailyform" element={<DailyEntryForm />} />
                        <Route exact path="/completereport" element={<Report flag={flag} setFlag={setFlag} editEnabled={editEnabled}/>} />
                        <Route exact path="/searchreport" element={<Search flag={flag} setFlag={setFlag} />} />
                        <Route exact path="/createuser" element={<CreateUser />} />
                        <Route exact path="/deleteuser" element={<DeleteUser />} />
                        <Route exact path="/clientmaster" element={<ClientMaster editEnabled={editEnabled} role={role} />} />
                        <Route exact path="/employeemaster" element={<EmployeeMaster editEnabled={editEnabled} role={role} />} />
                        <Route exact path="/calltypemaster" element={<CallTypeMaster editEnabled={editEnabled} role={role} />} />
                        <Route exact path="/callcategorymaster" element={<CallCategoryMaster editEnabled={editEnabled} role={role} />} />
                    </>}
                <Route exact path="/*" element={<PageNotFound role={role}/>} />
            </Routes>
        </>
    )
}

export default Header;