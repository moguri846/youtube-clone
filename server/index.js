const express = require("express");
const app = express();
const port = 5000;

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/youtube", require("./routes/youtube.js"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
