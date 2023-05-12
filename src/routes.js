// import Router from "express";
const router = require("express").Router()
const {getRandomValues, getPerson,calculateString} = require("./controller")

router.get("/any-number", getRandomValues)
router.get("/any-person", getPerson)
router.get("/meta-string", calculateString)

module.exports = router