const {createUser} = require("../service/user");

const controller = {}

controller.create = async (
    req,
    res,
    next,
)=> {
    try {
        const user = await createUser(req.body);
        res.status(201).json({
            status: "Success",
            data: user,
        });
    } catch (err) {
        if (err.code === "23505") {
            return res.status(409).json({
                status: "fail",
                message: "User Already exists.",
            });
        }
        next(err);
    }
};

controller.readAll = async (
    req,
    res,
    next,
)=> {
    try {

        res.status(201).json({
            status: "Success",
            data: [],
        });
    } catch (err) {
        if (err.code === "23505") {
            return res.status(409).json({
                status: "fail",
                message: "",
            });
        }
        next(err);
    }
};

controller.read = async (
    req,
    res,
    next,
)=> {
    try {

        res.status(201).json({
            status: "Success",
            data: [],
        });
    } catch (err) {
        if (err.code === "23505") {
            return res.status(409).json({
                status: "fail",
                message: "",
            });
        }
        next(err);
    }
};

controller.update = async (
    req,
    res,
    next,
)=> {
    try {

        res.status(201).json({
            status: "Success",
            data: [],
        });
    } catch (err) {
        if (err.code === "23505") {
            return res.status(409).json({
                status: "fail",
                message: "",
            });
        }
        next(err);
    }
};

controller.delete = async (
    req,
    res,
    next,
)=> {
    try {

        res.status(201).json({
            status: "Success",
            data: [],
        });
    } catch (err) {
        if (err.code === "23505") {
            return res.status(409).json({
                status: "fail",
                message: "",
            });
        }
        next(err);
    }
};

controller.cancelCart = async (
    req,
    res,
    next,
)=> {
    try {

        res.status(201).json({
            status: "Success",
            data: [],
        });
    } catch (err) {
        if (err.code === "23505") {
            return res.status(409).json({
                status: "fail",
                message: "",
            });
        }
        next(err);
    }
};

module.exports = controller;