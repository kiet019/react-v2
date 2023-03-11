import { Button, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";

export default function AddForm() {
  const [isDisabled, setIsDisabled] = useState();
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
  });
  useEffect(() => {
    if (
      Object.values(formik.touched).every((touched) => touched === true) &&
      Object.keys(formik.errors).length === 0 &&
      formik.values.type !== 0 &&
      formik.values.image !== "" &&
      formik.values.resolution !== ""
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [
    formik.touched,
    formik.errors,
    formik.values.type,
    formik.values.image,
    formik.values.resolution,
  ]);
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
          disabled={isDisabled}
          style={{ marginTop: "20px" }}
        >
          Add
        </Button>
      </form>
    </div>
  );
}
