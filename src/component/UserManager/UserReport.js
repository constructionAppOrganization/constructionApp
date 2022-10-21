import React from "react";
import Pdf from "react-to-pdf";
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

function UserReport() {
 

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

  

  

  useEffect(() => {
    axios
      .get("http://localhost:8078/users")
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
  const downloadPDF = () => {
    
     
     
   };
   const options = {
    orientation: 'landscape',
    unit: 'in',
    format: [17,10]
};
  
  return (
    <>
     
      <Container>
      <div className={driverStyles.viewdriverDiv}  ref={ref} >
        <center><h3 className={driverStyles.header}>User Report</h3></center>
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
          <th className={driverStyles.tbldata}>First Name</th>
          <th className={driverStyles.tbldata}>Last Name</th>
            <th className={driverStyles.tbldata}>Email</th>
            <th className={driverStyles.tbldata}>Contact Number</th>
            <th className={driverStyles.tbldata}>Nic</th>
            
            
            
           
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
                <td className={driverStyles.tbldata}>{user.firstName}</td>
                <td className={driverStyles.tbldata}>{user.lastName}</td>
              
                <td className={driverStyles.tbldata}>{user.email}</td>
                <td className={driverStyles.tbldata}>{user.contactNo}</td>
                <td className={driverStyles.tbldata}>{user.nic}</td>
                
               
                
               
              </tr>
            ))}
        </table>
        <Container>
          <div className="reportdownload">
            <Row>
              <Col>
              <div>
                <Pdf targetRef={ref} filename="complaint-report.pdf" options={options} >
                {({ toPdf }) => 
                <button className="btn btn-primary" style={{float:"right",width : "28%", backgroundColor: "#ff762e"}} onClick={toPdf}
            > Capture as Pdf</button>}
                </Pdf>
                </div>
              </Col>
            </Row>
            </div>
          </Container>
        
        

      </div>
      
      </Container>
     
    </>
  );
}

export default UserReport;
