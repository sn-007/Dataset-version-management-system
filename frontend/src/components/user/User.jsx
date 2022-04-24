import { Button } from '@mui/material';
import React from 'react';
import Eachdatasetinfo from './Eachdatasetinfo';
import axios from 'axios';
import useEffect from 'react';

import {
    useParams,
    Link
  } from "react-router-dom";
  const categories = [
    {
        'name': 'Dataset 1',
        'description': 'This is the first dataset',
        'date': '01/01/2020',
        id:0,
        'publisher':'John',
        'publisherId':'1234'
    },
    {
        'name': 'Dataset 2',
        'description': 'This is the second dataset',
        'date': '01/01/2020',
        id:1,
        'publisher':'Jane',
        'publisherId':'3456'

    },
    {
        'name': 'Dataset 3',
        'description': 'This is the third dataset',
        'date': '01/01/2020',
        id:2,
        'publisher':'Janus',
        'publisherId':'4567'

    }
 ];

const User = ({match}) => {
    const [datasets, setDatasets] = React.useState([]);
    useEffect(() => {
        axios.get("http://10.1.38.115:8000/api/datasets/", {
            headers: {}
        })
            .then(res => {
                console.log("res", res);
                setDatasets(res.data);
            })
            .catch(err => {
                console.log("err", err);
            });
    }, []);

    const params = useParams();
    const category = categories.find(category => {
        return parseInt(params.id) === category.id;
      });
   return (
   
    
    <Eachdatasetinfo info={category} />
    

   );
};
export default User;