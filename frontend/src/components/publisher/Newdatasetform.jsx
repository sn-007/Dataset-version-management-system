import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import axios from "axios";
import { Box } from "@mui/system";
import backendConstants from "../templates/backendConstants";
import { useNavigate } from "react-router";
import { Audio } from 'react-loader-spinner';
import { TailSpin } from "react-loader-spinner";
import Navbar from '../templates/Navbar';
import './index.css';



import Button from "@mui/material/Button";
import { useAlert } from "react-alert";

const defaultValues = {
    name: "",
    description: "",
    source: "",
    status: "R",
    reference: null,
    //publisher: JSON.parse(localStorage.getItem('user')).id,


};
const Newdatasetform = () => {
    let navigate = useNavigate();

    React.useEffect(() => {
        if (localStorage.getItem('user')) {
            let user = JSON.parse(localStorage.getItem('user'));
            if (user.group == "publisher") {
                //do nothing
            }
            else if (user.group == "admin") {
                navigate("/approve");
            }
            else {
                navigate("/login");
            }
        }
        else {
            navigate("/login");
        }
    }, [navigate]);




    const alert = useAlert();
    const [formValues, setFormValues] = useState(defaultValues);
    const [load, setLoad] = useState(false);




    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const boolvalue = (name === "reference");
        if (!boolvalue) {
            setFormValues({
                ...formValues,
                [name]: value,
            });
        }

    };

    const hiddenFileInput = React.useRef(null);

    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        setFormValues({
            ...formValues,
            'reference': fileUploaded,
        });

    };

    const handleClick = (event) => {
        hiddenFileInput.current.click();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        //through an alert if reference is not selected
        if (formValues.reference == null) {
            alert.show("Please select a file", { type: 'error' });
            return;
        }
        






        //post these dataset to the url 10.1.38.115:8000/api/tempdatasets/
        var formData = new FormData();
        formData.append('name', formValues.name);
        formData.append('description', formValues.description);
        formData.append('source', formValues.source);
        formData.append('status', formValues.status);
        formData.append('reference', formValues.reference, formValues.reference.name);
        //console.log(formValues);

        let url = backendConstants.url + "tempdatasets/";
        setLoad(true);
        axios.post('api/api/tempdatasets/', formData, {
            headers: {
                'Authorization': 'Token ' + JSON.parse(localStorage.getItem('user')).token,
            }
        },
            {

            }
        )
            .then(res => {
                setLoad(false);
                console.log("res", res);
                alert.show("Dataset created successfully", { type: 'success' });
                setFormValues(defaultValues);
                navigate("/mypendingdatasets");
            }
            )
            .catch((err) => {
                setLoad(false);
                console.log("err request", err.request);
                console.log("err response", err.response);
                if (err.response.data.reference) {
                    alert.show(err.response.data.reference[0], { type: 'error' })
                }
                else {
                    alert.show(err.response.data.detail, { type: 'error' });
                }
            }
            );
    };




    return (
        <div className='myDatasets'>

            <Navbar />            
            
                


            <Box
                component="img"
                sx={{
                    height: 200,
                    width: 200,
                    maxHeight: { xs: 233, md: 167 },
                    maxWidth: { xs: 350, md: 250 },
                    alignSelf: "center",
                    marginTop: "7vh",

                }}
                src="https://d1hl0z0ja1o93t.cloudfront.net/wp-content/uploads/2017/04/21165916/logo2.png"
            />

            


            <div className="myDatasets-heading">
                

            
            
                <h2>NEW DATASET UPLOAD</h2>
            </div>
            <form onSubmit={handleSubmit} sx={{ alignItems: 'center', justifyContent: 'center' }}>
                <Grid container alignItems="center" justify="center" display='flex' direction='column'>



                    <TextField
                        id="name-input"
                        name="name"
                        label="Name of the Dataset"
                        type="text"
                        variant='filled'
                        value={formValues.name}
                        onChange={handleInputChange}
                        sx={{ width: '50%', margin: '10px' }}
                        required
                    />

                    <TextField
                        id="filled-textarea"
                        name="description"
                        label="Description"

                        type="text"
                        variant='filled'
                        value={formValues.description}
                        onChange={handleInputChange}
                        sx={{ width: '50%', margin: '10px' }}
                        required

                    />

                    {/* create a filed for collecting source url */}
                    <TextField
                        id="source"
                        name="source"
                        label="Source"
                        type="url"
                        variant='filled'
                        value={formValues.source}
                        onChange={handleInputChange}
                        sx={{ width: '50%', margin: '10px' }}
                        required
                    />
                    <div style={{ margin: '20px', alignSelf: 'flex-start', display: 'flex', flexDirection: 'row' }}>

                        {/* create a styled button for collecting reference */}
                        <Button variant='contained' color="primary" onClick={handleClick}>
                            Upload a file
                        </Button>
                        <input type="file" style={{ display: 'none' }} ref={hiddenFileInput} onChange={handleChange} />
                        {
                            formValues.reference &&


                            <Typography mt={2} sx={{ fontSize: '10px', color: 'green', margin: '10px' }}>
                                {formValues.reference.name}
                            </Typography>
                        }

                    </div>


                    <Button variant="contained" color="primary" type="submit" disabled={load}>
                        Submit
                    </Button>

                    {
                        load &&

                        <div
                            style={{
                                width: "100%",
                                height: "100",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                position: "absolute",
                                top: "5%",
                            }}
                        >
                            <TailSpin color="#00BFFF" height={160} width={160} ariaLabel='loading' />
                            
                        </div>

                    }





                </Grid>
            </form>
        </div>
    );
};
export default Newdatasetform;
