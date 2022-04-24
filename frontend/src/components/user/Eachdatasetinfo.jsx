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
import { useEffect,useState } from 'react';
import axios from 'axios';

const convertDate = (date) => {

    let newDate = new Date(date);
    let day = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    return day + "/" + month + "/" + year;
}


export default function Eachdatasetdataset() {
    
    const params = useParams();

    
    const defaultDataset = {
        'name': 'Dataset 1',
        'description': 'This is the first dataset',
        'date': '01/01/2020',
        'id': 0,
        'publisher':'John',
        'publisherId':'1234',
        'versions':[],
        'source':"",
    };
    const [dataset, setDataset] = useState(defaultDataset);
    
    useEffect(() => {
        axios.get("http://10.1.38.115:8000/api/datasets/"+params.id, {
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

    return (
        

        <div className="myDatasets">
             <div className="myDatasets-heading">

                <h1>{dataset.name}</h1>

            </div>

            <div>
                <Box sx={{ width: '100%' }}>



                    <Stack direction="row" spacing={3}>
                        <Avatar sx={{ width: '10vh', height: '10vh', bgcolor: blue[500] }}>
                        {dataset.publisher}
                        </Avatar>

                        <Box pt={1} sx={{ height: '20vh', width: '100vh' }} >
                            <Typography variant='h5' style={{ color: "#00adb5" }} >
                                {dataset.publisher}
                            </Typography>
                            <Typography variant='body1' >
                                Publisher ID:{dataset.publisher}
                            </Typography>
                        </Box>
                    </Stack>

                    <h2>Description</h2>


                    <Typography mt={1}variant="body1" gutterBottom>
                        {dataset.description}
                    </Typography>

                    <Typography mt={1}variant="body1" gutterBottom>
                        {convertDate(dataset.date)}
                    </Typography>

                    <Typography mt={1}variant="body1" gutterBottom>
                        <a href = {dataset.source}>
                            Source
                        </a>
                    </Typography>






                    <Typography pt={4}variant="h4" gutterBottom component="div">
                        Versions
                    </Typography>

                </Box>

                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {
                        dataset.versions.map(
                            (version, index) => {
                                console.log(version);
                                return (
                                    //<h1 key={index}>{version.reference}</h1>
                                    < Datasetversions info={version} key={index} />
                                )
                            }
                        )
                    }
                </List>

            </div>
        </div>

    );
}

