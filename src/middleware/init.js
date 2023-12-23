const express = require("express");
const morgan = require("morgan");
const swaggerUI = require("swagger-ui-express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const fs = require("fs");
const YAML = require("yamljs");

const swaggerFilePath = path.join(__dirname, "../../swagger.yaml");

const file = fs.readFileSync(swaggerFilePath, "utf8");
const swaggerDoc = YAML.parse(file);

const applyMiddleware = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    if (process.env.NODE_ENV === "development") {
        app.use(morgan("dev"));
    }
    app.use(cookieParser());
    app.use(cors());

    app.use(
        "/api/v1/docs",
        swaggerUI.serve,
        swaggerUI.setup(swaggerDoc, { explorer: true })
    );
};

module.exports = applyMiddleware;
