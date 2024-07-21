const User = require("./models");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getUser = async (req, res) => {
  const { id } = req.body;

  const whereClause = {};

  if (id) {
    whereClause.id = id;
  }

  const user = await User.findAll({
    where: {
      ...whereClause,
    },
  });

  return res.status(StatusCodes.OK).json({
    user: user,
  });
};

const createUser = async (req, res) => {
  const { first_name, last_name, number, email } = req.body;

  const user = await User.create({
    first_name,
    last_name,
    number,
    email,
  });

  const createdUser = await User.findAll({
    where: {
      id: user?.dataValues?.id,
    },
  });

  console.log('createdUser',createdUser);
  

  return res.status(StatusCodes.OK).json({
    message: "User created Successfully",
    user: createdUser
  });
};

const updateUser = async (req, res) => {

  const id = req.params.id;
//   console.log('req.query', req.query);
//   console.log('req.params', req.params);
//   console.log('req.body', req.body);

  
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

  console.log('id ---- > ', id);
  console.log('user ---- > ', user);
  

//   const updatedUser = await User.findAll({
//     where: {
//       id: user?.dataValues?.id,
//     },
//   });

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

module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
