import React from "react";
import "./css/MainNavigation.css";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function EmployeeMainNavigation() {
  return (
    <div clsssName="" styles={{ width: "100%" }}>
      <Link to="/adminPannel/EmployeeManager/EmpHome" className="MainNavLinks">
        <Button variant="outline-warning" size="sm" className="MainNavBtn">
          Employee Dashboard
        </Button>
      </Link>

      <Link to="/adminPannel/EmployeeManager/AddEmployee">
        <Button variant="outline-warning" size="sm" className="MainNavBtn">
          Add Employee
        </Button>
      </Link>

      <Link to="/adminPannel/EmployeeManager/DisplayEmployee">
        <Button variant="outline-warning" size="sm" className="MainNavBtn">
          Employee Details
        </Button>
      </Link>

      <Link to="/adminPannel/EmployeeManager/ReportHome">
        <Button variant="outline-warning" size="sm" className="MainNavBtn">
          Report Dashboard
        </Button>
      </Link>

      <Link to="/adminPannel/EmployeeManager/EmployeeProject">
        <Button variant="outline-warning" size="sm" className="MainNavBtn">
          Assign to a Project
        </Button>
      </Link>
    </div>
  );
}
