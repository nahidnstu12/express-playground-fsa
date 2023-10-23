const { AppdataSource } = require("./src/database/config");
const app = require("./app");

console.log("process.env.DB_PORT", process.env.DB_PORT);
AppdataSource.initialize()
  .then(async () => {
    app.listen(process.env.PORT, () =>
      console.log(`server starting at ${process.env.PORT}`),
    );
  })
  .catch((error) => console.log("server error: ", error));
