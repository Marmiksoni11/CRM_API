const jwt = require('jsonwebtoken')
// const { UnauthenticatedError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "Authentication Invalid",
    });
  }
  const token = authHeader.split(' ')[1]
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { id: payload.id, username: payload.username }
    next()
  } catch (error) {
    // throw new UnauthenticatedError('Authentication invalid')
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "(ERROR) Authentication Invalid",
    });
  }
}

// BOTH THE FUNCIONS DOES THE SAME JOB
const authFunc = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: " ----- UNAUTHORIZED ----- ",
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("Error", err);
    } else {
      req.user = user;
      next() 
    }
  });
};


module.exports = auth
