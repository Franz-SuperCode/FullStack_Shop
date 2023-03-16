import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/header/Header";
import Admin from "./pages/Admin";
import Shop from "./pages/Shop";
import Basket from "./pages/Basket";
import Detail from "./pages/Detail";
import About from "./pages/About";
import { createContext, useState } from "react";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
export const ThemeContext = createContext();

function App() {
  const [updatePage, setUpdatePage] = useState(false);

  return (
    <div className="App">
      <ThemeContext.Provider value={{ updatePage, setUpdatePage }}>
        <Router>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/basket" element={<Basket />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/about" element={<About />} />
            <Route path="/" element={<LoginPage />} />
             <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </Router>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
