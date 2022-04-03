const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { use } = require("../routes/api");
const { response } = require("express");
const User = mongoose.model("User");
const mailer = require("../lib/email");

let auth = {};

auth.signup = (req, res) => {
  try {
    const {
      name,
      username,
      email,
      password
    } = req.body;

    if (!name || !username || !email || !password) {
      return res
        .status(401)
        .json({ error: true, message: "Please fill all feilds" });
    }

    User.findOne({ email: email }, { email: 1, _id: 0 })
      .then((userEmail) => {
        if (userEmail) {
          return res
            .status(401)
            .json({ error: true, message: "This email already Exist" });
        }
        User.findOne({ username: username }, { username: 1, _id: 0 })
          .then((usernameDetails) => {
            if (usernameDetails) {
              return res
                .status(401)
                .json({ error: true, message: "Username already taken" });
            }

            const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS));
            const hash = bcrypt.hashSync(password, salt);

            const user = new User({
              name: name,
              email: email,
              password: hash,
              username: username
            });

            user
              .save()
              .then((userDetails) => {
                const token = jwt.sign(
                  {
                    _id: userDetails._id,
                    name: userDetails.name,
                    email: userDetails.email,
                    username: userDetails.username,
                    isActive: userDetails.isActive,
                  },
                  process.env.SUPER_SECRET_KEY
                );

                const link = process.env.PRODUCTION === "true" ? `${process.env.APP_HOST}${process.env.APP_VERSION}/emailverify?token=${token}` :`${process.env.APP_HOST}:${process.env.PORT}${process.env.APP_VERSION}/emailverify?token=${token}`;
                // console.log(link);

                mailer.email(
                  { name: name, link: link },
                  email,
                  "verifyUser.ejs",
                  "Email Verification",
                  (info) => {}
                );

                return res.status(200).json({
                  error: false,
                  message: "Signup Succesfully",
                  token: token,
                });
              })
              .catch((error) => {
                return res.status(500).json({
                  error: true,
                  message: error.message,
                });
              });
          })
          .catch((error) => {
            return res.status(500).json({
              error: true,
              message: error.message,
            });
          });
      })
      .catch((error) => {
        return res.status(500).json({
          error: true,
          message: error.message,
        });
      });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

auth.signin = (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email && !password) {
      return res
        .status(401)
        .json({ error: true, message: "Please fill all feilds" });
    }

    User.findOne({ email: email })
      .then((user) => {
        if (!user) {
          return res
            .status(401)
            .json({ error: true, message: "Wrong email id" });
        }

        const matchPassword = bcrypt.compareSync(password, user.password);
        if (!matchPassword) {
          return res
            .status(401)
            .json({ error: true, message: "Wrong password" });
        }
        const token = jwt.sign(
          {
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
            isActive: user.isActive
          },
          process.env.SUPER_SECRET_KEY
        );

        User.findByIdAndUpdate(
          { _id: user._id },
          { $set: { token: token } },
          { new: true, useFindAndModify: false }
        )
          .then((userDetails) => {
            return res.status(200).json({
              error: false,
              message: "Signin Succesfully",
              token: token,
            });
          })
          .catch((error) => {
            return res.status(500).json({
              error: true,
              message: error.message,
            });
          });
      })
      .catch((error) => {
        return res.status(500).json({
          error: true,
          message: error.message,
        });
      });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

auth.logout = (req, res) => {
  try {
    const { id } = req.params;

    User.findByIdAndUpdate(
      { _id: id },
      { $set: { token: "" } },
      { new: true, useFindAndModify: false }
    )
      .then(() => {
        return res.status(200).json({
          error: false,
          message: "Logout Successfull",
        });
      })
      .catch((error) => {
        return res.status(500).json({
          error: true,
          message: error.message,
        });
      });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

auth.verifyUserToken = (req, res) => {
  try {
    const { id } = req.params;

    try {
      User.findById({ _id: id }, { token: 1, _id: 0 })
        .then((response) => {
          return res.status(200).json({
            error: false,
            message: "User Token Verified",
            data: response,
          });
        })
        .catch((error) => {
          return res.status(500).json({
            error: true,
            message: error.message,
          });
        });
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: error.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

auth.emailVerify = (req, res) => {
  try {
    const { token } = req.query;

    const decoded = jwt.decode(token);
    const userEmail = decoded.email;

    User.updateOne({ email: userEmail }, { $set: { isActive: true } })
      .then((details) => {
        res.redirect("/email-verify");
        // return res.status(200).json({
        //   error : false,
        //   message : "Email Verification Successful",
        // })
      })
      .catch((error) => {
        return res.status(500).json({
          error: true,
          message: error.message,
        });
      });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

auth.sendForgetPasswordLink = (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(401)
        .json({ error: true, message: "Please fill all feilds" });
    }

    User.findOne({ email: email }, { _id: 0, email: 1, name: 1 })
      .then((user) => {
        if (!user) {
          return res
            .status(401)
            .json({ error: true, message: "Please, Enter a valid Email id" });
        }
        const link = `${process.env.FONTEND_HOST}/newpassword/${email}`;
        mailer.email(
          { name: user.name, link: link },
          email,
          "resetPassword.ejs",
          "Reset Password",
          (info) => {}
        );
        return res.status(200).json({
          error: false,
          message:
            "A Password reset mail send to your email, (Check Your Spam Folder)",
        });
      })
      .catch((error) => {
        return res.status(500).json({
          error: true,
          message: error.message,
        });
      });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

auth.resetPassword = (req, res) => {
  try {
    const { email, newpassword } = req.body;
 
    const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS));
    const hash = bcrypt.hashSync(newpassword, salt);

    User.findOneAndUpdate(
      { email: email },
      { $set: { password: hash } },
      { new: true, useFindAndModify: false }
    )
      .then((details) => {
        if (!details) {
          return res
            .status(401)
            .json({ error: true, message: "The Email Id is not Valid" });
        }
        return res.status(200).json({
          error: false,
          message: "Password Reset Succesful"
        });
      })
      .catch((error) => {
        return res.status(500).json({
          error: true,
          message: error.message,
        });
      });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

module.exports = auth;
