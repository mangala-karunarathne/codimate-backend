const Employer = require("../models/EmployerModel");
const generateAuthToken = require("../utils/generateAuthToken");
const { hashPassword, comparePasswords } = require("../utils/hashPassword");

const registerEmployer = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!(username && password)) {
      return res.status(400).send("All inputs are required");
    }
    const hashedPassword = hashPassword(password);
    const employerExists = await Employer.findOne({ username });
    if (employerExists) {
      return res.status(400).send("User already exists");
    } else {
      const employer = await Employer.create({
        username,
        password: hashedPassword,
      });
      res
        .cookie("access_token", generateAuthToken(employer._id, employer.username), {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        })
        .status(201)
        .json({
          success: "Employer Created",
          userCreated: {
            _id: employer._id,
            username: employer.username,
          },
        });
    }
  } catch (error) {
    next(error);
  }
};

const loginEmployer = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!(username && password)) {
      return res.status(400).send("All inputs are required");
    }

    const employer = await Employer.findOne({ username }).orFail();

    if (employer && comparePasswords(password, employer.password)) {
      let cookieParams = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      };

      return res
        .cookie(
          "access_token",
          generateAuthToken(employer._id, employer.username),
          cookieParams
        )
        .json({
          access_token: generateAuthToken(employer._id, employer.username),
          success: "Employer Logged in",
          userLoggedIn: {
            _id: employer._id,
            username: employer.username,
          },
        });
    } else {
      return res.status(401).send("Wrong Credentials");
    }
  } catch (error) {
    next(error);
  }
};

const palingdrome = (req, res) => {

const stringsToCheck = req.body.strings;

const palindromes = stringsToCheck.filter(string => {

  const reversedString = string.split('').reverse().join('');

  return string === reversedString;

});

res.status(200).json({ message: "Palindrome Data", palindromes });

};

const differenceCheck = async (req, res) => {

const reqData = req.body.different;

const resData = ["asd", "add"]

let difference = reqData.filter(x => !resData.includes(x));

return res.status(200).json({message:"difference data",difference})

};

module.exports = {
  registerEmployer,
  loginEmployer,
  palingdrome,
  differenceCheck,
};
