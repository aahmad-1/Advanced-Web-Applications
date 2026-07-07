import {Request, Response, NextFunction} from "express" // first function expression straight from demo code (once again)
import jwt, {JwtPayload} from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export interface CustomRequest extends Request {
    user?: JwtPayload
}

// validating logged-in user
export const validateToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    const token: string | undefined = req.header("authorization")?.split(" ")[1]

    if (!token) {
        return res.status(401).json({message: "Token not found."})
    }

    try {
        const verified = jwt.verify(token, process.env.SECRET as string) as JwtPayload
        // console.log("verified token payload:", verified);
        req.user = verified
        next()

    } catch (error) {
        return res.status(401).json({message: "Token not found."})
    }
};

// validating an admin user
export const validateAdmin = (req: CustomRequest, res: Response, next: NextFunction) => {
    const token: string | undefined = req.header("authorization")?.split(" ")[1]

    if (!token) {
        return res.status(403).json({message: "Access denied."})
    }

    try {
        const verified = jwt.verify(token, process.env.SECRET as string) as JwtPayload

        if (!verified.isAdmin) {
            console.log("user is not an admin")
            return res.status(403).json({message: "Access denied."});
        }

        req.user = verified;
        next();

    } catch (error) {
        return res.status(403).json({message: "Access denied."});
    }
};