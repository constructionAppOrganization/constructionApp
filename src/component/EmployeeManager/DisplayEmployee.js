import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { Link } from "react-router-dom";
import { Table, ButtonGroup, Button, Form } from "react-bootstrap";
import PageHeader from "./PageHeader";
import PersonIcon from "@material-ui/icons/Person";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import TablePagination from "@material-ui/core/TablePagination";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

import swal from "sweetalert";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const mainStyle = "#FDFDFD";

function DisplayEmployee(props) {
  const [employees, setEmployees] = useState([]);
  const [type, setType] = useState([]);
  const [editEmployee, setEditEmployee] = useState(props);
  const [viewEmployee, setViewEmployee] = useState(props);
  const [sortType, setSortType] = useState("null");
  const [sortContract, setSortContract] = useState("null");
  const [searchTerm, setSearchTerm] = useState("");

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log(event.target.value);
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const db = firebase.firestore();
  const db4 = firebase.firestore();

  useEffect(() => {
    db4.collection("Designation").onSnapshot((snapshot) => {
      const arr = snapshot.docs.map((doc) => doc.data());
      setType(arr);
    });
  }, [db4]);

  useEffect(() => {
    db.collection("employees").onSnapshot((snapshot) => {
      const arr = snapshot.docs.map((doc) => ({
        ID: doc.id,
        data: doc.data(),
      }));

      setEmployees(arr);
    });
  }, [db]);

  function deleteEmployee(ID) {
    db.collection("employees")
      .doc(ID)
      .delete()
      .then(() => {
        console.log(ID, "Employee successfully deleted...!");
      })
      .catch((err) => {
        console.error("Error removing Employee ", err);
      });
  }

  function editingEmployee(id) {
    editEmployee.editEmployeeHandler(id);
  }

  function ViewEmployee(name) {
    viewEmployee.viewEmployeeHandler(name);
  }

  const classes = useStyles();

  const handleSortChange = (value) => {
    setSortType(value);
  };

  const handleSortType = (value) => {
    console.log(value);
    setSortContract(value);
  };

  return (
    <div
      style={{
        backgroundColor: mainStyle,
      }}
    >
      <PageHeader
        title="Employee Details"
        //subTitle="Form design with validation"
        icon={<PersonIcon fontSize="large" />}
      />
      <div
        className="emp_details_main"
        style={{
          backgroundColor: mainStyle,
          borderStyle: "solid",
          borderWidth: "2px",
          borderColor: "#ABB2B9",
          paddingBottom: "10px",
          marginBottom: "10px",
        }}
      >
        <br />
        <Grid container>
          <Grid item xs={6}>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                id="filled-basic"
                label="Search by Employee Name"
                variant="filled"
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                }}
                style={{
                  borderRadius: 15,
                  width: "350px",
                  height: "80px",
                }}
              />
            </form>
          </Grid>

          <Grid item xs={6} style={{ display: "flex", paddingLeft: "230px" }}>
            <FormControl sx={{ m: 1, minWidth: 180 }}>
              <InputLabel id="demo-simple-select-helper-label">
                Contract Type
              </InputLabel>
              <Select
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                label="Designation"
                onChange={(event) => {
                  handleSortType(event.target.value);
                }}
              >
                <MenuItem value="null">None</MenuItem>
                <MenuItem value={"contracted"}>{"contracted"}</MenuItem>
                <MenuItem value={"non-contracted"}>{"non-contracted"}</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 180 }}>
              <InputLabel id="demo-simple-select-helper-label">
                Select Designation
              </InputLabel>
              <Select
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                label="Designation"
                onChange={(event) => {
                  handleSortChange(event.target.value);
                }}
              >
                <MenuItem value="null">None</MenuItem>
                {type.map((des) => (
                  <MenuItem value={des.designation}>{des.designation}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Table bordered size="sm">
          <thead>
            <tr>
              <th style={{ display: "none" }}>Document ID</th>
              <th style={{ textAlign: "center" }}>Employee Name</th>
              <th style={{ textAlign: "center" }}>Address</th>
              <th style={{ textAlign: "center" }}>Phone Number</th>
              <th style={{ textAlign: "center" }}>Designation</th>
              <th style={{ textAlign: "center" }}>Start Date</th>
              <th style={{ textAlign: "center" }}>Type</th>
              <th style={{ textAlign: "center" }}>ETF</th>
              <th style={{ textAlign: "center", verticalAlign: "middle" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {employees
              .filter((employee) => {
                //filters by employee designation
                if (sortType == "null") {
                  return employee;
                } else if (
                  employee.data.designation
                    .toLowerCase()
                    .includes(sortType.toLowerCase())
                ) {
                  return employee;
                }
              })
              .filter((employee) => {
                //filters by employee contract type
                if (sortContract == "null") {
                  return employee;
                } else if (employee.data.empType == sortContract) {
                  return employee;
                }
              })
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .filter((employee) => {
                //filters by employee name
                if (searchTerm == "") {
                  return employee;
                } else if (
                  employee.data.employeeName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                ) {
                  return employee;
                }
              })
              .map((employee) => (
                <tr>
                  <td style={{ display: "none" }}>{employee.ID}</td>

                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {employee.data.employeeName}
                  </td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {employee.data.address}
                  </td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {employee.data.phoneNumber}
                  </td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {employee.data.designation}
                  </td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {employee.data.startdate}
                  </td>

                  <td
                    style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                      width: "160px",
                    }}
                  >
                    {employee.data.empType}
                  </td>

                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {employee.data.etf}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Link to="/adminPannel/EmployeeManager/EmployeeProfile">
                      <Button
                        style={{
                          backgroundColor: "#ffffff",
                          marginRight: "4px",
                        }}
                        //variant="info"
                        onClick={() => {
                          ViewEmployee(employee.data.employeeName);
                        }}
                      >
                        <VisibilityIcon fontSize="small" color="action" />
                      </Button>
                    </Link>

                    <Link to="/adminPannel/EmployeeManager/EditEmployee">
                      <Button
                        style={{
                          backgroundColor: "#ffffff",
                          marginRight: "4px",
                        }}
                        //variant="warning"
                        onClick={() => {
                          editingEmployee(employee.ID);
                        }}
                      >
                        <EditIcon fontSize="small" color="action" />
                      </Button>
                    </Link>

                    <Button
                      style={{ borderColor: "#C0392B" }}
                      variant="outlined"
                      onClick={() => {
                        swal({
                          title: "Delete record?",
                          // text: "Once deleted, you will not be able to recover this imaginary file!",
                          // backgroundColor: "#DCDCDC",
                          buttons: true,
                          dangerMode: true,
                        }).then((willDelete) => {
                          if (willDelete) {
                            deleteEmployee(employee.ID);
                          } else {
                            swal.close();
                          }
                        });
                      }}
                    >
                      <DeleteIcon fontSize="small" color="secondary" />
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[10, 20, 40, 100]}
          component="div"
          count={employees.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
}

export default DisplayEmployee;
