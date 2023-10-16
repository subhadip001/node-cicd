const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port 8080${PORT}`);
});
