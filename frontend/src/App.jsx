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

function App() {
  return (
    <Router>

      <Routes>

        <Route path="/mydatasets" element={<Mydatasets />} />
        <Route path="/approve" element={<Approverejects />} />
        <Route path="/newdataset" element={<Newdatasetform />} />
        <Route path="/display" element={<Datasetsdisplayhome />} />
        <Route path="/viewinfo" element={<Eachdatasetinfo />} />

      </Routes>

    </Router>







  );
}

export default App;
