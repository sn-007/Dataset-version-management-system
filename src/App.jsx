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

function App() {
  return (
    <Router>
      
        <Routes>
        
        <Route path="/mydatasets"  element={ <Mydatasets />}/>
        <Route path="/approve" element={<Approverejects />}/>
        <Route path="/newdataset" element={<Newdatasetform />}/>

        </Routes>
        
    </Router>

    
      
      
      
      
    
  );
}

export default App;
