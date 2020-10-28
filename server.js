const express = require("express");
const app = express();
const { PORT, mongoUri } = require("./config");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const bucketListItemRoutes = require("./routes/api/bucketListItems");

app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB database Connected..."))
  .catch((err) => console.log(err));

app.use("/api/bucketListItems", bucketListItemRoutes);
app.get("/", (req, res) => res.send("Hello World"));

app.listen(PORT, () =>
  console.log(`App listening at http:\\localhost:${PORT}`)
);
