import React from 'react';
import './index.css';
import MyDatasetslistitem from './Mydatasetslistitem';
import List from '@mui/material/List';



// render the list of datasets using myDatasetslistitem component 

export default function Mydatasets() {

    const datasets = [
        {
            'name': 'Dataset 1',
            'description': 'This is the first dataset',
            'date': '01/01/2020'
        },
        {
            'name': 'Dataset 2',
            'description': 'This is the second dataset',
            'date': '01/01/2020'
        },
        {
            'name': 'Dataset 3',
            'description': 'This is the third dataset',
            'date': '01/01/2020'
        }
    ]



    return (
        <div className="myDatasets">
            
            <div className="myDatasets-heading">
                <h2>MY DATASETS</h2>
            </div>
            <div className="myDatasets-list">

                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {
                        datasets.map(
                            (dataset, index) => {
                                console.log(dataset)
                                return (
                                < MyDatasetslistitem info={dataset} key={index} />
                                )
                            }
                        )
                    }
                </List>

            </div>
        </div>
    );
}


