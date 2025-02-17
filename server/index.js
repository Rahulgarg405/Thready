const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const router = require("./route");

const app = express();

dotenv.config();

connectDB();

const port = process.env.PORT;

app.use(express.json());
app.use("/api", router)

app.listen(port, () => {
    console.log(`App is Listening on PORT : ${port}`);
})