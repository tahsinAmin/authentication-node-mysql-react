import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";  
// import db from "./config/database.js"
import UserRoute from "./routes/userRoute.js"
import ProductRoute from "./routes/productRoute.js"
import AuthRoute from "./routes/authRoute.js"
dotenv.config();

const app = express();

// Commenting this because database has been created 
// (async() => {
//     await db.sync();
// })();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

app.use(express.json())
app.use(UserRoute)
app.use(AuthRoute)
app.use(ProductRoute)

app.listen(process.env.APP_PORT, () => {
    console.log("Server is running...");
});