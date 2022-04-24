import React from 'react'
import './index.css'
import Approverejectslistitem from './Approverejectslistitem'
import List from '@mui/material/List';
import { useState, useEffect } from 'react';
import axios from 'axios';

// render the list of datasets using myDatasetslistitem component 
function Approverejects() {
    const data = [
        {
            'name': 'Dataset 1',
            'description': 'This is the first dataset',
            'date': '01/01/2020',
            'publisherName': 'Publisher 1'
        },
        {
            'name': 'Dataset 2',
            'description': 'This is the second dataset',
            'date': '01/01/2020',
            'publisherName': 'Publisher 2'
        },
        {
            'name': 'Dataset 3',
            'description': 'This is the third dataset',
            'date': '01/01/2020',
            'publisherName': 'Publisher 3'
        }
    ]
    const [datasets, setDatasets] = useState([]);

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

            <div className="approverejects-heading">
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