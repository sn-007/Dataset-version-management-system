import * as React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import FeedIcon from '@mui/icons-material/Feed';
import { Link } from 'react-router-dom';


const convertDate = (date) => {

    let newDate = new Date(date);
    let day = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    return day + "/" + month + "/" + year;
}

export default function Datasetslist({ info }) {
    


    
    return (
        <div>

            <List sx={{ '&:hover': { backgroundColor: '#eeeeee', justifyContent: 'center', alignItems: "center" } }}>
                <Card>
                    <CardActionArea component={Link} to={`/${info.id}`}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <FeedIcon />
                                </Avatar>
                            </ListItemAvatar>


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
                                            Published on :{convertDate(info.date)}
                                        </Typography>


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

                        </ListItem>
                    </CardActionArea>
                </Card>

            </List>
        </div>
        // </React.Fragment> */}
    );
}