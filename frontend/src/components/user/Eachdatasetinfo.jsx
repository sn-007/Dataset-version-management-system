import * as React from "react";
import Box from "@mui/material/Box";

import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { green, pink, blue } from "@mui/material/colors";
import "./index.css";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useNavigate } from "react-router-dom";
import Navbar from "../templates/Navbar";

import Table from "@mui/material/Table";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import Button from "@mui/material/Button";
import Versioncard from "./Versioncard";

import "./Eachdatasetinfo.css";

const convertDate = (date) => {
  let newDate = new Date(date);
  let day = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  return day + "/" + month + "/" + year;
};

export default function Eachdatasetdatasetinfo() {
  const params = useParams();
  const navigate = useNavigate();

  const defaultDataset = {
    name: "Dataset 1",
    description: "This is the first dataset",
    first_name: "John",
    last_name: "Doe",
    date: "01/01/2020",
    id: 0,
    username: "",
    publisherId: "-1",
    versions: [],
    source: "",
  };
  const [dataset, setDataset] = useState(defaultDataset);
  const [publisher, setPublisher] = React.useState(false);
  //rewuest to get dataset with a particular ID from backend
  useEffect(() => {
    axios
      .get("api/datasets/" + params.id, {
        headers: {},
      })

      .then((res) => {
        console.log("res", res.data);
        setDataset(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  //check if user is logged in or not from localstorage
  React.useEffect(() => {
    if (localStorage.getItem("user") != null) {
      let user = JSON.parse(localStorage.getItem("user"));
      if (user.group == "publisher") {
        setPublisher(true);
      }
    }
  }, []);

  return (
    <div className="info-container1">
      <Navbar />

      <div className="info-container">
        <div className="info-heading">
          <h1>{dataset.name}</h1>
        </div>

        {/*render a table to show the information of the dataset with coloumns as headers*/}
        <div className="info-table-container">
          <Table aria-label="simple table">
            <TableRow>
              <TableCell className="info-table-head">
                <b>Name</b>
              </TableCell>
              <TableCell>{dataset.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="info-table-head">
                <b>Description</b>
              </TableCell>
              <TableCell>{dataset.description}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="info-table-head">
                <b>Publisher</b>
              </TableCell>
              <TableCell>
                {dataset.first_name + " " + dataset.last_name}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="info-table-head">
                <b>Date</b>
              </TableCell>
              <TableCell>{convertDate(dataset.date)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="info-table-head">
                <b>Source</b>
              </TableCell>
              <TableCell>
                <a
                  target="_blank"
                  href={dataset.source}
                  style={{ cursor: "pointer", color: "green" }}
                >
                  {dataset.source}
                </a>
              </TableCell>
            </TableRow>
          </Table>
        </div>
        <div className="info-version-heading">
          <h1>Versions</h1>
          {publisher && (
            <AddCircleOutlineIcon
              className="version-add-btn"
              sx={{
                color: "black",
                fontSize: "4vh",
                marginLeft: "2vh",
                marginTop: "1.15vh",
              }}
              onClick={() => {
                navigate("/newversion/" + params.id);
              }}
            />
          )}
        </div>
        {/* Mapping the various versions of the datasets onto the dataset page */}
        <List className="list" sx={{ width: "100%" }}>
          {dataset.versions.map((version, index) => {
            console.log(version);
            return <Versioncard info={version} key={index} />;
          })}
        </List>
      </div>
    </div>
  );
}
