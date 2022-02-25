import './App.css';
import {Routes, Route } from "react-router-dom";
import Continent from "./components/Continent";
import Country from "./components/Country";
import NavMenu from "./components/NavMenu";

function App() {
  return (
    <div className="App">
      <NavMenu/>
      <Routes>
        {/* <Route exact path="/" element={<App/>} /> */}
        <Route path="/continent" element={<Continent/>} />
        <Route path="/country" element={<Country/>} />
        
      </Routes>
    </div>
  );
}

export default App;



