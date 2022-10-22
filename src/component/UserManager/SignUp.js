import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { Label, Input, Form, Row, Col, Button } from "reactstrap";

import { toast } from "react-toastify";
import styles from "../../assets/css/home/Style-signin.module.css";

toast.configure();

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");

  const [nic, setNic] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setError] = useState("");

  const genderList = ["Male", "Female"];

  function sendData(e) {
    e.preventDefault();
    //Checking whether username already exists

    axios.get(`http://localhost:8078/users/check/${username}`).then((res) => {
      if (res.data === true) {
        setError("Please use a different username!");
        toast.error("Username already exists!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 10000,
          hideProgressBar: false,
        });
        setUsername("");
      } else {
        const user = {
          username,
          email,
          contactNo,
          nic,
          firstName,
          lastName,
          gender,
          password,
        };
        axios
          .post("http://localhost:8078/users/add", user)
          .then(() => {
            alert("SignUp Details Added");
            window.location.reload();
          })
          .catch((err) => {
            alert(err);
          });
      }
    });
  }

  return (
    <div style={{ width: "100vw" }}>
      <Row>
        <Col xl="8">
          <div className={styles.loginImg}></div>
        </Col>
        <Col>
          <div className={styles.loginForm}>
            <h2>
              <b>SIGN UP</b>
            </h2>
            <br />

           

    <Form style={{ width: "80%" }} onSubmit={sendData}>

     <Label for="username"><b>User Name</b></Label>
     <Input placeholder="Enter User Name" type="text"
      pattern = "[A-Za-z0-9]+" title = "Please Enter Only Letters and Numbers"
     onChange={(e)=>{
      setUsername(e.target.value);
     }} />
    {/* <span><p style = {{color : "red"}}>{usernameError}</p></span> */}
      <br/>
     <Label for="email"><b>Email</b></Label>
     <Input placeholder="Enter Email" type="text"
     pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title = "Enter a valid email"
     onChange={(e)=>{
      setEmail(e.target.value);
     }} />

    <br/>
     <Label for="contactNo"><b>Contact Number</b></Label>
     <Input placeholder="Enter Contact Number" type="text"
     
     pattern = "[0-9]{10}" title = "Enter a 10 digit phone number starting with 0"
     onChange={(e)=>{
      setContactNo(e.target.value);
     }} />

     <br/>

     <Label for="nic"><b>NIC</b></Label>
     <Input placeholder="Enter NIC Number" type="text"
     pattern="[0-9]{9}[V]{1}" title = "Enter a valid NIC Number, EX : 785678640V" 
     onChange={(e)=>{
      setNic(e.target.value);
     }} />

     <br/>

     <Label for="firstName"><b>First Name</b></Label>
     <Input placeholder="Enter First Name" type="text"
      pattern="[A-Za-z]+" title = "Please Enter Only Capital or Simple Letters, EX : Kanishka" 
     onChange={(e)=>{
      setFirstName(e.target.value);
     }} />
      <br/>


      <Label for="lastName"><b>Last Name</b></Label>
     <Input placeholder="Enter Last Name" type="text"
      pattern="[A-Za-z]+" title = "Please Enter Only Capital or Simple Letters, EX : Kanishka" 
     onChange={(e)=>{
      setLastName(e.target.value);
     }} />
      <br/>

     <Label for="gender"><b>Gender</b></Label>
     <Input  
     type="select"
     
     onChange={(e)=>{
      setGender(e.target.value);
     }} >
       {genderList.map((c) =>(
         <option>{c}</option>
       ))}
       
       
    </Input> 
     <br/>

     <Label for="password"><b>Password</b></Label>
     <Input placeholder="Enter password" type="text"
       pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" 
       title = "Enter Password with at least one number and one uppercase and lowercase letter, and at least 6 or more characters, EX : Pass1234" 
     onChange={(e)=>{
      setPassword(e.target.value);
     }} />





     <br />
     <h9> By clicking Sign Up, you agree to our Terms, Data Policy and Cookie Policy.</h9><br/>

     <center>
       <Button type="submit" className="btn btn-primary">Submit</Button> { }
       
       <Button href="/" type="submit" className="btn btn-primary">Log IN</Button>
     </center>





    </Form>
    </div>

        </Col>
      </Row>
    </div>
  );
}
