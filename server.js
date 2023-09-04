const express = require("express")
const {AppdataSource} = require("./src/database/config")
const applyMiddleware = require("./src/middleware/init")
const UserRoute = require("./src/route/user")
const MenuRoute = require("./src/route/menu")
const CartRoute = require("./src/route/cart")
const OrderRoute = require("./src/route/order")


AppdataSource.initialize()
    .then(async () => {
        const app = express();

        applyMiddleware(app);

        // ROUTES
        app.use("/api/v1/users", UserRoute);
        app.use("/api/v1/menus", MenuRoute);
        app.use("/api/v1/carts", CartRoute);
        app.use("/api/v1/orders", OrderRoute);

        // HEALTH CHECKER
        app.get("/api/v1", (req, res)=> {
            res.send("Simple Site Is Live")
        })

        // UNHANDLED ROUTE
        // app.all("*", (req: Request, res: Response, next: NextFunction) => {
        //   next(new AppError(404, `Route ${req.originalUrl} not found`));
        // });

        // GLOBAL ERROR HANDLER
        // app.use(
        //   (error: AppError, req: Request, res: Response, next: NextFunction) => {
        //     error.status = error.status || "error";
        //     error.statusCode = error.statusCode || 500;
        //
        //     res.status(error.statusCode).json({
        //       status: error.status,
        //       message: error.message,
        //     });
        //   },
        // );

        app.use((err, req, res) => {
            // format error
            res.status(Number(err.status) || 500).json({
                message: err.message,
                errors: err.errors,
            });
        });

        app.listen(5000, ()=> console.log("server starting at 5000"))
    })
    .catch((error) => console.log("server error: ", error));

