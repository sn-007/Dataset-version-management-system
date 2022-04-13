import React, {useState} from 'react';
import {Button} from '@mui/material';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';







// create a component to login form by taking inputs from username and password
const Loginscreen = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  

  const triggerLogin = () => {
        
  }



  return (
    <div>
        <Box m={2}>
            <FormControl fullWidth>
                <InputLabel htmlFor="my-input">Email</InputLabel>
                <Input

                    id="my-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    startAdornment={
                        <InputAdornment position="start">
                            <AccountCircle />
                        </InputAdornment>
                    }
                />
            </FormControl>
        </Box>
        <Box m={2}>
            <FormControl fullWidth>
                <InputLabel htmlFor="my-input">Password</InputLabel>
                <Input

                    id="my-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    startAdornment={
                        <InputAdornment position="start">
                            <AccountCircle />
                        </InputAdornment>
                    }
                />
            </FormControl>
        </Box>
        <Box m={2}>
            <Button variant="contained" color="primary" onClick={triggerLogin}>
                Login
            </Button>
        </Box>
      
    </div>

  );

}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     paddingTop: 15
//   },

//   logo: {
//     height:200,
//     width: 200,
//   },

//   input: {
//     width:300,
//     paddingBottom:5
//   },

//   button:{
//     width:200,
//     paddingBottom:10,
//   }
// });
export default Loginscreen;