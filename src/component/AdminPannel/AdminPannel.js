import React from "react";

import { Card } from "react-bootstrap";
import "./AdminPannel.css";
import { Link } from "react-router-dom";

function AdminPannel() {
  return (
    <div>
      <h1>Admin Pannel</h1>
      <div className="AdminPannel__mainButton">
        <Link to="/adminPannel/ClientManager" className="nav-link">
          <Card
            hover="true"
            className="text-center"
            bg={"Warning".toLowerCase()}
            text={"white"}
            style={{ width: "10rem", height: "6rem", color: "#111111" }}
          >
            <Card.Body>
              <Card.Title>Client Manager</Card.Title>
            </Card.Body>
          </Card>
        </Link>
        <Link to="/adminPannel/EmployeeManager/EmpHome" className="nav-link">
          <Card
            className="text-center"
            bg={"Warning".toLowerCase()}
            text={"white"}
            style={{ width: "10rem", height: "6rem", color: "#111111" }}
          >
            <Card.Body>
              <Card.Title>Employee Manager</Card.Title>
            </Card.Body>
          </Card>
        </Link>

        <Link to="/adminPannel/ProjectManagement" className="nav-link">
          <Card
            className="text-center"
            bg={"Warning".toLowerCase()}
            text={"white"}
            style={{ width: "10rem", height: "6rem", color: "#111111" }}
          >
            <Card.Body>
              <Card.Title>Project Manager</Card.Title>
            </Card.Body>
          </Card>
        </Link>

        <Link to="/adminPannel/SubcontractManager/SubconMain" className="nav-link">
          <Card
            className="text-center"
            bg={"Warning".toLowerCase()}
            text={"white"}
            style={{ width: "10rem", height: "6rem", color: "#111111" }}
          >
            <Card.Body>
              <Card.Title>SubContract Manager</Card.Title>
            </Card.Body>
          </Card>
        </Link>
        <Link to="/adminPannel/DesignationManager" className="nav-link">
          <Card
            className="text-center"
            bg={"Warning".toLowerCase()}
            text={"white"}
            style={{ width: "10rem", height: "6rem", color: "#111111" }}
          >
            <Card.Body>
              <Card.Title>Designation Manager</Card.Title>
            </Card.Body>
          </Card>
        </Link>
        <Link to="/adminPannel/supplierManager" className="nav-link">
          <Card
            className="text-center"
            bg={"Warning".toLowerCase()}
            text={"white"}
            style={{ width: "10rem", height: "6rem", color: "#111111" }}
          >
            <Card.Body>
              <Card.Title>Supply Manager</Card.Title>
            </Card.Body>
          </Card>
        </Link>
        <Link
          to="/adminPannel/attendanceManager/attendanceManagePanel"
          className="nav-link"
        >
          <Card
            className="text-center"
            bg={"Warning".toLowerCase()}
            text={"white"}
            style={{ width: "10rem", height: "6rem", color: "#111111" }}
          >
            <Card.Body>
              <Card.Title>Attendance Manager</Card.Title>
            </Card.Body>
          </Card>
        </Link>
      </div>
    </div>
  );
}

export default AdminPannel;
=======
import "./AdminPannel.css";
import { Link } from "react-router-dom";
import { Button, Container, Image, Row } from "react-bootstrap";
import admin from "./admin_Images/admin.png";

export default function AdminPannel1() {
  const buttonStyle = { color: "#EBF5FB", fontSize: "17px" };

  return (
    <div className="adminPannelBg">
      <br />

      <Row className="adminPannelHeaderRow">
        <div
          className="adminPannelHeaderBg"
          style={{ color: "#073058", fontSize: "40px", fontWeight: "" }}
        >
          <Image
            src={admin}
            className="adminIcon"
            style={{ borderRadius: "14px", marginRight: "20px" }}
          />
          Admin Panel
        </div>
      </Row>

      <br />
      <Container
        className=" p-3 mb-5 bg-white rounded"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <div className="admin_Container">
          <Link to="/adminPannel/ClientManager" className="AdminPannelNavLinks">
            <Button
              variant="outline-warning"
              size="sm"
              className="AdminPannelNavBtn"
              style={buttonStyle}
            >
              CLIENT MANAGER
            </Button>
          </Link>
          <br />
          <Link
            to="/adminPannel/ProjectManagement"
            className="AdminPannelNavLinks"
          >
            <Button
              variant="outline-warning"
              size="sm"
              className="AdminPannelNavBtn"
              style={buttonStyle}
            >
              PROJECT MANAGER
            </Button>
          </Link>
          <br />
          <Link
            to="/adminPannel/EmployeeManager/EmpHome"
            className="AdminPannelNavLinks"
          >
            <Button
              variant="outline-warning"
              size="sm"
              className="AdminPannelNavBtn"
              style={buttonStyle}
            >
              EMPLOYEE MANAGER
            </Button>
          </Link>
          <br />
          <Link
            to="/adminPannel/attendanceManager/attendanceManagePanel"
            className="AdminPannelNavLinks"
          >
            <Button
              variant="outline-warning"
              size="sm"
              className="AdminPannelNavBtn"
              style={buttonStyle}
            >
              ATTENDANCE MANAGER
            </Button>
          </Link>
          <br />

          <Link
            to="/adminPannel/DesignationManager"
            className="AdminPannelNavLinks"
          >
            <Button
              variant="outline-warning"
              size="sm"
              className="AdminPannelNavBtn"
              style={buttonStyle}
            >
              DESIGNATION MANAGER
            </Button>
          </Link>
          <br />

          <Link
            to="/adminPannel/SubcontractManager/SubconMain"
            className="AdminPannelNavLinks"
          >
            <Button
              variant="outline-warning"
              size="sm"
              className="AdminPannelNavBtn"
              style={buttonStyle}
            >
              SUBCONTRACT MANAGER
            </Button>
          </Link>
          <br />
          <Link
            to="/adminPannel/supplierManager"
            className="AdminPannelNavLinks"
          >
            <Button
              variant="outline-warning"
              size="sm"
              className="AdminPannelNavBtn"
              style={buttonStyle}
            >
              SUPPLIER MANAGER
            </Button>
          </Link>
          <br />
        </div>
      </Container>

      {/* <Image src={adminBg} fluid /> */}
    </div>
  );
}

