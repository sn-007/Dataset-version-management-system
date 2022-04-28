import * as React from 'react';
import Box from '@mui/material/Box';

import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Datasetversions from './Datasetversions';
import Avatar from '@mui/material/Avatar';
import { green, pink, blue } from '@mui/material/colors';
import "./index.css";
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from "react-router-dom"
import Navbar from '../templates/Navbar';

import Table from '@mui/material/Table';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';

import "./Eachdatasetinfo.css";

const convertDate = (date) => {

    let newDate = new Date(date);
    let day = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    return day + "/" + month + "/" + year;
}


export default function Eachdatasetdatasetinfo() {

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
    const [publisher, setPublisher] = React.useState(false);

    useEffect(() => {
        axios.get("http://10.1.38.115:8000/api/datasets/" + params.id, {
            headers: {}
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
    React.useEffect(() => {
        if (localStorage.getItem("user") != null) {
            let user = JSON.parse(localStorage.getItem('user'));
            if (user.group == "publisher") {
                setPublisher(true);

            }
        }


    }, []);





    return (


        // <div className="myDatasets" >
        //     <Navbar />
        //     <div className="myDatasets-heading" style={{ marginTop: '15vh' }}>

        //         <h1>{dataset.name}</h1>

        //     </div>

        //     <div>
        //         <Box sx={{ width: '100%' }}>



        //             <Stack direction="row" spacing={3}>
        //                 <Avatar sx={{ width: '10vh', height: '10vh', bgcolor: blue[500] }}>
        //                     {dataset.username.charAt(0).toUpperCase()}
        //                 </Avatar>

        //                 <Box pt={1} sx={{ height: '20vh', width: '100vh' }} >
        //                     <Typography variant='h5' style={{ color: "black", marginTop: '2vh' }} >
        //                         {dataset.username.toUpperCase()}
        //                     </Typography>
        //                     <Typography variant='body1' >

        //                     </Typography>
        //                 </Box>
        //             </Stack>

        //             <h2>Description</h2>


        //             <Typography mt={1} variant="body1" gutterBottom>
        //                 {dataset.description}
        //             </Typography>

        //             <Typography mt={1} variant="body1" gutterBottom>
        //                 {convertDate(dataset.date)}
        //             </Typography>

        //             <Typography mt={1} variant="body1" gutterBottom>
        //                 <a href={dataset.source}>
        //                     Source
        //                 </a>
        //             </Typography>








        //             <div style={{ display: 'flex', flexDirection: 'row' }}>
        //                 {/* <Typography pt={4} variant="h4">
        //                     versions
        //                 </Typography> */}

        //                 <h2 style={{ paddingTop: '6vh' }}>Versions</h2>

        //                 {publisher &&
        //                 <AddCircleOutlineIcon sx={{ color: 'black', fontSize: '5vh', marginLeft: '2vh', marginTop: 5 }} onClick={() => {navigate("/newversion/" + params.id)}} />

        //                 }









        //                 {/* <AddCircleOutlineIcon sx={{ paddingTop: '5vh', marginLeft: 2, marginTop: 1.3 }} onClick={() => {
        //                     navigate('/newversion/' + params.id);
        //                 }} /> */}



        //             </div>


        //         </Box>




        //         <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        //             {
        //                 dataset.versions.map(
        //                     (version, index) => {
        //                         console.log(version);
        //                         return (
        //                             //<h1 key={index}>{version.reference}</h1>
        //                             < Datasetversions info={version} key={index} />
        //                         )
        //                     }
        //                 )
        //             }
        //         </List>

        //     </div>
        // </div>
        <div className='info-container'>


            <Navbar />


            <div className='info-heading'>
                <h1>{dataset.name}</h1>
            </div>

            {/*render a table to show the information of the dataset with coloumns as headers*/}
            <div className="info-table-container">



                <Table aria-label="simple table">

                    <TableRow>
                        <TableCell className='info-table-head'><b>Name</b></TableCell>
                        <TableCell>{dataset.name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className='info-table-head'><b>Description</b></TableCell>
                        <TableCell>{dataset.description}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className='info-table-head'><b>Publisher</b></TableCell>
                        <TableCell>{dataset.first_name + " " + dataset.last_name}</TableCell>
                    </TableRow>
                    <TableRow  >
                        <TableCell className='info-table-head'><b>Date</b></TableCell>
                        <TableCell>{convertDate(dataset.date)}</TableCell>
                    </TableRow>
                    <TableRow >
                        <TableCell className='info-table-head'><b>Source</b></TableCell>
                        <TableCell><a target='_blank' href={dataset.source} style={{ cursor: 'pointer', color: 'green' }}>{dataset.source}</a></TableCell>
                    </TableRow>


                </Table>



            </div>



            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                     {
                         dataset.versions.map(
                             (version, index) => {
                                 console.log(version);
                                 return (
                                     < Datasetversions info={version} key={index} />
                                 )
                             }
                         )
                     }
            </List>
        </div>




    );
}

