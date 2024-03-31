const { json } = require("express");
const User = require("../schemas/User");

const registerUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    console.log(email);
    console.log(password);

    // if (!name) {
    //   return res.json({
    //     error: "name is required",
    //   });
    // }

    if (!password || password.length < 5) {
      return res.json({
        error: "Password is required and should be at least 6 characters long",
      });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "email is taken",
      });
    }

    const user = await User.create({
      firstName: "TBD",
      lastName: "TBD",
      uID: "TBD",
      email: email,
      password: password,
      phoneNumber: "TBD", // Optional field
      bio: "TBD", // Optional field
      major: "TBD", // Optional field
      services: ["Service 1", "Service 2"], // Optional field
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registerUser,
};
