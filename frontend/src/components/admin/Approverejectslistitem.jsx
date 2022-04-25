import React from 'react';


import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';


import Stack from '@mui/material/Stack';
import axios from 'axios';
import { useState } from 'react';
import {useNavigate} from "react-router-dom"
import { Link } from 'react-router-dom';


//A component for using iteratively later in the list

const convertDate = (date) => {

    let newDate = new Date(date);
    let day = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    return day + "/" + month + "/" + year;
}



    





export default function Approverejectslistitem({ info}) {


    const [temp, setTemp] = useState(0);
    const navigate = useNavigate();
   


    const handleReject = (info) => {
        
        

        
        
        let url = 'http://10.1.38.115:8000/api/reject/' + info.id;
        axios.get(url, {
            headers: {
                'Authorization': 'Token ' + JSON.parse(localStorage.getItem('user')).token,
            }

        })
            .then(res => {
                console.log("res", res);
                window.location.reload(false);
                
                
            }
            )
            .catch(err => {
                console.log("err", err);
                
                

            }
            )

    }

    const handleAccept = (info) => {
        
        
        let url = 'http://10.1.38.115:8000/api/accept/' + info.id;
        axios.get(url, {
            headers: {
                'Authorization': 'Token ' + JSON.parse(localStorage.getItem('user')).token,
            }

        })
            .then(res => {
                console.log("res", res);
                window.location.reload(false);
            }
            )
            .catch(err => {
                alert('Error');
                window.location.reload(false);

            }
            )

    }




    //display loading icon if not submitted, else display component
    
        return (



            //below on click should not respond if the buttons are clicked
            <div  onClick={
                (e) => {
                    //check if the target is a button or not
                    if(e.target.tagName === "BUTTON"){
                        console.log('button clicked');
                    
                }
                else
                {
                    //alert('navigated');
                    
                    let url = '/admincheck/' + info.id;
                    navigate(url);
                }
            }

            }>
                <ListItem alignItems="center" sx={{ '&:hover': { backgroundColor: '#eeeeee', justifyContent: 'center' } }}>

                    <ListItemText
                        primary={info.name}
                        secondary={
                            <React.Fragment >
                                <Typography
                                    sx={{ display: 'inline', fontSize: '10px' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Published on : {convertDate(info.date)}
                                    

                                </Typography>


                                <Typography
                                sx={{ display: 'block', fontSize: '10px' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {info.description}
                            </Typography>



                            </React.Fragment>
                        }


                    />

                    <Stack direction="row" spacing={3}>
                        <Button variant="contained" size='small' sx={{ color: 'white', backgroundColor: 'red' }} startIcon={<ClearIcon />} onClick={(e) => { e.stopPropagation(); handleReject(info); }}>
                            Reject
                        </Button>
                        <Button variant="contained" size='small' sx={{ color: 'white', backgroundColor: 'green' }} endIcon={<CheckIcon />} onClick={(e) => { e.stopPropagation(); handleAccept(info); }}>
                            Accept
                        </Button>
                    </Stack>

                </ListItem>

                <Divider variant="inset" component="li" />
            </div>

        )

}