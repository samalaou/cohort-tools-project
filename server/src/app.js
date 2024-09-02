require('dotenv').config();
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { connectDb } = require("../config/database");
const PORT = 5005;
const { isAuthenticated } = require("./middleware/jwt.middleware");

connectDb()

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
app.use(
  cors({
    origin: ['http://localhost:5173'],
  })
);

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
app.use("/api/cohorts", isAuthenticated, require("./routes/cohort.routes"));
app.use("/api/students", isAuthenticated, require("./routes/student.routes"));

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.use("/auth", require("./routes/auth.routes"));   

// Error Handling
const errorHandler = require('./middleware/error-handling');
app.use(errorHandler);

// START SERVER
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = {app, server};
