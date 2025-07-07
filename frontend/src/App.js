import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import StockMovements from "./components/StockMovements";
import InventoryAdjustments from "./components/InventoryAdjustments";
import Locations from "./components/Locations";
import Reports from "./components/Reports";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="flex">
          <Navigation />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/movements" element={<StockMovements />} />
              <Route path="/adjustments" element={<InventoryAdjustments />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/reports" element={<Reports />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;