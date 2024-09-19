const dotenv = require('dotenv');
const database = require("./config/database");
const express = require('express');
const cookieParser = require('cookie-parser');

const userRoutes = require("./routes/userRoutes");
const medicineRoutes = require("./routes/medicineRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const profileRoutes = require("./routes/profileRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const contactRoutes = require("./routes/contactRoutes");

const { cloudinaryConnect } = require('./config/cloudinary');
const fileUpload = require('express-fileupload');

const app = express();

const cors = require('cors');

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


// gloabal middleware
//all routes below this will use this middleware
app.use(express.json());
app.use(cookieParser());
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/"
    })
)

//allow request from http://localhost:3000
app.use(cors({ 
    origin: true,
    credentials: true,
}));


//setting up routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/medicine", medicineRoutes);
app.use("/api/v1/doctor", doctorRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/booking", bookingRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactRoutes);


//test
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Server is up and running"
    });
});

