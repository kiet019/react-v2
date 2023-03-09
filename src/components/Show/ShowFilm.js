import React, { useEffect, useState } from "react";
import { Fab } from "@mui/material";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';

export default function ShowFilm() {
  const [APIData, setAPIData] = useState([]);
  const baseURL = `https://64055d32eed195a99f80eece.mockapi.io/api/films/films`;
  useEffect(() => {
    fetch(baseURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setAPIData(data);
      })
      .catch((error) => console.log(error.message));
    // eslint-disable-next-line
  }, []);
  return (
    <div
      className="showfilm"
      style={{ gridTemplateRows: `repeat(` + APIData.length + `, 180px)` }}
    >
      {APIData.map((film) => (
        <div className="card" key={film.id}>
          {/* eslint-disable-next-line */}
          <img src={film.image} />
          <div className="content">
            <div className="title">
              {film.title} {film.Year}
            </div>
            <div className="director">Director: {film.director}</div>
            <div className="resolution">
              Type: {film.type === 1 ? "movies" : "series"}
            </div>
          </div>
          <div className="button">
            <Fab aria-label="delete" style={{ backgroundColor: "green" }}>
              <Link to="/update"><EditIcon /></Link>
            </Fab>
            <Fab aria-label="edit" style={{ backgroundColor: "#CE0301" }}>
              <Link to="/delete"><DeleteIcon /></Link>
            </Fab>
          </div>
        </div>
      ))}
    </div>
  );
}
