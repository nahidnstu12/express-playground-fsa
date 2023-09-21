const { DataSource } = require("typeorm");
const { AppdataSource } = require("../database/config");

// module.exports = async () => {
//   const appDataSource = new DataSource(AppdataSource);
//   const entities = appDataSource.entityMetadatas;
//
//   for await (const entity of entities) {
//     const repository = appDataSource.getRepository(entity.name);
//
//     await repository.query(
//       `TRUNCATE ${entity.tableName} RESTART IDENTITY CASCADE;`,
//     );
//   }
// };

exports.clearDatabase = async () => {
  try {
    const appDataSource = await AppdataSource.initialize();
    const entities = appDataSource.entityMetadatas;

    for (const entity of entities) {
      const repository = appDataSource.getRepository(entity.name);
      // console.log("entities: ", entity.name, entity.tableName);
      await repository.query(`DELETE FROM ${entity.tableName};`);
    }
    await AppdataSource.destroy();
  } catch (error) {
    // console.error("Error in database cleanup:", error);
    throw error; // Optionally rethrow the error for further handling
  }
};

// module.exports = clearDatabase;
