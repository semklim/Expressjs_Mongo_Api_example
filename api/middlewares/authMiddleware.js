const tokenService = require("../service/tokenService");

module.exports = function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new Error('headers does not has the accessToken');
    }

    const accessToken = authHeader.split(' ')[1];

    const userData = tokenService.validationAccessToken(accessToken);

    if (!userData) {
      throw new Error("Not valid accessToken");
    }

    req.user = userData;
    next();
  } catch (error) {
    return next(res.status(400).json(error.message));
  }
}