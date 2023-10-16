const dotenv = require('dotenv');
const database = require("./config/database");
const express = require('express');
const cookieParser = require('cookie-parser');

const userRoutes = require("./routes/userRoutes");
const medicineRoutes = require("./routes/medicineRoutes");

const { cloudinaryConnect } = require('./config/cloudinary');
const fileUpload = require('express-fileupload');

const app = express();

//loading port number
dotenv.config();
const PORT = process.env.PORT;


//listening to the server
app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`);
});


//connect to db
database.connect();

//connect to cloudinary
cloudinaryConnect();


// middleware
app.use(express.json());
app.use(cookieParser());
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/"
    })
)


//setting up routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/medicine", medicineRoutes);


//test
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Server is up and running"
    });
});

