const express = require("express");

const app = express();

app.use(express.json({ extended: false }));

app.use("/coding", require("./routes/coding"));

const port = process.env.PORT || 5000;

app.listen(port, (error) => {
  if (error) throw error;
  console.log("Server running on port " + port);
});
