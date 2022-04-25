import React, { useState } from "react";
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { makeStyles, useTheme } from "@material-ui/core/styles"
import MenuIcon from '@mui/icons-material/Menu';
import { Link, Navigate } from "react-router-dom";
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom"



function DrawerComponent() {
  // const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List>

          <ListItem onClick={() => navigate(`/`)}>
            <ListItemText>
              My DataSets
            </ListItemText>
          </ListItem>

          <Divider />

          <ListItem onClick={() => navigate(`/newdataset`)}>
            <ListItemText>
              New DataSet
            </ListItemText>
          </ListItem>

          <Divider />

          <ListItem onClick={() => navigate(`/register`)}>
            <ListItemText>Logout
            </ListItemText>
          </ListItem>

          <Divider />

        </List>

      </Drawer>

      <IconButton onClick={() => setOpenDrawer(!openDrawer)} color="inherit" style={{ bottom: 3, right: 3 }}>
        <MenuIcon />
      </IconButton>

    </>
  );
}
export default DrawerComponent;

