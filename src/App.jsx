import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Landing from "./components/LandingPage/landingpage.jsx";
import Login from "./components/Login/login.jsx";
import Home from "./components/Home/home.jsx";
import One from "./components/One/once.jsx";
import History from "./components/History/history.jsx";
import Trouble from "./components/Troubles/trouble.jsx";
import Settings from "./components/Settings/setting.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/once" element={<One />} />
        <Route path="/history" element={<History />} />
        <Route path="/trouble" element={<Trouble />} />
        <Route path="/setting" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
