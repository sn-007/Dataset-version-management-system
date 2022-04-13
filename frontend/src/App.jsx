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
import Datasetdisplay from './components/user/Datasetdisplay'
import Datasetinfoview from './components/user/Datasetinfoview'
import Loginscreen from './components/templates/login';

function App() {
  return (
    <Router>

      <Routes>

        <Route path="/mydatasets" element={<Mydatasets />} />
        <Route path="/approve" element={<Approverejects />} />
        <Route path="/newdataset" element={<Newdatasetform />} />
        <Route path="/display" element={<Datasetdisplay />} />
        <Route path="/viewinfo" element={<Datasetinfoview />} />
        <Route path="/login" element={<Loginscreen />} />

      </Routes>

    </Router>







  );
}

export default App;
