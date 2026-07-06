import {Request, Response, Router} from "express"
import { validateToken } from "../middleware/validateToken"

const router: Router = Router();

// 4. secret route
router.get("/api/private", validateToken, (req: Request, res: Response) => {
    return res.status(200).json({message: "This is protected secure route!"});
});

export default router;