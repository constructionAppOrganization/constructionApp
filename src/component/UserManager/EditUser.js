import styles from '../../assets/css/home/AddDriver.module.css'
import { useState, useEffect} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router';

import{
    Label,
    Input,
    Button 
}
from 'reactstrap'

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


toast.configure();

function EditUser(){

 



   
    const [username , setUsername] = useState("");
    const [email , setEmail] = useState("");
    const [contactNo , setContactNo] = useState("");
    const [nic , setNic] = useState("");
    const [firstName , setFirstName] = useState("");
    const [lastName , setLastName] = useState("");
    const [gender , setGender] = useState("");
    const [password , setPassword] = useState("");
    const [message , setMessage] = useState("");
   

    const {id} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:8078/users/${id}`).then((res) =>{

        console.log(res.data);
        setUsername(res.data.username);
        setEmail(res.data.email);
        setContactNo(res.data.contactNo);
        setNic(res.data.nic);
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setGender(res.data.gender);
        setPassword(res.data.password);
      
        
        
        

        }).catch((err)=>{
        console.log(err);
        })
    } , []);

    function onSubmit (e){
        e.preventDefault();

        const updateUser = {
            username,
            email,
            contactNo,
            nic,
            firstName,
            lastName,
            gender,
            password
        }
        axios.put(`http://localhost:8078/users/update/${id}` , updateUser ).then(() =>{
            
            toast.success('User Updated!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
                e.target.reset();
                

        }).catch((err) =>{
            console.log(err);
            toast.error('Something went  wrong!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        })
    }
    return(

        <div>
            
            <div style = {{paddingTop :"50px"}} className ={styles.body}>
            <br/><br/><h3 className={styles.header} style = {{textAlign : 'center'}}>Update User Details</h3><br/><br/>
            <div className = {styles.FormContainer}>
            <form onSubmit = {onSubmit}>

                <Label for = "username">User Name</Label><br/>
                <Input type = 'text'  
               
                
                pattern = "[A-Za-z0-9]+" title = "Please Enter Only Letters and Numbers"
                name = "username" value = {username}
                onChange = {(e) =>{
                    setUsername(e.target.value);
                }}></Input><br/>

                <Label for = "email">Email</Label><br/>
                <Input type = 'email'  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title = "Enter a valid email"
                name = "email" value = {email}
                onChange = {(e)=>{
                    setEmail(e.target.value);
                }}></Input><br/>

                <Label for = "contactNo">Phone number</Label><br/>
                <Input type = "number"  pattern = "[0-9]{10}" title = "Enter a 10 digit phone number starting with 0"
                name = "contactNo" value = {contactNo}
                onChange = {(e)=>{
                    setContactNo(e.target.value);
                }}></Input><br/>

                <Label for = "nic">National ID</Label><br/>
                <Input type = "text"  title = "Enter a valid Driver License ID, EX : 785678640V" 
                name = "nic" value = {nic} pattern="[0-9]{9}[V]{1}"
                onChange = {(e) =>{
                    setNic(e.target.value);
                }}/><br/>

                <Label for = "firstName">First Name</Label><br/>
                <Input type = 'text' 
                pattern="[A-Za-z]+" title = "Please Enter Only Capital or Simple Letters, EX : Kanishka" 
                name = "firstName" value = {firstName} 
                onChange = {(e)=>{
                    setFirstName(e.target.value);
                }}></Input><br/>

                <Label for = "lastName">Last Name</Label><br/>
                <Input type = 'text' 
                pattern="[A-Za-z]+" title = "Please Enter Only Capital or Simple Letters, EX : Kanishka" 
                name = "lastName" value = {lastName} 
                onChange = {(e)=>{
                    setLastName(e.target.value);
                }}></Input><br/>

                <Label for = "gender">Gender</Label><br/>
                <Input type = "text" name = "gender" value = {gender} 
                onChange = {(e) =>{
                    setGender(e.target.value);
                }}></Input><br/>

               
                <Label for = "password">Password</Label><br/>
                <Input type = "text" 
                 pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" 
                 title = "Enter Password with at least one number and one uppercase and lowercase letter, and at least 6 or more characters, EX : Pass1234" 
                name = "password" value = {password} 
                onChange = {(e) =>{
                    setPassword(e.target.value);
                }}></Input><br/>

             

              

                
                <Button type = "submit" color = "warning" style = {{float:'right' , margin : "5px" }} 

                >Edit User</Button>

            </form>    
            </div>
            
        </div>   
        </div>

    );
}

export default EditUser;