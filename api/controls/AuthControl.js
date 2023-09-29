const { validationResult } = require("express-validator");
const User = require("../models/User");
const AuthService = require("../service/AuthService");

class AuthControl {
  async registration(req, res, next) {
    try {
      console.log(req.body);
      const validation = validationResult(req);
      if (!validation.isEmpty()) {
        return res.status(400).json(validation);
      }
      const { userName, password, email } = req.body;

      const userData = await AuthService.registration(
        userName,
        email,
        password,
      );

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.status(200).json(userData);
    } catch (e) {
      console.log(e);
      res.status(400).json(e.message);
    }
  }

  async login(req, res, next) {
    try {
      const { userEmail, password } = req.body;
      console.log(userEmail, password);
      const userData = await AuthService.login(userEmail, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.status(200).json(userData);
    } catch (e) {
      console.log(e);
      res.status(400).json({ code: 400, message: e.message });
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;

      const token = await AuthService.logout(refreshToken);
      res.clearCookie("refreshToken");
      res.status(200).json(token);
    } catch (e) {
      console.log(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await AuthService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await AuthService.activation(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      console.log(e);
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await AuthService.getUsers();
      res.status(200).json(users);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new AuthControl();
