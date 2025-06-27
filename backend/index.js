require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require('path');

const connectDB = require("./config/db");

const app = express();

app.use(cors({ origin: process.env.FRONT_END_URL }));
app.use(express.json());

connectDB();

const showRouter = require("./routes/showRoutes")

app.get("/", (req, res) => {
    res.send("API is running.");
});

app.use('/api/images', express.static(path.join(__dirname, 'public/images')));
app.use("/api/shows", showRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
})


