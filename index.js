import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/users.js";
const app = express();

app.use(express.json({limit: "30mb", extended: true}));
app.use(express.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("This is an API");
});

// const username = mulchandanilakshman;
// const password = Ph3T5DjYHQeQgF8g;
const DATABASE_URL =
  "mongodb+srv://mulchandanilakshman:Ph3T5DjYHQeQgF8g@cluster0.xdkndi7.mongodb.net/?retryWrites=true&w=majority";

const PORT = 5000;

mongoose
  .connect(DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() =>
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    })
  )
  .catch((err) => console.log(err.message));
