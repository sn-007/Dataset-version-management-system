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
export default function Datasetversions({info}) {
    return (
        
<List alignItems="center" sx={{ '&:hover': { backgroundColor: '#eeeeee', justifyContent: 'center' } }}>
      <Card> 
       <CardActionArea href="https://google.com">
      <ListItem>
      <ListItemAvatar>
          <Avatar>
            {/* <FeedIcon /> */}
          </Avatar>
        </ListItemAvatar>
            
             
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
                                Published on :{info.date}
                            </Typography>

                        {/* display description on a new line*/}
                            <Typography
                                sx={{ display: 'block', fontSize: '10px' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
{info.description}                         </Typography>

                            
                            
                        </React.Fragment>
                    }
                    
                />

           </ListItem>
           </CardActionArea> 
      </Card>
         
      </List>
    );
}