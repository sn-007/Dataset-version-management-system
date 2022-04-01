import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";


import Button from "@mui/material/Button";
const defaultValues = {
    dataSetName: "",
    dataSetDescription: "",
};
const Newdatasetform = () => {
    const [formValues, setFormValues] = useState(defaultValues);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formValues);
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
                        name="dataSetName"
                        label="Name of the Dataset"
                        type="text"
                        variant='filled'
                        value={formValues.name}
                        onChange={handleInputChange}
                        sx={{ width: '50%', margin: '10px' }}
                    />

                    <TextField
                        id="filled-textarea"
                        name="dataSetDescription"
                        label="Description"
                        multiline
                        type="text"
                        variant='filled'
                        value={formValues.dataSetDescription}
                        onChange={handleInputChange}
                        sx={{ width: '50%', margin: '10px' }}
                    />
{/* file Upload example https://www.laravelcode.com/post/how-to-upload-files-in-reactjs-with-example */}

                    <Button variant="contained" color="primary" type="submit">
                        Submit
                    </Button>

                </Grid>
            </form>
        </div>
    );
};
export default Newdatasetform;