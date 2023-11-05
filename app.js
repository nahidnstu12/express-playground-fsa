const express = require("express");
const applyMiddleware = require("./src/middleware/init");
const AuthRoute = require("./src/route/auth");
const UserRoute = require("./src/route/user");
const MenuRoute = require("./src/route/menu");
const CartRoute = require("./src/route/cart");
const OrderRoute = require("./src/route/order");
const app = express();

applyMiddleware(app);

// ROUTES
app.use("/api/v1/auth", AuthRoute);
app.use("/api/v1/users", UserRoute);
app.use("/api/v1/menus", MenuRoute);
app.use("/api/v1/carts", CartRoute);
app.use("/api/v1/orders", OrderRoute);

// HEALTH CHECKER
app.get("/api/v1/health", (req, res) => {
  res.status(200).send({ message: "Site Is Live" });
});


app.use((req, res, next) => {
  // Check if the request body is undefined
  console.log("req.body", req.body);
  if (req.body === undefined) {
    return res.status(400).json({ error: "Request body is undefined" });
  }
  // If the request body is defined, proceed to the next middleware
  next();
});
app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found", dev_note: "global 404" });
});

app.use((err, req, res, next) => {
  // format error
  console.log("last error: ", { err});
  if(err.type){
    // console.log("type ",err.type)
    return res.status(err.status || 500).json({
      errors: {
        message: err.message,
        body: err.body,
        type: err.type
      }
    })
  }
  return res.status(Number(err.code) || 500).json({
    errors: {
      // status: err.status,
      message: err.message,
    },
    dev_note: "global error",
  });
});

module.exports = app;
