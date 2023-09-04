const {createUser} = require("../service/user");

const controller = {}

controller.createMenuHandler = async (
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

module.exports = controller;