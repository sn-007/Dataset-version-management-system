import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route  
} from "react-router-dom";




import Approverejects from "./components/admin/Approverejects";
import './App.css';
import Mydatasets from './components/publisher/Mydatsets';

function App() {
  return (
    <Router>
      
        <Routes>
        
        <Route path="/mydatasets"  element={ <Mydatasets />}/>
        <Route path="/approve" element={<Approverejects />}/>

        </Routes>
        
    </Router>
    // <Router>
    //   <div>
    //     <nav>
    //       <ul>
    //         <li>
    //           <Link to="/">Mydatasets</Link>
    //         </li>
    //         <li>
    //           <Link to="/1">Approverejects</Link>
    //         </li>
            
    //       </ul>
    //     </nav>

    //     {/* A <Switch> looks through its children <Route>s and
    //         renders the first one that matches the current URL. */}
    //     <Switch>
    //       <Route path="/">
    //         <Mydatasets />
    //       </Route>
    //       <Route path="/users">
    //         <Approverejects />
    //       </Route>
          
    //     </Switch>
    //   </div>
    // </Router>


    
      
      
      
      
    
  );
}

export default App;
