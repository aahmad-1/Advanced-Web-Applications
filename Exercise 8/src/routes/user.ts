import { Request, Response, Router } from "express"
import { Result, ValidationError, validationResult } from "express-validator"
import bcrypt from "bcrypt"
import jwt, { JwtPayload } from "jsonwebtoken"
import { User, IUser } from "../models/User"
import { registerValidation, loginValidation } from "../validators/inputValidation"
import dotenv from "dotenv"

dotenv.config()

const router: Router = Router()

router.post("/register", registerValidation,
    async (req: Request, res: Response) => {
        const errors: Result<ValidationError> = validationResult(req)

        if (!errors.isEmpty()) {
            // console.log(errors);
            return res.status(400).json({errors: errors.array()
            });
        }

        try {
            const existingUser: IUser | null = await User.findOne({email: req.body.email})
            // console.log(existingUser)
            if (existingUser) {
                return res.status(403).json({email: "email already in use."})
            }

            const salt: string = bcrypt.genSaltSync(10)
            const hash: string = bcrypt.hashSync(req.body.password, salt)

            const newUser: IUser = await User.create({
                email: req.body.email,
                username: req.body.username,
                password: hash,
                isAdmin: req.body.isAdmin ?? false 

            });
            // console.log("New user:", newUser);
            return res.status(200).json(newUser); //hopefully this works

        }
        catch (error: any) {
            console.error(error)
            return res.status(500).json({message: "Internal Server Error"})
        }
    }
);

router.post("/login", loginValidation,
    async (req: Request, res: Response) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            // console.log(errors);
            return res.status(400).json({errors: errors.array()})
        }

        try {
            const user: IUser | null = await User.findOne({email: req.body.email})
            // console.log(user);

            if (!user) {
                return res.status(404).json({message: "User not found"})
            }

            const match: boolean = bcrypt.compareSync(req.body.password, user.password);  //this compares entered password w/ hashed passowrd
            // console.log(match);
            if (!match) { //if passwords dont match
                return res.status(401).json({message: "Incorrect password"})
            }

            const jwtPayload: JwtPayload = {
                _id: user._id,
                username: user.username,
                isAdmin: user.isAdmin
            };

            const token: string = jwt.sign(jwtPayload, process.env.SECRET as string, {expiresIn: "2h"})
            // console.log("Generated JWT:", token);
            return res.status(200).json({token})

        } catch (error: any) {
            console.error(error)
            return res.status(500).json({message: "Internal Server Error"})
        }
    }
);

export default router