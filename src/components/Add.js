import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { Fab } from "@mui/material";
export default function Add() {
  return (
    <div className="add">
      {/* <button>
        <Link className="add-icon" to="/add">
          <AddIcon></AddIcon>
        </Link>
      </button> */}
      <Fab color="primary" aria-label="add">
        <Link className="add-icon" to="/add">
          <AddIcon></AddIcon>
        </Link>
      </Fab>
    </div>
  );
}
