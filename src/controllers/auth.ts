import bcrypt from "bcrypt"
import { UserModel } from "../../types/model/user";
import { getOne } from "../services/user"
import { v4 as uuidv4 } from 'uuid'
import { config } from "dotenv"
import jwt from 'jsonwebtoken'
import { getRefreshToken, saveRefreshToken } from "../services/auth";
config()

export const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        const dbToken = await getRefreshToken(refreshToken)
        if (!dbToken) {
            return
        }

        const newRefreshToken = uuidv4()
        await saveRefreshToken({
            token: refreshToken,
            userId: dbToken.user_id
        })

        res.status(200).json({
            token: jwt.sign({
                exp: 60000,
                data: dbToken.user_id
            }, process.env.SECRET_KEY || 'verysecretkey'),
            refreshToken: newRefreshToken
        })
    } catch (error) {
        throw new Error(error)
    }
}

export const auth = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user: UserModel = await getOne(email);

        if (!user || !bcrypt.compareSync(password, user.password)) {
            res.status(403).json({
                message: 'Incorrect email or password'
            })
            throw new Error();
        }

        const refreshToken = uuidv4()
        await saveRefreshToken({
            token: refreshToken,
            userId: user.id
        })

        res.status(200).json({
            token: jwt.sign({
                exp: 60000,
                data: user.id
            }, process.env.SECRET_KEY || 'verysecretkey'),
            refreshToken
        })

    } catch (error) {
        throw new Error(error)
    }
}