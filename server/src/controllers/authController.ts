import { User, getUserByEmail } from "../models/User";
import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import { validateEmail, validatePassword } from "../utils/validation";
dotenv.config({ path: __dirname + '/../.env' });;


function generateAccessToken(_id: Object): string {
    return jwt.sign({ _id: _id }, process.env.JWT_SECRET || "", { expiresIn: '15s' })
}

function generateRefreshToken(_id: Object): string {
    return jwt.sign({ _id: _id }, process.env.JWT_REFRESH_SECRET || "")
}


const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(401).json({
            error: "All fields are required"
        })
    }
    if(!validateEmail(email)){
        return res.status(401).json({
            error: "Invalid Email"
        })
    }
    if(!validatePassword(password)){
        return res.status(401).json({
            error: "Password must contain atleast 1 uppercase, 1 lowercase, 1 numeric, 1 special symbol and must be atleast 8 characters long"
        })
    }
    try {
        const user = await getUserByEmail(email)
        if (!user) {
            return res.status(401).json({
                error: "Invalid Credentials"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({
                error: "Invalid Credentials"
            })
        }
        const access_token = generateAccessToken(user._id)
        const refresh_token = generateRefreshToken(user._id)
        user.refresh_token = refresh_token
        user.save()
            .then((user) => {
                res.cookie('access_token', access_token, { httpOnly: true})
                res.cookie('refresh_token', refresh_token, { httpOnly: true })
                console.log(res.cookie)
                return res.status(200).json({
                    success: "User Logged In",
                    _id: user._id,
                    name: user.username,
                    email: user.email,
                    access_token: access_token,
                    refreshToken: user.refresh_token
                })
            })
            .catch((err) => {
                return res.status(500).json({
                    error: err.message
                })
            })

    } catch (err: any) {
        return res.status(500).json({
            error: err.message
        })
    }
}

const logoutUser = async (req: Request, res: Response) => {
    // clear access token and refresh token
    res.clearCookie('refresh_token')
    res.clearCookie('access_token')
    return res.status(200).json({
        success: "User Logged Out"
    })
}

const refreshToken = async (req: Request, res: Response) => {
    const token = req.cookies.refresh_token
    if (!token) {
        return res.status(401).json({
            error: "Not logged In"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string)
        console.log(decoded)
        if (!decoded) {
            return res.status(401).json({
                error: "Invalid Token"
            })
        }
        const user = await User.findById(decoded)
        if (!user) {
            return res.status(401).json({
                error: "User not found"
            })
        }
        if (user.refresh_token !== token) {
            return res.status(401).json({
                error: "Invalid Token"
            })
        }
        jwt.verify(token, process.env.JWT_REFRESH_SECRET as string, (err: any, user: any) => {
            if (err) {
                return res.status(401).json({
                    error: "Invalid Token"
                })
            }
            const access_token = generateAccessToken(user._id)
            res.cookie('access_token', access_token, { httpOnly: true, maxAge: 1000 * 15 })
            return res.status(200).json({
                success: "Access Token Refreshed"
            })

        })
    } catch (err: any) {
        return res.status(500).json({
            error: err.message
        })
    }
}


const authController = {
    loginUser,
    logoutUser,
    refreshToken
}
export default authController;