import React from 'react'
import './index.css'
import Approverejectslistitem from './Approverejectslistitem'
import List from '@mui/material/List';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Audio } from 'react-loader-spinner';
import { useNavigate } from 'react-router';
import Navbar from '../templates/Navbar';
//https://www.npmjs.com/package/react-loader-spinner
//https://www.basefactor.com/react-how-to-display-a-loading-indicator-on-fetch-calls
// render the list of datasets using myDatasetslistitem component 

const lodingIcon = () => {
    return (
        <div
            style={{
                width: "100%",
                height: "100",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Audio
                height="100"
                width="100"
                color='grey'
                ariaLabel='loading'
            />
        </div>
    );
}

function Approverejects() {
    const navigate = useNavigate();
    const [datasets, setDatasets] = useState([]);


    //if user is not admin, redirect to login page
    useEffect(() => {
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
        else{
            navigate("/login");
        }
    }, [navigate]);


    //make get request to ""http://10.1.38.115:8000/api/tempdatasets/" to get all the datasets and store it in datasets
    useEffect(() => {
        

        if (localStorage.getItem('user')) {
            axios.get("http://10.1.38.115:8000/api/tempdatasets/", {
                headers: {
                    'Authorization': 'Token ' + JSON.parse(localStorage.getItem('user')).token,

                }
            })

                .then(res => {
                    setDatasets(res.data);
                    console.log("data", res.data);
                })
                .catch(err => {
                    console.log("err", err);
                })

        }

    }, []);





    

    
    return (



        <div>
            <Navbar />

            <div className="approverejects-heading" style={{paddingTop:'10vh'}}>
                <h2>APPROVE/REJECT</h2>
            </div>

            
            <div className="approverejects-list">
                <List>
                    {
                        datasets.map(
                            (dataset, index) => {
                                console.log(dataset)
                                return (
                                    < Approverejectslistitem info={dataset} key={index} />

                                )
                            }
                        )
                    }
                </List>
            </div>

        </div>
    )
}

export default Approverejects