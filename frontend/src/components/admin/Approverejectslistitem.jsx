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

//A component for using iteratively later in the list

const convertDate = (date) => {

    let newDate = new Date(date);
    let day = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    return day + "/" + month + "/" + year;
}

const handleReject = (info) =>{
    //console.log(info);
    
    //sent a get request to the backend to reject the dataset
    //http://10.1.38.115:8000/api/reject/id
    let url = 'http://10.1.38.115:8000/api/reject/' + info.id;
    axios.get(url, {
        headers: {
            'Authorization': 'Token ' + JSON.parse(localStorage.getItem('user')).token,
        }

    })
        .then(res => {
            console.log("res", res);
        }
        )
        .catch(err => {
            console.log("err", err);
        }
        )

}

const handleAccept = (info) =>{
    //console.log(info);
    let url = 'http://10.1.38.115:8000/api/accept/' + info.id;
    axios.get(url, {
        headers: {
            'Authorization': 'Token ' + JSON.parse(localStorage.getItem('user')).token,
        }

    })
        .then(res => {
            console.log("res", res);
        }
        )
        .catch(err => {
            console.log("err", err);
        }
        )

}


export default function Approverejectslistitem({ info }) {


    return (

        <div>
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
                                {/* Published on: "01/01/2020" */}

                            </Typography>


                            {/* <Typography
                                sx={{ display: 'block', fontSize: '10px' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {info.publisher}
                            </Typography> */}



                        </React.Fragment>
                    }


                />

                <Stack direction="row" spacing={3}>
                    <Button variant="contained" size='small' sx={{color: 'white', backgroundColor:'red'}} startIcon={<ClearIcon />} onClick={() => {handleReject(info);}}>
                        Reject
                    </Button>
                    <Button variant="contained" size='small' sx={{color: 'white', backgroundColor:'green'}} endIcon={<CheckIcon />} onClick={() => {handleAccept(info);}}>
                        Accept
                    </Button>
                </Stack>

            </ListItem>

            <Divider variant="inset" component="li" />
        </div>

    )
}