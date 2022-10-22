import React from "react";

import driverStyles from "../../assets/css/home/DriverDetails.module.css";
import TablePagination from "@material-ui/core/TablePagination";



import {
  Label,
  Input,
  Button,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormGroup,
  Alert,
  Container,
} from "reactstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";


import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
const ref = React.createRef();

function RegisteredUsers() {
 

  const [users, setusers] = useState([]);
  const [checkFirstname, setcheckFirstname] = useState(true);
  const [checkNic, setcheckNic] = useState(false);
 
  const [searchText, setsearchText] = useState("");

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

  const deleteUser = (user) => {
    if (
      window.confirm(
        "User " +
       
          " (" +
          user.firstName +
          " " +
          user.lastName +
          ") " +
          "will be removed from the database"
      )
    ) {
      axios
        .delete(`http://localhost:8078/users/delete/${user.username}`)
        .then((res) => {
          console.log(res);
          toast.success("User deleted!", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 5000,
            hideProgressBar: false,
          });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong :(", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 10000,
            hideProgressBar: false,
          });
        });
      let filteredUsers = users.filter((uid) => uid !== user);
      setusers(filteredUsers);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8078/users/get")
      .then((res) => {
        setusers(res.data);
      })
      .catch((err) => {
        alert("Something went wrong :(");
        console.log(err);
      });

    return () => {
      // cleanup
    };
  }, []);

  let history = useHistory();
 

  
  return (
    <>
     
      <Container>
      <div className={driverStyles.viewdriverDiv}  ref={ref} >
        <center><h3 className={driverStyles.header}>Managers' Details</h3></center>
        <br />
        <br />
        <Row>
          <Col>
            <FormGroup>
              <InputGroup className="form-group-no-border">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="nc-icon nc-zoom-split" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Search "
                  type="text"
                  value={searchText}
                  onChange={(e) => {
                    setsearchText(e.target.value);
                  }}
                />
              </InputGroup>
            </FormGroup>
          </Col>
          <Col>
            <div>
              <Label check>
                <Input
                  type="checkbox"
                  checked={checkFirstname}
                  onChange={() => {
                    setcheckFirstname(!checkFirstname);
                  }}
                />{" "}
                <label className={driverStyles.checkBoxLabel}>First Name</label>
              </Label>

              <Label check>
                <Input
                  type="checkbox"
                  checked={checkNic}
                  onChange={() => {
                    setcheckNic(!checkNic);
                  }}
                />{" "}
                <label className={driverStyles.checkBoxLabel}>NIC</label>
              </Label>

             
            </div>
          </Col>
          <Col></Col>
        </Row>
        <table width="100%" border="2px" className={driverStyles.tbldata}>
          <tr>
            <th className={driverStyles.tbldata}>User Name</th>
            <th className={driverStyles.tbldata}>Email</th>
            <th className={driverStyles.tbldata}>Contact Number</th>
            <th className={driverStyles.tbldata}>Nic</th>
            <th className={driverStyles.tbldata}>First Name</th>
            <th className={driverStyles.tbldata}>Last Name</th>
            <th className={driverStyles.tbldata}>Gender</th>
            <th className={driverStyles.tbldata2}>Actions</th>
          </tr>
          {users
            .filter((user) => {
              let fullName = user.firstName + " " + user.lastName;
              if (searchText === "") {
                return user;
              } else {
                if (checkFirstname) {
                  if (
                    fullName.toLowerCase().includes(searchText.toLowerCase())
                  ) {
                    return user;
                  }
                }
                if (checkNic) {
                  if (
                    user.nic
                      .toLowerCase()
                      .includes(searchText.toLowerCase())
                  ) {
                    return user;
                  }
                }
                
                
              }
            })
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((user) => (
              <tr className={driverStyles.tbldata}>
                <td className={driverStyles.tbldata}>{user.username}</td>
                <td className={driverStyles.tbldata}>{user.email}</td>
                <td className={driverStyles.tbldata}>{user.contactNo}</td>
                <td className={driverStyles.tbldata}>{user.nic}</td>
                <td className={driverStyles.tbldata}>{user.firstName}</td>
                <td className={driverStyles.tbldata}>{user.lastName}</td>
                <td className={driverStyles.tbldata}>{user.gender}</td>
                <td className={driverStyles.tbldata}>
                  <button
                    className={driverStyles.btnEdit}
                    onClick={() => {
                      //     handleEdit(driver);
                      history.push(`/adminPannel/editUser/${user._id}`);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className={driverStyles.btnDelete}
                    onClick={() => {
                      deleteUser(user);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </table>

        <button
                    className={driverStyles.btnEdit}
                    onClick={() => {
                      //     handleEdit(driver);
                      history.push(`/adminPannel/userReport`);
                    }}
                  >
                 SEE REPORT
                  </button>
        
        <TablePagination

          rowsPerPageOptions={[1, 2, 4, 10]}

          component="div"

          count={users.length}

          rowsPerPage={rowsPerPage}

          page={page}

          onPageChange={handleChangePage}

          onRowsPerPageChange={handleChangeRowsPerPage}

        />
        

      </div>
      
      </Container>
     
    </>
  );
}

export default RegisteredUsers;
