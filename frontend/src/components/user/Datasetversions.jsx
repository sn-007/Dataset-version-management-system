import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FeedIcon from '@mui/icons-material/Feed';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { green, pink, blue } from '@mui/material/colors';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

const convertDate = (date) => {

    let newDate = new Date(date);
    let day = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    return day + "/" + month + "/" + year;
}


export default function Datasetversions({ info }) {
    return (
        

<List>
  
            <Card>
                <CardActionArea href={info.reference}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                {/* <FeedIcon /> */}
                            </Avatar>
                        </ListItemAvatar>


                        <ListItemText
                            primary={"Version:" + info.version}
                            secondary={
                                <React.Fragment >
                                    <Typography
                                        sx={{ display: 'inline', fontSize: '10px' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        Published on :{convertDate(info.date)}
                                    </Typography>

                                    {/* display description on a new line*/}
                                    <Typography
                                        sx={{ display: 'block', fontSize: '10px' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {info.comment}                         </Typography>



                                </React.Fragment>
                            }

                        />

                    </ListItem>
                </CardActionArea>
            </Card>


        </List>

        

    );
}