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

      </Routes>

    </Router>







  );
}

export default App;
