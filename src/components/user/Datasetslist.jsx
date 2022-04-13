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
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import FeedIcon from '@mui/icons-material/Feed';
import SearchBar from './search'

export default function Datasetslist({info}) {
  return (
    <div>

<List alignItems="center" sx={{ '&:hover': { backgroundColor: '#eeeeee', justifyContent: 'center' } }}>
      <Card> 
       <CardActionArea href="https://google.com">
      <ListItem>
      <ListItemAvatar>
          <Avatar>
            <FeedIcon />
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