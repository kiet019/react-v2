import React, { useEffect, useState } from "react";
import { Fab } from "@mui/material";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ShowFilm() {
  const [APIData, setAPIData] = useState([]);
  const baseURL = `https://64055d32eed195a99f80eece.mockapi.io/api/films/films`;
  function deleteFilm(id) {
    fetch(baseURL + "/" + id, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
    // handle error
  }
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
            <Fab aria-label="update" style={{ backgroundColor: "green" }}>
              <Link to="/update">
                <EditIcon />
              </Link>
            </Fab>
            <Fab
              aria-label="delete"
              style={{ backgroundColor: "#CE0301" }}
              onClick={() => {
                if (window.confirm("You sure to want to delete this contact")) {
                  deleteFilm(film.id)
                  alert("Delete success");
                } else {
                  alert("Delete fail");
                }
              }}
            >
              <DeleteIcon />
            </Fab>
          </div>
        </div>
      ))}
    </div>
  );
}
