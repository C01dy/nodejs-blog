import { createOne, getOne } from "../services/user"
import bcrypt from "bcrypt"
import { UserModel } from "../../types/model/user"

export const createUser = async (req, res) => {
  try {
    const isUserExist: boolean = !!(await getOne(req.body.email)) || false

    if (isUserExist) {
      res.status(403).json({
        status: 0,
        message: `user with ${req.body.email} email address already exists`,
      })
      return
    }

    const encryptedPassword = await bcrypt.hash(req.body.password, 10)
    const userData: object = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: encryptedPassword,
      username: req.body.username,
    }
    const user: UserModel = await createOne(userData)
    res.status(200).json({
      status: 1,
      data: user,
    })
  } catch (error) {
    res.status(400).json({
      status: 0,
      message: "Error when try to create user",
    })
  }
}