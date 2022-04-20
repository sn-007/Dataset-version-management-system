
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Paper } from '@mui/material';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Datasetslist from './Datasetslist';
import {useNavigate} from "react-router-dom"

// import SearchBar from 'material-ui-search-bar';

import SearchBar from './search'
const commonStyles = {
};
export default function Datasetsdisplayhome() {
    let navigate = useNavigate();
    const datasets = [
        {
            'name': 'Dataset 1',
            'description': 'This is the first dataset',
            'date': '01/01/2020',
            id: 0,
        },
        {
            'name': 'Dataset 2',
            'description': 'This is the second dataset',
            'date': '01/01/2020',
            id: 1,
        },
        {
            'name': 'Dataset 3',
            'description': 'This is the third dataset',
            'date': '01/01/2020',
            id: 2,
        }
    ]

    React.useEffect(() => {
        if (localStorage.getItem('user')) {
            let user = JSON.parse(localStorage.getItem('user'));
            console.log("user", user);
            if (user.group === "admin") {
                navigate("/approve");
            } else if (user.group === "publisher") {
                navigate("/mydatasets");
            } else {
                navigate("/");
            }
        }
    }, [navigate]);



    return (
        <div className="myDatasets">
            <div className="myDatasets-heading">
                <h2 >DATA FOUNDATION</h2>
            </div>

            <div className="myDatasets-list">
                <Stack direction="row" spacing={2} justifyContent="right" alignItems="flex-end" sx={{"margin":'10px'}}>

                    <Button variant="contained" color="info"
                    onClick={
                        () => {
                            navigate("/login");
                        }

                    }
                     >
                        Login
                    </Button>
                    <Button variant="outlined" color="info"
                    onClick={
                        () => {
                            navigate("/register");
                        }
                    }
                    >
                        Register
                    </Button>

                </Stack>
                <SearchBar />

                <br />
                <br />
                <br />       <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {
                        datasets.map(
                            (dataset, index) => {
                                console.log(dataset)
                                return (
                                    < Datasetslist info={dataset} key={index} />
                                )
                            }
                        )
                    }
                </List>

            </div>
        </div>
    );
}

