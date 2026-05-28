

import React, { useState } from "react";
import { Container, Row, Col, Nav, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaHome, FaUserMd, FaConciergeBell, FaCalendarCheck, FaUsers, FaBars, FaSignOutAlt } from "react-icons/fa";
import AdmHome from "./AdmHome";
import AdmDoctors from "./AdmDoctors";
import AdmServices from "./AdmServices";
import AdmBookings from "./AdmBookings";
import AdmPatients from "./AdmPatients";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";


const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <AdmHome />;
      case "doctors":
        return <AdmDoctors />;
      case "services":
        return <AdmServices />;
      case "bookings":
        return <AdmBookings />;
      case "patients":
        return <AdmPatients />;
      default:
        return <h2>Welcome to Admin Dashboard</h2>;
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Successfully logged out!", { position: "top-right", autoClose: 3000 });
    navigate("/home");
    
  };

  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col md={isSidebarOpen ? 3 : 0} lg={isSidebarOpen ? 2 : 0} className={`bg-dark text-white sidebar vh-100 ${isSidebarOpen ? "d-block" : "d-none d-md-block"}`}>
          <h3 className="text-center py-3">Admin Panel</h3>
          <Nav className="flex-column p-3">
            <Nav.Link className="text-white d-flex align-items-center" onClick={() => setActiveTab("home")}>
              <FaHome className="me-2" /> Home
            </Nav.Link>
            <Nav.Link className="text-white d-flex align-items-center" onClick={() => setActiveTab("doctors")}>
              <FaUserMd className="me-2" /> Doctors
            </Nav.Link>
            <Nav.Link className="text-white d-flex align-items-center" onClick={() => setActiveTab("services")}>
              <FaConciergeBell className="me-2" /> Services
            </Nav.Link>
            <Nav.Link className="text-white d-flex align-items-center" onClick={() => setActiveTab("bookings")}>
              <FaCalendarCheck className="me-2" /> Bookings
            </Nav.Link>
            <Nav.Link className="text-white d-flex align-items-center" onClick={() => setActiveTab("patients")}>
              <FaUsers className="me-2" /> Patients
            </Nav.Link>
          </Nav>

          {/* Logout Button */}
          <div className="mt-auto p-3 text-center">
            <Button variant="danger" className="w-100 d-flex align-items-center justify-content-center" onClick={handleLogout}>
              <FaSignOutAlt className="me-2" /> Logout
            </Button>
          </div>
        </Col>

        {/* Main Content */}
        <Col md={isSidebarOpen ? 9 : 12} lg={isSidebarOpen ? 10 : 12} className="p-4">
          {/* Sidebar Toggle Button for Mobile */}
          <Button variant="dark" className="mb-3 d-md-none" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <FaBars />
          </Button>
          {renderContent()}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
