import "./App.css";
import { Routes, Route } from "react-router-dom";
import Continent from "./components/Continent";
import Country from "./components/Country";
import NavMenu from "./components/NavMenu";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <NavMenu />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/continent" element={<Continent />} />
        <Route path="/graphic" element={<Country />} />
      </Routes>
    </div>
  );
}

export default App;
