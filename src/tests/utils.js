const { AppdataSource } = require("../database/config");
const jwt = require("jsonwebtoken");

exports.jwtSign = (body) => {
  return jwt.sign({ ...body }, process.env.JWT_SECRET, {
    expiresIn: "12h",
  });
};

exports.jwtVerify = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

exports.clearDatabase = async () => {
  try {
    const appDataSource = await AppdataSource.initialize();
    const entities = appDataSource.entityMetadatas;

    for (const entity of entities) {
      const repository = appDataSource.getRepository(entity.name);
      // console.log("entities: ", entity.name, entity.tableName);
      await repository.query(`DELETE FROM ${entity.tableName};`);
    }
  } catch (error) {
    // console.error("Error in database cleanup:", error);
    throw error; // Optionally rethrow the error for further handling
  }
};

exports.closeDatabase = async () => {
  await AppdataSource.destroy();
};

// module.exports = clearDatabase;
