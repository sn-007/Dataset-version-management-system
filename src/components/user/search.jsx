import { React, useState } from "react";
import TextField from "@mui/material/TextField";
function SearchBar() {
  return (
    <div className="main">
      <div className="search">
        <TextField
          id="outlined-basic"
          variant='filled'
          sx={{ width: '50%', margin: '10px' }}
          label="Search among datasets"
        />
      </div>
    </div>
  );
}

export default SearchBar;
