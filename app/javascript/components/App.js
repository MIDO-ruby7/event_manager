import React from "react";
import Editor from "./Editor";
import {  Routes, Route } from 'react-router-dom'
import './App.css';

const App = () => (
  <Routes>
    <Route path="events/*" element={<Editor />} />
  </Routes>
);

export default App;