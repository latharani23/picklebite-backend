const handleSubmit = async (values) => {
  const formData = new FormData();

  Object.keys(values).forEach((key) => {
    formData.append(key, values[key]);
  });

  await fetch("/api/products", {
    method: "POST",
    body: formData,
  });
};
