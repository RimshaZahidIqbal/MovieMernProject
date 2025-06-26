const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Database connected sucessfully");
    }).catch(() => {
        console.log("Connection Failed");
    })
};

module.exports = connectDB;