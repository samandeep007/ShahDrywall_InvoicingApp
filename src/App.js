import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Main from "./components/main";
import HomePage from "./components/cards";
import TabNavigation from "./components/TabNavigation";
import Invoice from "./components/Invoice";

export default function App() {
  return (
   <Router>
    <Routes>
      <Route path="/" Component={HomePage}/>
      <Route path="/calculator" Component={TabNavigation}/>
<Route path = '/invoice' Component={Invoice}/>
      </Routes>
   </Router>
  )
}
