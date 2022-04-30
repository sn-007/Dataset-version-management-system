import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import './App.css';
import Approverejects from "./components/admin/Approverejects";
import Mydatasets from './components/publisher/Mydatsets';
import Newdatasetform from './components/publisher/Newdatasetform';
import Datasetsdisplayhome from './components/user/Datasetsdisplayhome'
import Eachdatasetinfo from './components/user/Eachdatasetinfo'
import Loginform from './components/templates/login';
import Registerform from './components/templates/register';
import Versionupdate from './components/publisher/Versionupdate';
import Eachtempdatasetinfo from './components/admin/EachTempDatasetinfo';
import Card from './components/templates/Card';
import Mypendingdatasets from './components/publisher/Mypendingdatasets';

function App() {
  return (
    
    <Router>

      <Routes>
        <Route path="/" element={<Datasetsdisplayhome />} />
        <Route path="/mydatasets" element={<Mydatasets />} />
        <Route path="/approve" element={<Approverejects />} />
        <Route path="/newdataset" element={<Newdatasetform />} />
        <Route path="/viewinfo" element={<Eachdatasetinfo />} />
        <Route path="/login" element={<Loginform />} />
        <Route path="/register" element={<Registerform />} />
        <Route path="/:id" element={<Eachdatasetinfo />} />
        <Route path="/newversion/:id" element={<Versionupdate />} />
        <Route path="/admincheck/:id" element={<Eachtempdatasetinfo />} />
        <Route path="/card" element={<Card />} />
        <Route path="/mypendingdatasets" element={<Mypendingdatasets />} />


      </Routes>

    </Router>
    

    







  );
}

export default App;
