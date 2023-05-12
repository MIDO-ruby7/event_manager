import React from "react";
import Editor from "./Editor";
import {  Routes, Route } from 'react-router-dom'

const App = () => (
  <Routes>
    <Route path="events/*" element={<Editor />} />
  </Routes>
);

export default App;