const { AppdataSource } = require("./src/database/config");
const app = require("./app");
const { runSeeders } = require("typeorm-extension");

AppdataSource.initialize()
  .then(async () => {
    await runSeeders(AppdataSource);
    process.exit();
    // app.listen(5000, () => console.log("server starting at 5000"));
  })
  .catch((error) => console.log("server error: ", error));
