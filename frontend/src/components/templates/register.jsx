import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";

import "./index.css";




//register form for publisher, we need name, username, email, password, confirm password

const defaultValues = {
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",

};

const Registerform = () => {
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
        event.preventDefault();
        console.log(formValues);
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

                    <TextField
                        id="name-input"
                        name="name"
                        label="Name"
                        type="text"
                        variant='filled'
                        value={formValues.name}
                        onChange={handleInputChange}
                        sx={{ width: '40%', margin: '10px' }}
                    />

                    <TextField
                        id="username-input"
                        name="username"
                        label="Username"
                        type="text"
                        variant='filled'
                        value={formValues.username}
                        onChange={handleInputChange}
                        sx={{ width: '40%', margin: '10px' }}
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
                    />

                    <div style={{ flexDirection: 'row', display: 'flex', marginTop: '5vh' }} >

                        <Button variant="contained" color="primary" type="submit" sx={{ marginRight: '20px', width: '7vw' }}
                        onClick = { ()=>{navigate("/login",{}); } }
                        >
                            Login
                        </Button>

                        <Button variant="contained" color="primary" type="submit" sx={{ marginLeft: '20px', width: '8vw' }}>
                            Register
                        </Button>



                    </div>


                </Grid>
            </form>
        </div>
    );
};

export default Registerform;
