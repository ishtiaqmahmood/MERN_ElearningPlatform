import express from "express";
import cors from "cors";
import { readdirSync } from "fs";
import mongoose from "mongoose";
const morgan = require("morgan");
require("dotenv").config();
import csurf from "csurf";
import cookieParser from "cookie-parser";

const csrfProtection = csurf({ cookie: true });

// create express app
const app = express();

// db
mongoose
  .connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB connection error => ", err));

// apply middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// route
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

// csrf
app.use(csrfProtection);
app.get("/api/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
