require("dotenv").config();
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");
const User = require("./models");
const { BadRequestError, NotFoundError } = require("../errors");
const { getHashedPassword, generateToken } = require("../utils");
const { where } = require("sequelize");

const getUser = async (req, res) => {
  const { id } = req.body;
  const user = req.user;

  const whereClause = {};

  if (user.is_admin && id) {
    whereClause.id = id;
  }

  const users = await User.findAll({
    where: {
      id: user.id,
      ...whereClause,
    },
  });

  return res.status(StatusCodes.OK).json({
    user: users,
  });
};

const createUser = async (req, res) => {
  const { username, first_name, last_name, number, email, password } = req.body;

  const hashedPassword = await getHashedPassword(password);

  const user = await User.create({
    username,
    first_name,
    last_name,
    number,
    email,
    password: hashedPassword,
  });

  const createdUser = await User.findAll({
    where: {
      id: user?.dataValues?.id,
    },
  });

  return res.status(StatusCodes.OK).json({
    message: "User created Successfully",
    user: createdUser,
  });
};

const updateUser = async (req, res) => {
  const id = req.params.id;

  const { first_name, last_name, number, email } = req.body;

  const user = await User.update(
    {
      first_name,
      last_name,
      number,
      email,
    },
    {
      where: {
        id: id,
      },
    }
  );

  const updatedUser = await User.findAll({
    where: {
      id: id,
    },
  });

  return res.status(StatusCodes.OK).json({
    message: "User updated Successfully",
    user: updatedUser,
  });
};

const deleteUser = async (req, res) => {
  const id = req.params.id;

  const user = await User.destroy({
    where: {
      id: id,
    },
  });

  return res.status(StatusCodes.OK).json({
    message: "User deleted Successfully",
  });
};

const loginUser = async (req, res) => {
  const { id, email, username, password } = req.body;

  let whereClause = {};

  if (email) {
    whereClause.email = email;
  }
  if (username) {
    whereClause.username = username;
  }

  const user = await User.findOne({
    where: {
      ...whereClause,
    },
  });

  let isMatch = await bcrypt.compare(password, user?.dataValues?.password);

  if (!isMatch) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "Password entered is incorrect",
    });
  }

  const userPayload = {
    id: user?.dataValues?.id,
    username: user?.dataValues?.username,
  };

  const accessToken = generateToken(userPayload);
  const refreshToken = JWT.sign(userPayload, process.env.REFRESH_TOKEN_SECRET);

  await User.update(
    {
      refresh_token: refreshToken,
    },
    {
      where: {
        id: user?.dataValues?.id,
      },
    }
  );

  return res.status(StatusCodes.OK).json({
    accessToken,
    refreshToken,
  });
};

const logoutUser = async (req, res) => {
  const { id } = req.body;
  let user = await User.findOne({
    where: {
      id,
    },
  }); 
  if (user) {
    await user.update({ refresh_token: null });
    return res.status(StatusCodes.OK).json({
      message: "User Logged Out Successfully",
    });
  } else {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: "User not found",
    });
  }
};

const getToken = async (req, res) => {
  const { id, refreshToken } = req.body;

  if (refreshToken === null) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      Error: "Unauthorized Access",
    });
  }

  const checkTokenExists = await User.findOne({
    where: {
      id,
    },
  });

  if (checkTokenExists?.dataValues?.refresh_token === null) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      Error: "Unauthorized Access",
      message: "Couldn't find Access Token",
    });
  }

  JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(StatusCodes.FORBIDDEN).json({
        message: "FORBIDDEN",
        JWT_Error: err,
      });
    }

    console.log("user", user);

    const accessToken = generateToken({
      id: user.id,
      username: user.username,
    });
    console.log("accessToken", accessToken);
    res.status(StatusCodes.OK).json({
      accessToken,
    });
  });
};

module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
  getToken,
};
