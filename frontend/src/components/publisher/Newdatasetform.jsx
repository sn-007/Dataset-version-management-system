import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import axios from "axios";


import Button from "@mui/material/Button";
const defaultValues = {
    name: "",
    description: "",
    source: "",
    status:"P",
    //if user exists in localstorage set that to publisher else set empty
    //publisher:JSON.parse(localStorage.getItem('user')).id ? JSON.parse(localStorage.getItem('user')).id : "",
    reference: null,


};
const Newdatasetform = () => {
    const [formValues, setFormValues] = useState(defaultValues);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name != 'reference') {
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
        //console.log(formValues);

        //post these dataset to the url localhost:8000/api/tempdatasets/
        let formData = new FormData();
        formData.append('name', formValues.name);
        formData.append('description', formValues.description);
        formData.append('source', formValues.source);
        formData.append('status', formValues.status);
        formData.append('publisher', formValues.publisher);
        formData.append('reference', formValues.reference);
        axios.post('http://localhost:8000/api/tempdatasets/', formData)
            .then(res => {
                console.log("res", res);
                alert("Dataset created successfully");
                setFormValues(defaultValues);
            }
            )
            .catch(err => {
                console.log("err", err);
                if (err.response.status === 400) {
                    alert("Invalid email or password");
                }
                else if (err.response.status === 500) {
                    alert("Internal server error");
                }
                else {
                    alert("Error:", err);
                }
            }
            )


    };




    return (
        <div className='FormContainer'>

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
                        <input type="file" style={{ display: 'none' }} ref={hiddenFileInput} onChange={handleChange} required />
                        {
                            formValues.reference &&


                            <Typography mt={2} sx={{ fontSize: '10px', color: 'green', margin: '10px' }}>
                                {formValues.reference.name}
                            </Typography>
                        }

                    </div>


                    <Button variant="contained" color="primary" type="submit">
                        Submit
                    </Button>

                </Grid>
            </form>
        </div>
    );
};
export default Newdatasetform;