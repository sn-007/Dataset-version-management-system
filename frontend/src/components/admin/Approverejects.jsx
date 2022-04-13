import React from 'react'
import './index.css'
import Approverejectslistitem from './Approverejectslistitem'
import List from '@mui/material/List';

// render the list of datasets using myDatasetslistitem component 
function Approverejects() 
{
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

  return (
      <div>
    
        <div className="approverejects-heading">
            <h2>APPROVE/REJECT</h2>
        </div>
        <div className="approverejects-list">
            <List>
                {
                    data.map(
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