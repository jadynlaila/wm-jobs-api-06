require("dotenv").config();
const express = require("express");
// const { NotFoundError } = require("./errors");
const errorHandlerMiddleware = require("./middleware/error-handler");
const authRouter = require("./routes/auth");
const jobRouter = require("./routes/jobs");
const authMiddleware = require('./middleware/auth')
const app = express();
const connectDB = require('./db/connect')
app
  .use(express.static("./public"))
  .use([express.urlencoded({ extended: false }), express.json()])
  .get("/", (req, res) => res.send(`<h1>Job API</h1>`))
  .use("/api/v1/jobs", authMiddleware, jobRouter)
  .use("/api/v1/auth", authRouter)
  
  // .use(NotFoundError)
  .use(errorHandlerMiddleware)

const port = process.env.PORT || 5000;

const startApp = () => {
  try {
    connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`listening @ ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

startApp();
