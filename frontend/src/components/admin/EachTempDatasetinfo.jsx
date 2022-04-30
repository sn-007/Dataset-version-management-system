import * as React from 'react';
import Box from '@mui/material/Box';


import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { useNavigate } from "react-router-dom"
import Navbar from '../templates/Navbar';
import './EachTempDatasetinfo.css';
import Button from '@mui/material/Button';
import { TailSpin } from "react-loader-spinner";


import Table from '@mui/material/Table';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';


import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { useAlert } from 'react-alert';

const convertDate = (date) => {

    let newDate = new Date(date);
    let day = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    return day + "/" + month + "/" + year;
}

//styled in myui



// get the dataset information and display the information in table format
export default function Eachtempdatasetinfo() {

    const params = useParams();
    const navigate = useNavigate();
    const alert = useAlert();
    const [load, setLoad] = useState(false);


    // useEffect(() => {
    //     const initialValue = document.body.style.zoom;

    //     // Change zoom level on mount
    //     document.body.style.zoom = "120%";

    //     return () => {
    //       // Restore default value
    //       document.body.style.zoom = initialValue;
    //     };
    //   }, []);
    const handleReject = (info) => {





        let url = 'api/api/reject/' + info.id;
        setLoad(true);
        axios.get(url, {
            headers: {
                'Authorization': 'Token ' + JSON.parse(localStorage.getItem('user')).token,
            }

        })
            .then(res => {
                setLoad(false);
                console.log("res", res);
                alert.show("Rejected!", { type: 'success' });
                navigate("/approve");
            }
            )
            .catch(err => {
                setLoad(false);
                console.log("err request", err.request);
                console.log("err response", err.response);
                if (err.response.data.reference) {
                    alert.show(err.response.data.reference[0], { type: 'error' })
                }
                else {
                    alert.show(err.response.data.detail, { type: 'error' });
                }




            }
            )

    };

    const handleAccept = (info) => {


        let url = 'api/api/accept/' + info.id;
        setLoad(true);
        axios.get(url, {
            headers: {
                'Authorization': 'Token ' + JSON.parse(localStorage.getItem('user')).token,
            }

        })
            .then(res => {
                setLoad(false);
                console.log("res", res);
                alert.show("Accepted!", { type: 'success' });
                navigate("/approve");
            }
            )
            .catch(err => {
                setLoad(false);
                console.log("err request", err.request);
                console.log("err response", err.response);
                if (err.response.data.reference) {
                    alert.show(err.response.data.reference[0], { type: 'error' })
                }
                else {
                    alert.show(err.response.data.detail, { type: 'error' });
                }




            }
            )

    }




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
        axios.get("api/api/tempdatasets/" + params.id, {
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


        <div className='tempContainer'>


            <Navbar />


            <div className='heading'>
                <h1>{dataset.name}</h1>
            </div>

            {/*render a table to show the information of the dataset with coloumns as headers*/}
            <div className="table-container">



                <Table aria-label="simple table">

                    <TableRow>
                        <TableCell className='table-head'><b>Name</b></TableCell>
                        <TableCell>{dataset.name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className='table-head'><b>Description</b></TableCell>
                        <TableCell>{dataset.description}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className='table-head'><b>Publisher</b></TableCell>
                        <TableCell>{dataset.first_name + " " + dataset.last_name}</TableCell>
                    </TableRow>
                    <TableRow  >
                        <TableCell className='table-head'><b>Date</b></TableCell>
                        <TableCell>{convertDate(dataset.date)}</TableCell>
                    </TableRow>
                    <TableRow >
                        <TableCell className='table-head'><b>Source</b></TableCell>
                        <TableCell><a target='_blank' href={dataset.source} style={{ cursor: 'pointer', color: 'green' }}>{dataset.source}</a></TableCell>
                    </TableRow>

                    <TableRow >
                        <TableCell className='table-head'><b>File</b></TableCell>
                        <TableCell><a target='_blank' href={dataset.reference} style={{ cursor: 'pointer', color: 'green' }}>Download</a></TableCell>
                    </TableRow>


                </Table>



            </div>


            <div className='button-container'>

                <Button variant="contained" size='large' sx={{ color: 'white', backgroundColor: 'red' }} startIcon={<ClearIcon />} onClick={(e) => { handleReject(dataset); }} disabled={load}>
                    Reject
                </Button>

                <Button variant="contained" size='large' sx={{ color: 'white', backgroundColor: 'green' }} endIcon={<CheckIcon />} onClick={(e) => { handleAccept(dataset); }} disabled={load}>
                    Accept
                </Button>


            </div>

            {
                        load &&

                        <div
                            style={{
                                width: "100%",
                                height: "100",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                position: "absolute",
                                top: "5%",
                            }}
                        >
                            <TailSpin color="#00BFFF" height={160} width={160} ariaLabel='loading' />
                            
                        </div>

                    }














        </div>

    );
}

