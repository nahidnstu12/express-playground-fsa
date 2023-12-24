const { AppdataSource } = require("../database/config");
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const { jwtSign, jwtVerify } = require("../tests/utils");
const {USER_ROLES, USER_STATUS} = require("../utils/constants")

const authRepository = AppdataSource.getRepository(User);
const service = {};

service.registerAppAdminHandler = async (input) => {
  try {
    const { name, email, phone, password } = input;
    const isAlreadyRegistered = await authRepository.findOneBy([{ email}, {role: USER_ROLES.APP_ADMIN }]);

    // if already registered


    if (isAlreadyRegistered) {
      return { code: 400, message: "Already App Admin exist" };
    }

    // password hash
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    Object.assign(input, { ...input, role:USER_ROLES.APP_ADMIN, status: USER_STATUS.APPROVED,   password: passwordHash });

    // token generation
    try {
      const tokenGenerate = jwtSign(
        { email, phone, role: input.role, name },
        process.env.JWT_SECRET,
        {
          expiresIn: "12h",
        },
      );

      await authRepository.save(authRepository.create({ ...input }));
      return {
        code: 201,
        message: "Successfully app admin created",
        token: tokenGenerate,
      };
    } catch (err) {
      console.log("token err", err);
      return {
        code: 400,
        message: err.message,
        dev_note: "token error",
      };
    }
  } catch (err) {
    console.log("password err", err);
    // next(err);
  }
};

service.registerHandler = async (input) => {
  try {
    const { name, email, phone, password, role } = input;
    const isAlreadyRegistered = await authRepository.findOneBy({ email });

    // if already registered
    if (isAlreadyRegistered) {
      return { code: 400, message: "Already Registered" };
    }

    // password hash
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    Object.assign(input, { ...input, role: input.role || USER_ROLES.CUSTOMER, password: passwordHash });

    // token generation
    try {
      const tokenGenerate = jwtSign(
        { email, phone, role: input.role, name },
        process.env.JWT_SECRET,
        {
          expiresIn: "12h",
        },
      );

      await authRepository.save(authRepository.create({ ...input }));
      return {
        code: 201,
        message: "Successfully registered user",
        token: tokenGenerate,
      };
    } catch (err) {
      console.log("token err", err);
      return {
        code: 400,
        message: err.message,
        dev_note: "token error",
      };
    }
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
      return { code: 400, message: "User not found" };
    }

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) {
      return { code: 400, message: "credentials do not match" };
    }

    const tokenGen = await jwtSign({
      email: userFound.email,
      role: userFound.role,
      name: userFound.name,
      phone: userFound.phone,
    });
    return {
      code: 200,
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
      code: 401,
      message: "Authentication failed",
    };
  }
  const decodedUser = await jwtVerify(token);
  const userFound = await authRepository.findOneBy({
    email: decodedUser?.email,
    name: decodedUser?.name,
  });

  if (!userFound) {
    return {
      code: 400,
      message: "malicious user",
    };
  }
  const profile = {
    name: decodedUser?.name,
    email: decodedUser?.email,
    role: decodedUser?.role,
    phone: decodedUser?.phone,
    status: decodedUser?.status,
  };
  return {
    code: 200,
    data: profile,
  };
};

module.exports = service;
