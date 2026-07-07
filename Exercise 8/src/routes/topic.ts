import {Request, Response, Router} from "express";
import {Topic, ITopic} from "../models/Topic";
import {validateToken, validateAdmin, CustomRequest} from "../middleware/validateToken";

const router: Router = Router();

router.get("/topics",
    async (req: Request, res: Response) => {
        try {
            const topics: ITopic[] = await Topic.find();
            return res.status(200).json(topics);

        } catch (error: any) {
            // console.error(error);
            return res.status(500).json({message: "Internal Server Error"});
        }
    }
);

router.post("/topic", validateToken,
    async (req: CustomRequest, res: Response) => {
        try {
            const newTopic: ITopic = await Topic.create({
                title: req.body.title,
                content: req.body.content,
                username: req.user!.username // ! fixes the error somehow
            });

            return res.status(200).json(newTopic);

        } catch (error: any) {
            console.error(error);
            return res.status(500).json({message: "Internal Server Error"});
        }
    }
);

router.delete("/topic/:id", validateAdmin,
    async (req: Request, res: Response) => {
        try {
            await Topic.findByIdAndDelete(req.params.id);
            return res.status(200).json({message: "Topic deleted successfully."});

        } catch (error: any) {
            console.error(error);
            return res.status(500).json({message: "Internal Server Error"});
        }
    }
);

export default router;