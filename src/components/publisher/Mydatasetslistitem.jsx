import React from 'react';


import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import Stack from '@mui/material/Stack';

//A component for using iteratively later in the list

export default function MyDatasetslistitem({info}) {
    return (

        <div>
            <ListItem alignItems="center" sx={{ '&:hover': { backgroundColor: '#eeeeee', justifyContent: 'center' } }}>

                <ListItemText
                    primary={info.name}
                    secondary={
                        <React.Fragment sx={{fontSize: '10px' }}>
                            <Typography
                                sx={{ display: 'inline', fontSize: '10px' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                Published on : {info.date}
                            </Typography>

                        {/* display description on a new line*/}
                            <Typography
                                sx={{ display: 'block', fontSize: '10px' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {info.description}
                            </Typography>

                            
                            
                        </React.Fragment>
                    }
                    
                />

                <Stack direction="row" spacing={3}>
                    <Button variant="outlined" startIcon={<DeleteIcon />} onClick = {()=>{}}>
                        Delete
                    </Button>
                    <Button variant="contained" endIcon={<UpdateIcon />} onClick = {()=>{}}>
                        Update
                    </Button>
                </Stack>


            </ListItem>

            <Divider variant="inset" component="li" />

        </div>


    )
}