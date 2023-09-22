const { AppdataSource } = require("./src/database/config");
const app = require("./app");

AppdataSource.initialize()
  .then(async () => {
    app.listen(5000, () => console.log("server starting at 5000"));
  })
  .catch((error) => console.log("server error: ", error));
