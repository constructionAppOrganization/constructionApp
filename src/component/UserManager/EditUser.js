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
    const [message , setMessage] = useState("");
   

    const {id} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:8078/users/get/${id}`).then((res) =>{

        console.log(res.data);
        setUsername(res.data.username);
        setEmail(res.data.email);
        setContactNo(res.data.contactNo);
        setNic(res.data.nic);
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setGender(res.data.gender);
      
        
        
        

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
            gender
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
                // pattern="[D]{1}-[0-9]{3}" title = "Enter a valid Driver  ID, EX : D-001"
                name = "username" value = {username}
                onChange = {(e) =>{
                    setUsername(e.target.value);
                }}></Input><br/>

                <Label for = "email">Email</Label><br/>
                <Input type = 'email' name = "email" value = {email} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title = "Enter a valid email"
                onChange = {(e)=>{
                    setEmail(e.target.value);
                }}></Input><br/>

                <Label for = "contactNo">Phone number</Label><br/>
                <Input type = "number" name = "contactNo" value = {contactNo} pattern = "[0-9]{10}" title = "Enter a 10 digit phone number starting with 0"
                onChange = {(e)=>{
                    setContactNo(e.target.value);
                }}></Input><br/>

                <Label for = "nic">National ID</Label><br/>
                <Input type = "text" name = "nic" value = {nic} pattern="[N]{1}-[0-9]{3}" title = "Enter a valid Driver License ID, EX : N-123" 
                onChange = {(e) =>{
                    setNic(e.target.value);
                }}/><br/>

                <Label for = "firstName">First Name</Label><br/>
                <Input type = 'text' name = "firstName" value = {firstName} 
                onChange = {(e)=>{
                    setFirstName(e.target.value);
                }}></Input><br/>

                <Label for = "lastName">Last Name</Label><br/>
                <Input type = 'text' name = "lastName" value = {lastName} 
                onChange = {(e)=>{
                    setLastName(e.target.value);
                }}></Input><br/>

                <Label for = "gender">Gender</Label><br/>
                <Input type = "text" name = "gender" value = {gender} 
                onChange = {(e) =>{
                    setGender(e.target.value);
                }}></Input><br/>

               

             

              

                
                <Button type = "submit" color = "warning" style = {{float:'right' , margin : "5px" }} 

                >Edit Driver</Button>

            </form>    
            </div>
            
        </div>   
        </div>

    );
}

export default EditUser;