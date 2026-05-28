import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaUserMd, FaUsers, FaCalendarCheck, FaConciergeBell } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminHome = () => {
  return (
    <Container fluid className="p-4">
      <h2 className="mb-4">Welcome, Admin</h2>

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-white bg-primary shadow-sm">
            <Card.Body className="d-flex align-items-center">
              <FaUserMd size={30} className="me-3" />
              <div>
                <h5>Doctors</h5>
                <h4>50+</h4>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="text-white bg-success shadow-sm">
            <Card.Body className="d-flex align-items-center">
              <FaUsers size={30} className="me-3" />
              <div>
                <h5>Patients</h5>
                <h4>200+</h4>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="text-white bg-warning shadow-sm">
            <Card.Body className="d-flex align-items-center">
              <FaCalendarCheck size={30} className="me-3" />
              <div>
                <h5>Bookings</h5>
                <h4>120</h4>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="text-white bg-danger shadow-sm">
            <Card.Body className="d-flex align-items-center">
              <FaConciergeBell size={30} className="me-3" />
              <div>
                <h5>Services</h5>
                <h4>15</h4>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Activities */}
      <h4>Recent Activities</h4>
      <Card className="shadow-sm">
        <Card.Body>
          <ul className="list-unstyled mb-0">
            <li>✅ Dr. John Smith added a new service.</li>
            <li>✅ 5 new patient registrations today.</li>
            <li>✅ Appointment #1023 has been confirmed.</li>
            <li>✅ Dr. Emily Watson updated her schedule.</li>
          </ul>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdminHome;
