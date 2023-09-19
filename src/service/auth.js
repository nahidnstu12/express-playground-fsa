const { AppdataSource } = require("../database/config");
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authRepository = AppdataSource.getRepository(User);
const service = {};

service.registerHandler = async (input) => {
  try {
    const { name, email, phone, password } = input;
    const isAlreadyRegistered = await authRepository.findOneBy({ email });

    // if already registered
    if (isAlreadyRegistered) {
      return { status: 400, message: "Already Registered" };
    }

    // password hash
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    Object.assign(input, { ...input, password: passwordHash });

    // token generation
    try {
      const tokenGenerate = jwt.sign(
        { email, phone, role: input.role, name },
        "hello-secret",
        {
          expiresIn: "12h",
        },
      );

      await authRepository.save(authRepository.create({ ...input }));
      return {
        status: 201,
        message: "Successfully registered user",
        token: tokenGenerate,
      };
    } catch (err) {
      console.log("token err", err);
      // res.status(500).send({ message: err });
    }
    //
  } catch (err) {
    console.log("password err", err);
    // next(err);
  }
};
service.loginHandler = async (input) => {
  try {
    const { email, password } = input;
    const userFound = await authRepository.findOneBy({ email });

    // if already registered
    if (!userFound) {
      return { status: 400, message: "User not found" };
    }

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) {
      return { status: 400, message: "credentials do not match" };
    }
    const tokenGen = await jwt.sign(
      {
        email: userFound.email,
        role: userFound.role,
        name: userFound.name,
        phone: userFound.phone,
      },
      "hello-secret",
      { expiresIn: "12h" },
    );
    return {
      status: 200,
      message: "login successful",
      token: tokenGen,
    };
  } catch (err) {
    console.log("Login err", err);
  }
};
service.profileHandler = async (requestToken) => {
  const token = requestToken?.split(" ")[1] || null;
  if (!token) {
    return {
      status: 401,
      message: "You have not permission",
    };
  }
  console.log("token", token);
  const decodedUser = await jwt.verify(token, "hello-secret");
  const userFound = await authRepository.findOneBy({
    email: decodedUser?.email,
    name: decodedUser?.name,
  });

  if (!userFound) {
    return {
      status: 400,
      message: "malicious user",
    };
  }
  const profile = {
    name: decodedUser?.name,
    email: decodedUser?.email,
    role: decodedUser?.role,
    phone: decodedUser?.phone,
  };
  return {
    status: 200,
    data: profile,
  };
};

module.exports = service;
