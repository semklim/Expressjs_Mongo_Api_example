const User = require("../models/User");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mailService");
const TokenService = require("./tokenService");
const UserDto = require("../dtos/userDto");

class AuthService {
  async registration(userName, userEmail, password) {
    const candidate = await User.findOne({ userName, userEmail });
    if (candidate) {
      throw new Error(`User with ${userEmail} already exists`);
    }

    const hashPassword = await bcrypt.hash(password, 5);
    const activationLink = uuid.v4();

    const user = new User({
      userName,
      userEmail,
      password: hashPassword,
      activationLink,
    });
    await user.save();
    // await mailService.sendActivationMail(userEmail, `${process.env.API_URL}/api/activate/${activationLink}`);

    const userDto = new UserDto(user);

    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async activation(activationLink) {
    try {
      const user = await User.findOne({ activationLink });
      if (!user) {
        throw new Error("User was activated already");
      }
      user.isActivated = true;
      await user.save();
    } catch (error) {
      console.log(error);
    }
  }
  async login(userEmail, password) {
    const userRef = await User.findOne({ userEmail });
    if (!userRef) {
      throw new Error("user with this email don't find");
    }

    const isPassEquals = bcrypt.compare(password, userRef.password);
    if (!isPassEquals) {
      throw new Error("Password is wrong");
    }

    const userDto = new UserDto(userRef);
    const tokens = TokenService.generateTokens({ ...userDto });

    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw new Error("User is unauthorize");
    }

    const userData = TokenService.validationRefreshToken(refreshToken);
    const tokenFromDb = await TokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw new Error("User is unauthorize");
    }
    const userRef = await User.findOne(userData.id);
    const userDto = new UserDto(userRef);
    const tokens = TokenService.generateTokens({ ...userDto });

    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async getUsers() {
    return User.find();
  }
}

module.exports = new AuthService();
