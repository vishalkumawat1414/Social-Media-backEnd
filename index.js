const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const DBconnect = require("./DBconnect");
const authRouter = require("./routers/authRouter");
const morgan = require("morgan"); // used to show which api is hit in termnal
const cookieParser = require("cookie-parser");
const postRouter = require("./routers/postRouter");
const userRouter = require('./routers/userRouter')
const cors = require("cors");//used to connect frontend to backend on different host servers
const cloudinary = require('cloudinary').v2

dotenv.config("./.env");

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_SECRETE,
});

const app = express();
app.use(bodyParser.json());

//middlewares
app.use(express.json({limit:'20mb'}));
app.use(morgan("common")); // used to show hitted api's
app.use(cookieParser()); // to store refresh token
app.use(
	cors({
		credentials: true,
		origin: process.env.CLIENT_URL,
	})
);

// //routes
// app.use("/api/auth", authRouter);
// app.use("/api/posts", postRouter);

module.exports = app;

app.use("/auth", authRouter);
app.use("/posts", postRouter);
app.use('/user',userRouter)

//exporting port from .env file
const PORT = process.env.PORT || 4001;

//for data base connecting
DBconnect();

//listenng
app.listen(PORT, () => {
	console.log(`Listening at port :${PORT}`);
});
