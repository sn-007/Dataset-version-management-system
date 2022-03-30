import React from 'react';


import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';


import Stack from '@mui/material/Stack';

//A component for using iteratively later in the list

export default function Approverejectslistitem({ info }) {
    return (

        <div>
            <ListItem alignItems="center" sx={{ '&:hover': { backgroundColor: '#eeeeee', justifyContent: 'center' } }}>

                <ListItemText
                    primary={info.name}
                    secondary={
                        <React.Fragment sx={{ fontSize: '10px' }}>
                            <Typography
                                sx={{ display: 'inline', fontSize: '10px' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                Published on : {info.date}
                            </Typography>


                            <Typography
                                sx={{ display: 'block', fontSize: '10px' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {info.publisherName}
                            </Typography>



                        </React.Fragment>
                    }


                />

                <Stack direction="row" spacing={3}>
                    <Button variant="contained" size='small' sx={{color: 'white', backgroundColor:'red'}} startIcon={<ClearIcon />} onClick={() => { }}>
                        Reject
                    </Button>
                    <Button variant="contained" size='small' sx={{color: 'white', backgroundColor:'green'}} endIcon={<CheckIcon />} onClick={() => { }}>
                        Accept
                    </Button>
                </Stack>

            </ListItem>

            <Divider variant="inset" component="li" />
        </div>

    )
}