// import express from "express.js";
// import router from "./src/routes.js"
const express = require("express")
const router = require("./src/routes")

const app = express();

app.use(express.json());
app.use("/api", router);

app.get("/", (req, res)=> {
    res.send("Simple Site Is Live")
})



app.listen(5000, ()=> console.log("server starting at 5000"))