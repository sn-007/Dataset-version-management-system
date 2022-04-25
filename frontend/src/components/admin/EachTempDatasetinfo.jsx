import * as React from 'react';
import Box from '@mui/material/Box';

import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Datasetversions from '../user/Datasetversions';
import Avatar from '@mui/material/Avatar';
import { green, pink, blue } from '@mui/material/colors';
import "./index.css";
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {useNavigate} from "react-router-dom"
import Navbar from '../templates/Navbar';

const convertDate = (date) => {

    let newDate = new Date(date);
    let day = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    return day + "/" + month + "/" + year;
}


export default function Eachtempdatasetinfo() {

    const params = useParams();
    const navigate = useNavigate();


    const defaultDataset = {
        'name': 'Dataset 1',
        'description': 'This is the first dataset',
        'first_name': 'John',
        'last_name': 'Doe',
        'date': '01/01/2020',
        'id': 0,
        'username': '',
        'publisherId': '-1',
        'versions': [],
        'source': "",
    };
    const [dataset, setDataset] = useState(defaultDataset);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        axios.get("http://10.1.38.115:8000/api/tempdatasets/" + params.id, {
            headers: {
                'Authorization': 'Token ' + JSON.parse(localStorage.getItem('user')).token,
            }
        })

            .then(res => {
                console.log("res", res.data);
                setDataset(res.data);

            })
            .catch(err => {
                console.log("err", err);
            });
    }, []);

    //check if user is logged in or not from localstorage
    useEffect(() => {
        if (localStorage.getItem("user") != null) {
            setLoggedIn(true);
        }
    }, []);


    


    return (



        <div className="myDatasets" style={{paddingLeft:'1vw'}}>
            <Navbar/>
            <div className="myDatasets-heading" style={{marginTop:'10vh'}}>

                <h1>{dataset.name}</h1>

            </div>

            <div>
                <Box sx={{ width: '100%' }}>



                    <Stack direction="row" spacing={3}>
                        <Avatar sx={{ width: '10vh', height: '10vh', bgcolor: blue[500] }}>
                            {dataset.username.charAt(0).toUpperCase()}
                        </Avatar>

                        <Box pt={1} sx={{ height: '20vh', width: '100vh' }} >
                            <Typography variant='h5' style={{ color: "black", marginTop:'2vh' }} >
                            {dataset.username.toUpperCase()}
                            </Typography>
                            <Typography variant='body1' >
                                
                            </Typography>
                        </Box>
                    </Stack>

                    <h2>Description</h2>


                    <Typography mt={1} variant="body1" gutterBottom>
                        {dataset.description}
                    </Typography>

                    <Typography mt={1} variant="body1" gutterBottom>
                        {convertDate(dataset.date)}
                    </Typography>

                    <Typography mt={1} variant="body1" gutterBottom>
                        <a href={dataset.source}>
                            Source
                        </a>
                    </Typography>








    

                </Box>


            </div>
        </div>

    );
}

