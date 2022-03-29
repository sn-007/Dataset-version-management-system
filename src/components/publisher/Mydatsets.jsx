import React from 'react';
import './index.css';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import Stack from '@mui/material/Stack';


function Mydatsets() {
    return (

        <div className="container">
            


            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <ListItem alignItems="center" sx={{ '&:hover': { backgroundColor: '#eeeeee', justifyContent: 'center' } }}>

                    <ListItemText
                        primary="Dataset-1"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Published on :
                                </Typography>
                                {"11th November 2022"}
                            </React.Fragment>
                        }
                    />

                    <Stack direction="row" spacing={3}>
                        <Button variant="outlined" startIcon={<DeleteIcon />}>
                            Delete
                        </Button>
                        <Button variant="contained" endIcon={<UpdateIcon />}>
                            Update
                        </Button>
                    </Stack>


                </ListItem>

                <Divider variant="inset" component="li" />

                






            </List>



        </div >




    )
}

export default Mydatsets