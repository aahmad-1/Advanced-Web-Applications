import { Router, Request, Response } from "express";
import { User, IUser } from "./models/User";

const router: Router = Router();


// 1. Save todos to database
router.post("/add", async (req: Request, res: Response) => {
    const { name, todo } = req.body;

    try {
        let user: IUser | null = await User.findOne({ name });
        if (user) {
            user.todos.push({
                todo,
                checked: false
            });

            await user.save();

        } else {
            user = new User({
                name,
                todos: [{
                    todo,
                    checked: false
                }]
            });
            await user.save();
        }

        res.json({
            message: `Todo added successfully for user ${name}.`
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"});
    }

});

// 2. Get todos from database
router.get("/todos/:id", async (req: Request, res: Response) => {
    const name = req.params.id as string;

    try {
        const user: IUser | null = await User.findOne({ name });
        if (!user) {
            return res.json({
                message: "User not found"
            });
        }

        res.json(user.todos);

    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"});
    }

});

// 3. Delete todos from database
router.delete("/delete", async (req: Request, res: Response) => {
    const { name } = req.body;

    try {
        const user: IUser | null = await User.findOneAndDelete({ name });
        if (!user) {
            return res.json({
                message: "User not found"
            });
        }

        res.json({
            message: "User deleted successfully."
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"});
    }

});

// Delete users themselves
router.put("/update", async (req: Request, res: Response) => {
    const { name, todo } = req.body;

    try {
        const user: IUser | null = await User.findOne({ name });
        if (!user) {
            return res.json({
                message: "User not found"
            });
        }

        user.todos = user.todos.filter(item => item.todo !== todo);

        await user.save();

        res.json({
            message: "Todo deleted successfully."
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"});
    }
});

// 4. Update todos
router.put("/updateTodo", async (req: Request, res: Response) => {
    const { name, todo, checked } = req.body;

    try {
        const user: IUser | null = await User.findOne({ name });
        if (!user) {
            return res.json({
                message: "User not found"
            });
        }

        const foundTodo = user.todos.find(item => item.todo === todo);
        if (!foundTodo) {
            return res.json({
                message: "Todo not found"
            });
        }

        foundTodo.checked = checked;

        await user.save();

        res.json({
            message: "Todo updated successfully."
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"});
    }

});


export default router


// from week 4, not needed in week 5

// // 5. Read users from data.json
// async function readUsers(): Promise<TUser[]> {

//     try {
//         const data = await readFile(USER_DATA, "utf8");
//         return JSON.parse(data);

//     } catch {
//         await writeFile(USER_DATA, "[]");
//         return [];
//     }

// }

// // 5. Save users to data.json
// async function writeUsers(users: TUser[]) {

//     await writeFile(
//         USER_DATA,
//         JSON.stringify(users, null, 2)
//     );

// }