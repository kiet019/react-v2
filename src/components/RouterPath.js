import React from "react";
import { Route, Routes } from "react-router-dom";
import AddForm from "./Add/AddForm";
import ShowFilm from "./Show/ShowFilm";

export default function RouterPath() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<ShowFilm/>} />
        <Route path="/add" element={<AddForm/>} />
      </Routes>
    </>
  );
}
