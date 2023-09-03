const express = require("express")
const {createUserHandler} = require("../controller/user");

const router = express.Router();

router
    .route("/")
    // .get(getBooksHandler)
    .post( createUserHandler);

module.exports =  router;