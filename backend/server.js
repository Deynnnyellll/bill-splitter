import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

import receiptsRoute from "./routes/receipts.js";
import usersRoute from "./routes/users.js"

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());

// routes for receipts
app.use("/home", receiptsRoute);
app.use("/user", usersRoute);

// connect to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(PORT, () => {
      console.log(`This app is connected to db & listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
