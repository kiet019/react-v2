import React from "react";
import { Route, Routes } from "react-router-dom";
import AddForm from "./Add/AddForm";
import Login from "./Login";
import ShowFilm from "./Show/ShowFilm";
import UpdateForm from "./Update/UpdateForm";
import Protected from './Protected';

export default function RouterPath() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Protected><ShowFilm/></Protected>} />
        <Route path="/add" element={<Protected><AddForm/></Protected>} />
        <Route path="/update" element={<Protected><UpdateForm/></Protected>} />
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </>
  );
}
