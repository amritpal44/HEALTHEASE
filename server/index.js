const dotenv = require('dotenv');

const express = require('express');
const app = express();

//loading port number
dotenv.config();
const PORT = process.env.PORT;


//listening to the server
app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`);
});


//connect to db
const database = require("./config/database");
database.connect();


//json parse middleware
app.use(express.json());



//test
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Server is up and running"
    });
});

