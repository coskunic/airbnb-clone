import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeList from "./pages/HomeList";
import HomeDetails from "./pages/HomeDetails";
import AddHome from "./pages/AddHome";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeList />} />
        <Route path="/homes/:id" element={<HomeDetails />} />
        <Route path="/add-home" element={<AddHome />} />
      </Routes>
    </Router>
  );
};
export default App;
