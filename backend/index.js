import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";  
import db from "./config/database.js"
import SequelizeStore from "connect-session-sequelize"
import UserRoute from "./routes/userRoute.js"
import ProductRoute from "./routes/productRoute.js"
import AuthRoute from "./routes/authRoute.js"
import TicketRoute from "./routes/ticketRoute.js"
dotenv.config();

const app = express();

const sessionStore =  SequelizeStore(session.Store);

const store  = new sessionStore({
    db: db
})

// Commenting this because database has been created 
// (async() => {
//     await db.sync();
// })();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
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
app.use(TicketRoute)

// store.sync()

app.listen(process.env.APP_PORT, () => {
    console.log("Server is running...");
});