"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const promises_1 = require("node:fs/promises");
const router = (0, express_1.Router)();
const USER_DATA = "data.json";
// let users: TUser[] = []; //  helped with tasks 1-4, not needed for task 5
// 1. Save users to server
router.post("/add", async (req, res) => {
    const { name, todo } = req.body;
    const users = await readUsers();
    let user = users.find(user => user.name === name);
    if (user) {
        user.todos.push(todo);
    }
    else {
        users.push({
            name: name,
            todos: [todo]
        });
    }
    await writeUsers(users);
    res.json({
        message: `Todo added successfully for user ${name}.`
    });
});
// 2. Fetch users (and their todos)
router.get("/todos/:id", async (req, res) => {
    const name = req.params.id;
    const users = await readUsers();
    const user = users.find(user => user.name === name);
    if (!user) {
        return res.json({
            message: "User not found"
        });
    }
    res.json(user.todos);
});
// 3. Delete users
router.delete("/delete", async (req, res) => {
    const { name } = req.body;
    const users = await readUsers();
    const index = users.findIndex(user => user.name === name);
    if (index === -1) {
        return res.json({
            message: "User not found"
        });
    }
    users.splice(index, 1); // remove 1 element from index "index". the element is the user hopefully
    await writeUsers(users);
    res.json({
        message: "User deleted successfully."
    });
});
// 4. Delete a (specific) todo
router.put("/update", async (req, res) => {
    const { name, todo } = req.body;
    const users = await readUsers();
    const user = users.find(user => user.name === name);
    if (!user) {
        return res.json({
            message: "User not found"
        });
    }
    const index = user.todos.indexOf(todo);
    if (index === -1) {
        return res.json({
            message: "Todo not found"
        });
    }
    user.todos.splice(index, 1);
    await writeUsers(users);
    res.json({
        message: "Todo deleted successfully."
    });
});
// 5. Read users from data.json
async function readUsers() {
    try {
        const data = await (0, promises_1.readFile)(USER_DATA, "utf8");
        return JSON.parse(data);
    }
    catch {
        await (0, promises_1.writeFile)(USER_DATA, "[]");
        return [];
    }
}
// Task 5: Save users to data.json
async function writeUsers(users) {
    await (0, promises_1.writeFile)(USER_DATA, JSON.stringify(users, null, 2));
}
exports.default = router;
