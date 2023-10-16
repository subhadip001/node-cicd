const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

app.post("/name", (req, res) => {
  const { name } = req.body;
  console.log(req.body);
  res.status(200).json({ message: `Hello ${name}` });
});

app.listen(PORT, () => {
  console.log(`Server is running on port 8080${PORT}`);
});
