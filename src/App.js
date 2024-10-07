import React from "react";
import "./App.css";
import Forms from "./camponets/Forms";
import { Route, Routes } from "react-router-dom";
import Booklisting from "./camponets/Booklisting";
import Book_detail_view from "./camponets/Book_detail_view";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Booklisting />} />
        <Route path="/forms" element={<Forms />} />
        <Route path="/book/:id" element={<Book_detail_view />} />
      </Routes>
    </div>
  );
}

export default App;
