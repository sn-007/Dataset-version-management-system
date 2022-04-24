import React from 'react';

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert'

const convertDate = (date) => {

    let newDate = new Date(date);
    let day = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    return day + "/" + month + "/" + year;
}

//A component for using iteratively later in the list

export default function MyDatasetslistitem({info}) {
    let alert = useAlert();
    return (

        <div>

<Card>
<CardActionArea component={Link} to={`/${info.id}`}>


            <ListItem alignItems="center" sx={{ '&:hover': { backgroundColor: '#eeeeee', justifyContent: 'center' } }}>

                <ListItemText
                    primary={info.name}
                    secondary={
                        <React.Fragment >
                            <Typography
                                sx={{ display: 'inline', fontSize: '10px' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                Published on : {convertDate(info.date)}
                            </Typography>

                        {/* display description on a new line*/}
                        {/* <div style={{overflow: "hidden", textOverflow: "ellipsis", width: '11rem'}}>  */}
                            <Typography
                                sx={{ display: 'block', fontSize: '10px' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {info.description}
                            </Typography>
                            {/* </div> */}

                            
                            
                        </React.Fragment>
                    }
                    
                />
                

                {/* <Stack direction="row" spacing={3} >
                     <Button variant="outlined" startIcon={<DeleteIcon />} onClick = {()=>{}}>
                        Delete
                    </Button>
                    <Button variant="contained" endIcon={<UpdateIcon />} onClick = {()=>{
                        
                        alert.show('fuckoff');
                        
                    }}>
                        Update
                    </Button>
                </Stack> */}


            </ListItem>
            </CardActionArea>
            </Card>

            <Divider variant="inset" component="li" />

        </div>


    )
}