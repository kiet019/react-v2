import { Button, MenuItem, Select, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";

export default function AddForm() {
  const baseURL = `https://64055d32eed195a99f80eece.mockapi.io/api/films/films`;
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const imageSrc = `assets/images/${file.name}`;
      formik.setFieldValue("image", imageSrc);
    };
    reader.readAsDataURL(file);
  };
  const formik = useFormik({
    initialValues: {
      title: "",
      image: "",
      Year: 0,
      time: "",
      director: "",
      trailer: "",
      resolution: "",
      information: "",
      type: 0,
    },
    onSubmit: (values) => {
      fetch(baseURL, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {})
        .catch((error) => console.log(error.message));
    // alert(JSON.stringify(values))
    },
    validationSchema: Yup.object({}),
  });
  return (
    <div className="add-form">
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          fullWidth
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div></div>
        <div className="year-time-type">
          <TextField
            id="outlined-basic"
            label="Year"
            variant="outlined"
            name="Year"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div></div>
          <TextField
            id="outlined-basic"
            label="Time"
            variant="outlined"
            name="time"
            value={formik.values.time}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div></div>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            name="type"
            value={formik.values.type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <MenuItem value={0}>
              <em>Select type</em>
            </MenuItem>
            <MenuItem value={1}>Movies</MenuItem>
            <MenuItem value={2}>Series</MenuItem>
          </Select>
        </div>
        <div></div>
        <div className="director-resolution">
          <TextField
            id="outlined-basic"
            label="Director"
            variant="outlined"
            name="director"
            value={formik.values.director}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div></div>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            name="resolution"
            value={formik.values.resolution}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <MenuItem value="">
              <em>Select resolution</em>
            </MenuItem>
            <MenuItem value="1280x720">1280 x 720 </MenuItem>
            <MenuItem value="1920x1080">1920 x 1080</MenuItem>
            <MenuItem value="2560x1440">2560 x 1440 </MenuItem>
          </Select>
        </div>
        <div></div>
        <TextField
          name="trailer"
          label="Trailer"
          type="text"
          fullWidth
          variant="outlined"
          value={formik.values.trailer}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div></div>
        <TextField
          multiline
          rows={5}
          name="information"
          label="Information"
          type="text"
          fullWidth
          variant="outlined"
          value={formik.values.information}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div></div>
        <div>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            id="image-upload"
            onChange={handleImageUpload}
          />
          <label htmlFor="image-upload">
            <Button variant="contained" component="span">
              Upload Image
            </Button>
          </label>
        </div>
        <Button
          variant="contained"
          size="small"
          type="submit"
          style={{ marginTop: "20px" }}
        >
          Add
        </Button>
      </form>
    </div>
  );
}
