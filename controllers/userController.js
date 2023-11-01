const User = require("../models/UserModel");
const generateAuthToken = require("../utils/generateAuthToken");
const { hashPassword, comparePasswords } = require("../utils/hashPassword");

const registerUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!(username && password)) {
      return res.status(400).send("All inputs are required");
    }
    const hashedPassword = hashPassword(password);
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).send("User already exists");
    } else {
      const user = await User.create({
        username,
        password: hashedPassword,
      });
      res
        .cookie("access_token", generateAuthToken(user._id, user.username), {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        })
        .status(201)
        .json({
          success: "User Created",
          userCreated: {
            _id: user._id,
            username: user.username,
          },
        });
    }
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!(username && password)) {
      return res.status(400).send("All inputs are required");
    }

    const user = await User.findOne({ username }).orFail();

    if (user && comparePasswords(password, user.password)) {
      let cookieParams = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      };

      return res
        .cookie(
          "access_token",
          generateAuthToken(
            user._id,
            user.username,
          ),
          cookieParams
        )
        .json({
          access_token: generateAuthToken(
            user._id,
            user.username,
          ),
          success: "User Logged in",
          userLoggedIn: {
            _id: user._id,
            username: user.username,
          },
        });
    } else {
      return res.status(401).send("Wrong Credentials");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
