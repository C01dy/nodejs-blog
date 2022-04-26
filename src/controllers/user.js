const { createOne, getOne } = require("../models/user")
const bcrypt = require("bcrypt")

const signIn = async () => {
  try {
  } catch (error) {}
}

const createUser = async (req, res) => {
  try {
    const isUserExist = !!(await getOne(req.body.email)) || null

    if (isUserExist) {
      res.status(403).json({
        status: 0,
        message: "user with this email address already exists",
      })
      return
    }

    const encryptedPassword = await bcrypt.hash(req.body.password, 10)
    const userData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: encryptedPassword,
      username: req.body.username,
    }
    const user = await createOne(userData)
    res.status(200).json({
      status: 1,
      data: user,
    })
  } catch (error) {
    res.status(400).json({
      message: "Error when try to create user",
    })
  }
}

module.exports = {
  createUser,
}
