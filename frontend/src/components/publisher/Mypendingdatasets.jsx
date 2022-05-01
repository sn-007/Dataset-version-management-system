import React from "react";
import "./index.css";
import List from "@mui/material/List";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../templates/Navbar";
import Card from "../templates/Card";
import "./index.css";

// render the list of datasets using myDatasetslistitem component

export default function Mypendingdatasets() {
  let navigate = useNavigate();
  let [datasets, setDatasets] = useState([]);
  //setting conditions based on user authentication==publisher or not

  useEffect(() => {
    if (localStorage.getItem("user")) {
      let user = JSON.parse(localStorage.getItem("user"));
      console.log("user", user);
      if (user.group === "admin") {
        navigate("/approve");
      } else if (user.group === "publisher") {
        navigate("/mypendingdatasets");
      } else {
        navigate("/login");
      }
    }
  }, [navigate]);

  useEffect(() => {
    //retriving information on pending datasets for the particular user
    if (localStorage.getItem("user") !== null) {
      axios
        .get("api/tempdatasets/", {
          headers: {
            Authorization:
              "Token " + JSON.parse(localStorage.getItem("user")).token,
            g,
          },
        })
        .then((res) => {
          console.log("res", res);
          setDatasets(res.data);
        })
        .catch((err) => {
          console.log("err", err);
        });
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="myDatasets">
      <Navbar />

      <div className="myDatasets-heading" style={{ marginTop: "20vh" }}>
        <h2>MY PENDING DATASETS</h2>
      </div>

      {/* //mapping the pending datasets of the particular publsiher to the Card for viewing*/}

      <List
        className="list"
        sx={{ width: "100%", justifyContent: "center", alignItems: "center" }}
      >
        {datasets.map((dataset, index) => {
          console.log(dataset);
          return <Card info={dataset} block={true} key={index} />;
        })}
      </List>
    </div>
  );
}
