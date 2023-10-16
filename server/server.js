require("dotenv").config()

const express = require("express");
const mongoose = require("mongoose");
const ticketRoutes = require("./routes/tickets");

// Express App
const app = express();

// Middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Routing
app.use("/api/tickets", ticketRoutes)

// Connect To DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listen for requests
        app.listen(process.env.PORT, () => {
            console.log("Connection Successful On Port 4000");
        })
    })
    .catch((err) => {
        console.log(err);
    })
