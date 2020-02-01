const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const router = express.Router();
const app = express();
app.use(express.json());

mongoose
  .connect(keys.mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(err => console.log("Error on start: " + err.stack));

// mongoose.set("debug", true);

// ROUTES
const auth = require("./routes/auth");
app.use("/api/auth", auth);

const profiles = require("./routes/profiles");
app.use("/api/profiles", profiles);

const experience = require("./routes/experience");
app.use("/api/experience", experience);

const education = require("./routes/education");
app.use("/api/education", education);

const posts = require("./routes/posts");
app.use("/api/posts", posts);

if (process.env.NODE_ENV === "production") {
  // Express serves production assets like main.js
  app.use(express.static("client/build"));
  // Express serves the index.html file if it does not recognize the specified route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
