import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import axios from "axios";
import backendConstants from "./backendConstants";
import { useAlert } from 'react-alert'

import "./index.css";




//register form for publisher, we need name, username, email, password, confirm password

const defaultValues = {
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    groups:"2"

};

const Registerform = () => {
    const alert = useAlert();
    const [formValues, setFormValues] = useState(defaultValues);
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        //send the form values to the server
        event.preventDefault();
        //console.log(formValues);
        //check if the password and confirm password are the same
        if (formValues.password !== formValues.confirmPassword) {
            alert.show("password-mismatch",{type:'error'});
            return;
        }
        //send the form values to the server
        // http POST ":8000/users/register/"
        let url = backendConstants.url + "users/register/";
        console.log(url)
        axios.post("http://10.1.38.115:8000/users/register/", formValues)
            .then(res => {
                let user = res.data;
                localStorage.setItem("user", JSON.stringify(user));
                console.log("user", user);
                navigate("/mydatasets");
            }
            )
            .catch(err => {
                console.log("err", err);
                if (err.response.status === 400) {
                    //display error message
                    
                    alert.show(err.response.data.message,{type:'error'});
                    
                }
                else if (err.response.status === 500) {
                    alert.show("Internal server error");
                }
            }
            );



    };

    return (
        <div className='FormContainer'>
            <Box
                component="img"
                sx={{
                    height: 100,
                    width: 100,
                    maxHeight: { xs: 233, md: 167 },
                    maxWidth: { xs: 350, md: 250 },
                    alignSelf: "center",


                }}
                src="https://d1hl0z0ja1o93t.cloudfront.net/wp-content/uploads/2017/04/21165916/logo2.png"
            />

            <form onSubmit={handleSubmit} sx={{ alignItems: 'center', justifyContent: 'center' }}>
                <Grid container alignItems="center" justify="center" display='flex' direction='column'>

                    <div style={{ display: 'flex', flexDirection: 'row' }}>

                        <TextField
                            id="first_name-input"
                            name="first_name"
                            label="First Name"
                            type="text"
                            variant='filled'
                            value={formValues.first_name}
                            onChange={handleInputChange}
                            sx={{ width: '50%', margin: '10px' }}
                            size="small"
                        />

                        <TextField
                            id="last_name-input"
                            name="last_name"
                            label="Last Name"
                            type="text"
                            variant='filled'
                            value={formValues.last_name}
                            onChange={handleInputChange}
                            sx={{ width: '50%', margin: '10px' }}
                            size="small"
                        />

                    </div>

                    <TextField
                        id="username-input"
                        name="username"
                        label="Username"
                        type="text"
                        variant='filled'
                        value={formValues.username}
                        onChange={handleInputChange}
                        sx={{ width: '40%', margin: '10px' }}
                        size="small"
                    />

                    <TextField
                        id="email-input"
                        name="email"
                        label="Email"
                        type="email"
                        variant='filled'
                        value={formValues.email}
                        onChange={handleInputChange}
                        sx={{ width: '40%', margin: '10px' }}
                        size="small"
                    />

                    <TextField
                        id="password-input"
                        name="password"
                        label="Password"
                        type="password"
                        variant='filled'
                        value={formValues.password}
                        onChange={handleInputChange}
                        sx={{ width: '40%', margin: '10px' }}
                        size="small"
                    />

                    <TextField
                        id="confirm-password-input"
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        variant='filled'
                        value={formValues.confirmPassword}
                        onChange={handleInputChange}
                        sx={{ width: '40%', margin: '10px' }}
                        size="small"
                    />

                    <div style={{ flexDirection: 'row', display: 'flex', marginTop: '5vh' }} >

                        <Button variant="contained" color="primary" type="submit" sx={{ marginRight: '20px', width: '8vw' }}

                        >
                            Register
                        </Button>

                        <Button variant="contained" color="primary" sx={{ marginLeft: '20px', width: '7vw' }}
                            onClick={() => { navigate("/login", {}); }}
                        >
                            Login
                        </Button>



                    </div>


                </Grid>
            </form>
        </div>
    );
};

export default Registerform;
