import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from "@mui/material/CssBaseline";
import { makeStyles, useTheme } from "@material-ui/core/styles"
import useMediaQuery from '@mui/material/useMediaQuery';


import DrawerComponent from "./Drawer";
import { Button } from "@mui/material";
import Stack from '@mui/material/Stack';
import { useNavigate } from "react-router-dom"
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import axios from "axios";

import Divider from '@mui/material/Divider';
const useStyles = makeStyles((theme) => ({
    navlinks: {
        marginLeft: theme.spacing(5),
        display: "flex",
    },
    logo: {
        flexGrow: "1",
        cursor: "pointer",
    },
    link: {
        textDecoration: "none",
        color: "white",
        fontSize: "20px",
        marginLeft: theme.spacing(20),
        "&:hover": {
            color: "yellow",
            borderBottom: "1px solid white",
        },
    },
}));

function Navbar() {
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const navigate = useNavigate();

    const [publisher, setPublisher] = React.useState(false);
    const [admin, setAdmin] = React.useState(false);
    const [unauth, setUnauth] = React.useState(true);


    React.useEffect(() => {
        if (localStorage.getItem("user") != null) {
            let user = JSON.parse(localStorage.getItem('user'));
            if (user.group == "admin") {
                setAdmin(true);
                setUnauth(false);
            }
            else if (user.group == "publisher") {
                setPublisher(true);
                setUnauth(false);
            }
            else {
                setUnauth(true);
            }
        }


    }, []);


    const sendMessage = () => {
        navigate("/newdataset");
    }

    const sendMessage1 = () => {
        navigate("/mydatasets");
    }

    const sendMessage3 = () => {
        navigate("/mypendingdatasets");
    }

    const sendMessage2 = () => {

        axios.get("http://10.1.38.115:8000/users/logout/",
            {
                headers: {
                    'Authorization': 'Token ' + JSON.parse(localStorage.getItem('user')).token,
                }
            }

        )
            .then(res => {
                console.log(res);
                localStorage.removeItem('user');
                navigate("/");
            })

            .catch(err => {
                console.log(err);
            });
    }
    return (
        <AppBar position="static">
            <CssBaseline />
            <Toolbar>
                <IconButton >
                    <Avatar alt="IIITH" src="https://d1hl0z0ja1o93t.cloudfront.net/wp-content/uploads/2017/04/21165916/logo2.png" variant="square" />
                </IconButton>

                {isMobile ? (
                    <DrawerComponent />
                ) : (
                    <Stack direction="row" spacing={6} justifyContent="left" >

                        <Button onClick={() => { }}
                            sx={{
                                my: 2, color: 'white', display: 'none', "&:hover": {
                                    backgroundColor: 'white',
                                    color: 'blue',
                                }
                            }}>

                            New Data Set
                        </Button>

                        {
                            publisher &&

                            <Button onClick={sendMessage}
                                sx={{
                                    my: 2, color: 'white', display: 'block', "&:hover": {
                                        backgroundColor: 'white',
                                        color: 'blue',
                                    }
                                }}>

                                New Data Set
                            </Button>

                        }

                        {
                            publisher &&
                            <Button onClick={sendMessage1}

                                sx={{
                                    my: 2, color: 'white', display: 'block', "&:hover": {
                                        backgroundColor: 'white',
                                        color: 'blue',
                                    }
                                }}
                            >
                                My Data Sets
                            </Button>

                        }

                        {
                            publisher &&
                            <Button onClick={sendMessage3}

                                sx={{
                                    my: 2, color: 'white', display: 'block', "&:hover": {
                                        backgroundColor: 'white',
                                        color: 'blue',
                                    }
                                }}
                            >
                                Pending Data Sets
                            </Button>

                        }





                        {
                            !unauth &&
                            <Button onClick={sendMessage2}

                                sx={{
                                    my: 2, color: 'white', display: 'block', "&:hover": {
                                        backgroundColor: 'white',
                                        color: 'blue',
                                    }
                                }}
                            >
                                Logout
                            </Button>

                        }




                    </Stack>

                )}
            </Toolbar>
        </AppBar>
    );
}
export default Navbar;
