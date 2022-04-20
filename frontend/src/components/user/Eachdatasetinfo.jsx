import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Datasetversions from './Datasetversions';
import Avatar from '@mui/material/Avatar';
import { green, pink, blue } from '@mui/material/colors';
import "./index.css";
export default function Eachdatasetinfo({info}) {
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

                <h1>{info.name}</h1>

            </div>

            <div>
                <Box sx={{ width: '100%' }}>



                    <Stack direction="row" spacing={3}>
                        <Avatar sx={{ width: '10vh', height: '10vh', bgcolor: blue[500] }}>
                        {info.pubisher}
                        </Avatar>

                        <Box pt={1} sx={{ height: '20vh', width: '100vh' }} >
                            <Typography variant='h5' style={{ color: "#00adb5" }} >
                                {info.pubisher}
                            </Typography>
                            <Typography variant='body1' >
                                Publisher ID:{info.publisherId}
                            </Typography>
                        </Box>
                    </Stack>
                    
                    <h2>Description</h2>


                    <Typography mt={1}variant="body1" gutterBottom>
                        {info.description}
                    </Typography>

                    <Typography pt={4}variant="h4" gutterBottom component="div">
                        Versions
                    </Typography>

                </Box>

                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {
                        datasets.map(
                            (dataset, index) => {
                                console.log(dataset)
                                return (
                                    < Datasetversions info={dataset} key={index} />
                                )
                            }
                        )
                    }
                </List>

            </div>
        </div>

    );
}

