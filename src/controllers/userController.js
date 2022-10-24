const { application } = require("express");
const userService = require("../services/userService");

const createNewUser = async (req, res) => {
    const { idToken, name, email } = req.body;
    
    if(!idToken){
       return res.status(400).send({
        status: "FAILED",
        data: {
          error:
            "Parameter idToken can not be empty",
        },
      });
    }
    if (!name || !email) {
      return res.status(400).send({
        status: "FAILED",
        data: {
          error:
            "One of the following keys is missing or is empty in request body: 'name', 'mail'",
        },
      });
    }
    const newUser = {
      idToken: idToken,
      name: name,
      email: email,
      active: true,
      role: false,
    };
    try {
      const createdUser = await userService.createNewUser(idToken, newUser);
      res.send({ status: "OK", data: createdUser });
    } catch (error) {
      res.status(error?.status || 500).send({
        status: "FAILED",
        message: "Failed making the req: ",
        data: { error: error?.message || error },
      });
    }
  };

module.exports = {
    createNewUser
}