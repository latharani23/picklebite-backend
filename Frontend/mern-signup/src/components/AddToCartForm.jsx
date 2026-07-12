import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const AddToCartForm = ({ product, onAdd }) => {
  const formik = useFormik({
    initialValues: { quantity: 1 },
    validationSchema: Yup.object({
      quantity: Yup.number()
        .min(1, "Quantity must be at least 1")
        .required("Required"),
    }),
    onSubmit: (values) => {
      onAdd({ ...product, quantity: values.quantity });
      // optional: show inline success message
      alert(`${values.quantity} x ${product.name} added to cart`);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="d-flex gap-2 mt-2">
      <input
        type="number"
        name="quantity"
        value={formik.values.quantity}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="form-control"
        style={{ width: "70px" }}
      />
      <button type="submit" className="btn btn-primary">
        Add to Cart
      </button>
      {formik.touched.quantity && formik.errors.quantity && (
        <div style={{ color: "red" }}>{formik.errors.quantity}</div>
      )}
    </form>
  );
};

export default AddToCartForm;
