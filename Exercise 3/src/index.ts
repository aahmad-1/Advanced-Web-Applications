import { Router, Request, Response } from "express";

const router: Router = Router();

// 1. Hello world route
router.get("/hello", (req: Request, res: Response) => {
    res.json({
        msg: "Hello world!"
    });
});

// 2. ID echoing
router.get("/echo/:id", (req: Request, res: Response) => {
    res.json({
        id: req.params.id
    });
});

// 3. POST request
router.post("/sum", (req: Request, res: Response) => {
    const numbers: number[] = req.body.numbers;

    const sum = numbers.reduce((total, current) => total + current, 0);

    res.json({
        sum: sum
    });
});

// 4. back-end communication
type TUser = {
    name: string;
    email: string;
};

let users: TUser[] = [];

router.post("/users", (req: Request, res: Response) => {
    const newUser: TUser = {
        name: req.body.name,
        email: req.body.email
    };

    users.push(newUser);

    res.json({
        message: "User successfully added"
    });
});

// 5. back-end communication
router.get("/users", (req: Request, res: Response) => {
    res.status(201).json(users);
});

export default router;