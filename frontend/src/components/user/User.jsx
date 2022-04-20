import { Button } from '@mui/material';
import React from 'react';
import Eachdatasetinfo from './Eachdatasetinfo';

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
    const params = useParams();
    const category = categories.find(category => {
        return parseInt(params.id) === category.id;
      });
   return (
   <>
    {/* <div>{category.name}</div> */}
    <Eachdatasetinfo info={category} />
    {/*
   <Link to={`${match.url}/1`}>
       {categories.find(cat=>cat.id === 1).name}
   </Link> */}
   </>
   );
};
export default User;