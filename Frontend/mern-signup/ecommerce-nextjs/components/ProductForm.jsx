"use client";

import { TextField, Button, MenuItem, Box } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  PICKLE_CATEGORIES,
  PICKLE_SUBCATEGORIES,
} from "../constants/pickleConstants";

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  category: Yup.string().required("Required"),
  subCategory: Yup.string().required("Required"),
  price: Yup.number().required("Required"),
  image: Yup.mixed().required("Required"),
});

const ProductForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        name: "",
        category: "",
        subCategory: "",
        price: "",
        image: null,
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, values, setFieldValue }) => (
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Pickle Name"
            value={values.name}
            onChange={(e) => setFieldValue("name", e.target.value)}
          />

          <TextField
            select
            fullWidth
            label="Category"
            value={values.category}
            onChange={(e) => {
              setFieldValue("category", e.target.value);
              setFieldValue("subCategory", "");
            }}
          >
            {PICKLE_CATEGORIES.map((cat) => (
              <MenuItem key={cat.value} value={cat.value}>
                {cat.label}
              </MenuItem>
            ))}
          </TextField>

          {values.category && (
            <TextField
              select
              fullWidth
              label="Sub Category"
              value={values.subCategory}
              onChange={(e) => setFieldValue("subCategory", e.target.value)}
            >
              {PICKLE_SUBCATEGORIES[values.category].map((sub) => (
                <MenuItem key={sub} value={sub}>
                  {sub}
                </MenuItem>
              ))}
            </TextField>
          )}

          <TextField
            fullWidth
            label="Price"
            type="number"
            value={values.price}
            onChange={(e) => setFieldValue("price", e.target.value)}
          />

          <input
            type="file"
            onChange={(e) => setFieldValue("image", e.target.files[0])}
          />

          <Button variant="contained" type="submit">
            Add Pickle
          </Button>
        </Box>
      )}
    </Formik>
  );
};

export default ProductForm;
