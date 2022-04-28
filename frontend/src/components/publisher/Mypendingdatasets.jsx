import React from 'react';
import './index.css';
import List from '@mui/material/List';
import { useNavigate } from "react-router-dom"
import { useState,useEffect } from 'react';
import axios from 'axios';
import Navbar from '../templates/Navbar';
import Card from '../templates/Card';
import './index.css';


// render the list of datasets using myDatasetslistitem component 



export default function Mypendingdatasets() {

    
    let navigate = useNavigate();
    let [datasets, setDatasets] = useState([]);

    useEffect(() => {
        if (localStorage.getItem('user')) {
            let user = JSON.parse(localStorage.getItem('user'));
            console.log("user", user);
            if (user.group === "admin") {
                navigate("/approve");
            } else if (user.group === "publisher") {
                navigate("/mypendingdatasets");
            } else {
                navigate("/login");
            }
        }
    }, [navigate]);

    useEffect(() => {
        

        if (localStorage.getItem('user') !== null) {
        axios.get("http://10.1.38.115:8000/api/tempdatasets/", {
            headers: {
                'Authorization': 'Token ' + JSON.parse(localStorage.getItem('user')).token,
                
                
            }
        })
            .then(res => {
                console.log("res", res);
                setDatasets(res.data);
            })
            .catch(err => {
                console.log("err", err);
            });

        }
        else
        {
            navigate("/login");
        }
    }, []); 
    



    return (
        <div className="myDatasets">
            <Navbar />
            
            <div className="myDatasets-heading" style={{marginTop:'20vh'}}>
                <h2>MY PENDING DATASETS</h2>
            </div>
            

                <List className='list' sx={{width: '100%', justifyContent:'center', alignItems:'center' }}>
                    {
                        datasets.map(
                            (dataset, index) => {
                                console.log(dataset)
                                return (
                                < Card info={dataset} key={index} />
                                )
                            }
                        )
                    }
                </List>

        </div>
    );
}


