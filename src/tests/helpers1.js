const jwt = require("jsonwebtoken");
const { AppdataSource } = require("../database/config");
const User = require("../model/user");
const Menu = require("../model/menu");

const userRepository = AppdataSource.getRepository(User);

const projects = [{ name: "Travaria" }, { name: "Webster" }];
const users = [
  { name: "NL/AB", password: "123", role: "normal" },
  { name: "TL/TD", password: "123", role: "normal" },
];

const generateProjects = async () => {
  const projectRepository = getRepository(Project);
  return Promise.all(
    projects.map(async (project) => {
      const existingProject = await projectRepository.findOne({
        where: { name: project.name },
      });
      if (!existingProject) {
        const newProject = projectRepository.create(project);
        return projectRepository.save(newProject);
      }
      return existingProject;
    }),
  );
};

const generateUsers = async () => {
  const userRepository = getRepository(User);
  return Promise.all(
    users.map(async (user) => {
      const existingUser = await userRepository.findOne({
        where: { name: user.name },
      });
      if (!existingUser) {
        const newUser = userRepository.create(user);
        return userRepository.save(newUser);
      }
      return existingUser;
    }),
  );
};

const getOneRandomProject = async () => {
  await generateProjects();
  return getRepository(Project)
    .createQueryBuilder()
    .orderBy("RANDOM()")
    .getOne();
};

const getOneRandomUser = async () => {
  await generateUsers();
  return getRepository(User).createQueryBuilder().orderBy("RANDOM()").getOne();
};

const generateTasks = async () => {
  const project = await getOneRandomProject();
  const user = await getOneRandomUser();

  const taskRepository = getRepository(Task);
  const newTask = taskRepository.create({
    name: "Test task",
    point: 2.5,
    user,
    project,
  });

  await taskRepository.save(newTask);
};

const withLogin = async (
  req,
  user = {
    name: "nahid",
    email: "nahid@mail.com",
    phone: "01621876123",
    password: "121212aA",
    role: "admin",
    status: "approved",
  },
) => {
  try {
    await userRepository.save(userRepository.create({ ...user }));
    // const newUser = await userRepository.findOne({
    //   where: { name: user.name, email: user.email },
    // });

    const authToken = jwt.sign({ user }, process.env.JWT_SECRET);
    return req.set("Authorization", `Bearer ${authToken}`);
  } catch (err) {
    console.log("test withLogin Helper", err);
  }
};

module.exports = {
  cleanDatabase: async () => {
    const entities = [Menu, User]; // Add more entities as needed
    const connection = getConnection(); // Ensure you have a TypeORM connection set up
    return Promise.all(
      entities.map(async (entity) => {
        await connection.getRepository(entity).delete({});
      }),
    );
  },
  generateProjects,
  getOneRandomProject,
  getOneRandomUser,
  generateUsers,
  generateTasks,
  withLogin,
};
