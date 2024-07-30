const { verify } = require("jsonwebtoken");
const authConfig = require("../configs/auth");
const AppError = require("../utils/AppError");

function ensureAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("jwt Token não informado", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret);
    console.log(user_id);
    req.user = {
      id: Number(user_id),
    };

    return next();
  } catch {
    throw new AppError("jwt Token inválido", 401);
  }
}

module.exports = ensureAuthenticated;