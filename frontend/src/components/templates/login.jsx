import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import "./index.css";
import {useNavigate} from "react-router-dom"
import axios from 'axios';
import Button from "@mui/material/Button";
import backendConstants from "./backendConstants";


const defaultValues = {
    email: "",
    password: "",
};

//login form for publisher and admin
const Loginform = () => {

    const [formValues, setFormValues] = useState(defaultValues);
    let navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formValues);

        // http POST ":8000/users/login/" email="pub2@gmail.com" password="password"
        let url = backendConstants.url + "users/login/";
        axios.post('http://10.1.38.115:8000/users/login/', formValues)
        .then(res => {

            let user = res.data;
            localStorage.setItem('user', JSON.stringify(user));

            console.log("user",user);

            if (user.group == "admin") {
                navigate("/approve");
            } else if (user.group == "publisher") {
                navigate("/mydatasets");
            } else {
                navigate("/");
            }

        }
        )
        .catch(err => {
            console.log("err", err);
            if (err.response.status === 400) {
                alert("Invalid email or password");
            }
            else if (err.response.status === 500) {
                alert("Internal server error");
            }
            else {
                alert("Error:", err);
            }
        }
        )


    };
    

    useEffect(() => {
        // if user already logged in, redirect to home page
        if (localStorage.getItem('user')) {
            let user = JSON.parse(localStorage.getItem('user'));
            if (user.group == "admin") {
                navigate("/approve");
            }
            else if (user.group == "publisher") {
                navigate("/mydatasets");
            }
            else {
                navigate("/login");
            }
        }
    }, [navigate]);

    return (
        <div className='FormContainer' >
            <Box
                component="img"
                sx={{
                    height: 200,
                    width: 200,
                    maxHeight: { xs: 233, md: 167 },
                    maxWidth: { xs: 350, md: 250 },
                    alignSelf: "center",
                    
                }}
                src="https://d1hl0z0ja1o93t.cloudfront.net/wp-content/uploads/2017/04/21165916/logo2.png"
            />



            <form onSubmit={handleSubmit} sx={{ alignItems: 'center', justifyContent: 'center' }}>
                <Grid container alignItems="center" justify="center" display='flex' direction='column'>


                    <TextField
                        id="email-input"
                        name="email"
                        label="Email"
                        type="email"
                        variant='filled'
                        value={formValues.email}
                        onChange={handleInputChange}
                        sx={{ width: '30%', margin: '10px' }}
                    />

                    <TextField
                        id="password-input"
                        name="password"
                        label="Password"
                        type="password"
                        variant='filled'
                        value={formValues.password}
                        onChange={handleInputChange}
                        sx={{ width: '30%', margin: '10px' }}
                    />

                    <div style ={{flexDirection:'row', display:'flex', marginTop:'5vh'}} >

                    <Button variant="contained" color="primary" type="submit"sx={{marginRight:'20px', width:'7vw'}}>
                        Login
                    </Button>

                    <Button variant="contained" color="primary" type="submit" sx={{marginLeft:'20px', width:'8vw'}} 
                    onClick = { ()=>{navigate("/register",{}); } }
                    >
                        Register
                    </Button>



                    </div>

                </Grid>
            </form>
        </div>
    );

};

export default Loginform;