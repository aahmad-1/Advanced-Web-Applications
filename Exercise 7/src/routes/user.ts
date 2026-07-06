import { Request, Response, Router } from "express" // once again mostly same as demo code just tweaked a bit for the assignment
import { body, validationResult, Result, ValidationError } from "express-validator"
import bcrypt from "bcrypt"
import jwt, { JwtPayload } from "jsonwebtoken"
import dotenv from "dotenv"
import { User, IUser } from "../models/User"

dotenv.config();
const router: Router = Router();

// 1. Register
router.post("/register",
    body("email").trim().escape().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/), // got valid regex email check from https://www.geeksforgeeks.org/javascript/how-to-validate-email-address-using-regexp-in-javascript/
    body("password").isLength({min: 5}),
    async (req: Request, res: Response) => {
        const errors: Result<ValidationError> = validationResult(req)

        if (!errors.isEmpty()) {
            console.log(errors);
            return res.status(400).json({errors: errors.array()})
        }

        try {
            const existingUser: IUser | null = await User.findOne({email: req.body.email})
            // console.log(existingUser)
            if (existingUser) {
                return res.status(403).json({message: "Email already in use"})
            }

            const salt: string = bcrypt.genSaltSync(10)
            const hash: string = bcrypt.hashSync(req.body.password, salt)

            const newUser: IUser = await User.create({
                email: req.body.email,
                password: hash
            });

            // console.log("User registered:", newUser.email)
            return res.status(201).json(newUser)

        } catch (error: any) {
            console.error(`Registration error: ${error}`);
            return res.status(500).json({ message: "Internal Server Error" })
        }

    }
);

// 2. login
router.post("/login",
    body("email").trim().escape().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/), // got valid regex email check from https://www.geeksforgeeks.org/javascript/how-to-validate-email-address-using-regexp-in-javascript/
    body("password").isLength({min: 5}),
    async (req: Request, res: Response) => {
        try {
            const user: IUser | null = await User.findOne({email: req.body.email})
            //console.log(user)

            if (!user) {
                return res.status(401).json({message: "Login failed"});
            }

            const match: boolean = bcrypt.compareSync(req.body.password, user.password); //this compares entered password w/ hashed passowrd

            if (!match) { // if passwords dont match
                return res.status(401).json({message: "Login failed"});
            }

            const jwtPayload: JwtPayload = {
                id: user._id,
                email: user.email
            }

            const token: string = jwt.sign(jwtPayload, process.env.SECRET as string, { expiresIn: "2h"}) // 2m too short, 2h instead
            console.log("User logged in:", user.email);
            return res.status(200).json({success: true, token});

        } catch (error: any) {
            console.error(`Login error: ${error}`);
            return res.status(500).json({message: "Internal Server Error"});
        }

    }
);

// 3. List users
router.get("/list", async (req: Request, res: Response) => {
    try {
        const users: IUser[] = await User.find();
        return res.status(200).json(users);
    } catch (error: any) {
        console.error(`Error fetching users: ${error}`);
        return res.status(500).json({message: "Internal Server Error"});
    }

});

export default router;