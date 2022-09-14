import React from "react";
import "./css/MainNavigation.css";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function EmployeeMainNavigation() {
  return (
    <div styles={{ width: "100%" }}>
      <Link to="/adminPannel/EmployeeManager/EmpHome" className="MainNavLinks">
        <Button variant="outline-warning" size="sm" className="MainNavBtn">
          Employee Dashboard
        </Button>
      </Link>

      <Link to="/adminPannel/EmployeeManager/AddEmployee">
        <Button
          variant="outline-warning"
          size="sm"
          className="SupplierMainNavBtn"
        >
          Add Employee
        </Button>
      </Link>

      <Link to="/adminPannel/EmployeeManager/DisplayEmployee">
        <Button
          variant="outline-warning"
          size="sm"
          className="SupplierMainNavBtn"
        >
          Employee Details
        </Button>
      </Link>

      <Link to="/adminPannel/EmployeeManager/ReportHome">
        <Button
          variant="outline-warning"
          size="sm"
          className="SupplierMainNavBtn"
        >
          Report Dashboard
        </Button>
      </Link>

      <Link to="/adminPannel/EmployeeManager/EmployeeProject">
        <Button
          variant="outline-warning"
          size="sm"
          className="SupplierMainNavBtn"
        >
          Assign to a Project
        </Button>
      </Link>
    </div>
  );
}
