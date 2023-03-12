import {
    Alert,
    AlertTitle,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    MenuItem,
    Select,
    TextField,
    Typography,
  } from "@mui/material";
import { useFormik } from "formik";
import React,  { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";

export default function UpdateForm() {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
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
      title: localStorage.getItem("title"),
      image: localStorage.getItem("image"),
      Year: localStorage.getItem("Year"),
      time: localStorage.getItem("time"),
      director: localStorage.getItem("director"),
      trailer: localStorage.getItem("trailer"),
      resolution: localStorage.getItem("resolution"),
      information: localStorage.getItem("information"),
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required("Required")
        .min(1, "Must contain at least 1 character"),
      Year: Yup.number()
        .min(1000, "YYYY")
        .max(3000)
        .required("Required form YYYY"),
      time: Yup.string().required("Required"),
      director: Yup.string().required("Required"),
      trailer: Yup.string().required("Required"),
      information: Yup.string()
        .required("Required")
        .min(5, "Must be 10 character"),
    }),
    onSubmit: (values) => {
      const baseURL =
        `https://64055d32eed195a99f80eece.mockapi.io/api/films/details/` +
        localStorage.getItem("type") +
        `/film-details/` +
        localStorage.getItem("id");
      fetch(baseURL, {
        method: "PUT",
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
        .then((data) => setOpen(true))
        .catch((error) => console.log(error.message));
      // alert(JSON.stringify(values))
    },
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
        <Typography variant="caption" color="red">
          {formik.touched.title && <>{formik.errors.title}</>}
        </Typography>
        <div className="year-time-type">
          <TextField
            id="outlined-basic"
            label="Year"
            variant="outlined"
            name="Year"
            value={formik.values.Year}
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
            value={0}
            disabled={true}
          >
            <MenuItem value={0}>
              <em>Select type</em>
            </MenuItem>
            <MenuItem value={1}>Series</MenuItem>
            <MenuItem value={2}>Movies</MenuItem>
          </Select>
          <Typography variant="caption" color="red">
            {formik.touched.Year && <>{formik.errors.Year}</>}
          </Typography>
          <div></div>
          <Typography variant="caption" color="red">
            {formik.touched.time && <>{formik.errors.time}</>}
          </Typography>
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
        <Typography variant="caption" color="red">
          {formik.touched.director && <>{formik.errors.director}</>}
        </Typography>
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
        <Typography variant="caption" color="red">
          {formik.touched.trailer && <>{formik.errors.trailer}</>}
        </Typography>
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
        <Typography variant="caption" color="red">
          {formik.touched.information && <>{formik.errors.information}</>}
        </Typography>
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
          Update
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Congraturation"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Alert severity="success">
                <AlertTitle>Update successful!</AlertTitle>
              </Alert>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button>
              <Link to="/" style={{ textDecoration: "none", color: "#1976d2" }}>
                Home
              </Link>
            </Button>
            <Button
              autoFocus
              onClick={handleClose}
              style={{ textDecoration: "none", color: "red" }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
}
