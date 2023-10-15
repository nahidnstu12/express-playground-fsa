
const { faker } = require("@faker-js/faker");
const  User  = require("../model/user");


class MainSeeder {
    async run(dataSource, factoryManager) {
        // const postsRepository = dataSource.getRepository(Post);

        const userFactory = factoryManager.get(User);
        // const postsFactory = factoryManager.get(Post);
        // console.log({userFactory, msg: "MainSeeder"})
         await userFactory.saveMany(10);

        // const posts = await Promise.all(
        //     Array(17)
        //         .fill("")
        //         .map(async () => {
        //             const made = await postsFactory.make({
        //                 author: faker.helpers.arrayElement(users),
        //             });
        //             return made;
        //         })
        // );
        // await postsRepository.save(posts);
    }
}

module.exports = MainSeeder;
