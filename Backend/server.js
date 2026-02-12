require('dotenv').config();
const express = require('express');
const port = process.env.PORT || 7000;
const app = express();
const cors = require('cors');
const session = require("express-session");

const connectdb = require("./config/mongoDB");
const userRoutes = require("./routes/user");
const drides = require("./routes/drides");

connectdb();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,   
        maxAge: 1000 * 60 * 60  
    }
}))
app.use("/api/user", userRoutes);
app.use("/api/drides",drides);
app.use("/uploads", express.static("uploads"));





app.get("/signup", (req, res) => {
  res.send("Signup route working");
});




app.listen(port,()=>{
    console.log("Server started at ",port);
})


