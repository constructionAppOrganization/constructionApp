import { TextField, makeStyles, Paper } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import firebase from "firebase";
import PageHeader from "./PageHeader";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import Button1 from "@material-ui/core/Button";
import moment from "moment";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Alert from "@mui/material/Alert";
import swal from "sweetalert";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(1),
        width: theme.spacing(10),
        height: theme.spacing(10),
        width: "20%",
      },
    },
  },
}));

function AddEmployee() {
  const [alertDisplay, setAlertDisplay] = useState("none");

  const [employeeName, setEmployeeName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [designation, setDesignation] = useState("Senior Engineer");
  const [startdate, setStartDate] = useState(moment().format("DD/MM/YYYY"));
  const [etf, setEtf] = useState("");
  const [empType, setEmpType] = useState("contracted");
  const [positions, setPositions] = useState([]);
  const [type, setType] = useState([]);

  const classes = useStyles();

  const db = firebase.firestore();
  const db4 = firebase.firestore();

  function sendData(e) {
    e.preventDefault();

    const newEmployee = {
      employeeName,
      address,
      phoneNumber,
      designation,
      startdate,
      etf,
      empType,
    };
    console.log(newEmployee);

    setAlertDisplay("");
    setTimeout(() => {
      setAlertDisplay("none");
    }, 3000);

    db.collection("employees")
      .doc()
      .set(newEmployee)
      .then(() => {
        console.log("Employee successfully added...!");
      })
      .catch((error) => {
        console.error("Error adding Employee..! ", error);
      });

    setEmployeeName("");
    setAddress("");
    setPhoneNumber("");
    setDesignation("");
    setStartDate("");
    setEtf("");
    setEmpType("");
  }

  useEffect(() => {
    db4.collection("Designation").onSnapshot((snapshot) => {
      const arr = snapshot.docs.map((doc) => doc.data());
      setType(arr);
    });
  }, [db4]);

  return (
    <>
      <PageHeader
        title="Add New Employees"
        subTitle="Create employee record"
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
      />
      <div
        style={{
          marginBottom: "10px",
          paddingTop: "40px",
          paddingBottom: "20px",
          borderStyle: "solid",
          borderWidth: "2px",
          borderColor: "#ABB2B9",
        }}
      >
        <Container fluid="sm">
          <Row>
            <Col md={{ span: 5, offset: 3 }}>
              <Form onSubmit={sendData}>
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Employee Name</Form.Label>
                  <Form.Control
                    aria-label="Default select example"
                    size="xxl"
                    type="text"
                    pattern="^[A-Za-z \s*]+$"
                    required
                    placeholder="Ex : K.M.L.Perera"
                    value={employeeName}
                    onChange={(e) => setEmployeeName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicTitle">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    aria-label="Default select example"
                    size="xxl"
                    as="textarea"
                    rows={1}
                    required
                    placeholder="Ex : 5/A, Ampitiya"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicTitle">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    aria-label="Default select example"
                    size="xxl"
                    type="number"
                    pattern="^[[0-9]{10}"
                    required
                    inputProps={{ maxLength: 10, min: 10 }}
                    placeholder="Ex : 0712645893"
                    value={phoneNumber}
                    InputProps={{ inputProps: { maxLength: 10, min: 10 } }}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicTitle">
                  <Form.Label>Designation</Form.Label>
                  <Form.Control
                    as="select"
                    aria-label="Default select example"
                    size="xxl"
                    width="20%"
                    required
                    placeholder="Select"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                  >
                    {type.map((des) => (
                      <option>{des.designation}</option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicTitle">
                  <Form.Label>ETF Amount</Form.Label>
                  <Form.Control
                    aria-label="Default select example"
                    size="xxl"
                    type="number"
                    step="0.01"
                    min="0.00"
                    placeholder="Ex : 15000.00"
                    value={etf}
                    onChange={(e) => setEtf(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicTitle">
                  <Form.Label>Type</Form.Label>
                  <Form.Control
                    as="select"
                    aria-label="Default select example"
                    size="xxl"
                    width="20%"
                    required
                    placeholder="Select"
                    value={empType}
                    onChange={(e) => setEmpType(e.target.value)}
                  >
                    <option>{"contracted"}</option>
                    <option>{"non-contracted"}</option>
                    {/* {type.map((ty) => (
                      <option>{ty.status}</option>
                    ))} */}
                  </Form.Control>
                </Form.Group>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <Button
                    variant="success"
                    type="submit"
                    styles={{
                      margin: "0px 0px 10px 0px",
                    }}
                  >
                    Add Employee
                  </Button>{" "}
                  <Alert
                    style={{ display: alertDisplay, marginLeft: "20px" }}
                    onClose={() => {
                      setAlertDisplay("none");
                    }}
                  >
                    Employee Details Added !
                  </Alert>
                </div>
                <br />
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default AddEmployee;
