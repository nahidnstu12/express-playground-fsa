const { AppdataSource } = require("./src/database/config");
const app = require("./app");

AppdataSource.initialize()
  .then(async () => {
    app.listen(process.env.PORT, () => console.log("server starting at "+ process.env.PORT));
  })
  .catch((error) => console.log("server error: ", error));
