const router = require("express").Router();
const Task = require("../db/models/task");
const User = require("../db/models/user");
const { authenticateToken } = require("../middleware");

router.post("/create-task",authenticateToken, async(req,res)=>{
    try {
        const { title, description } = req.body;
        const { id } = req.headers;
        const newTask = new Task({
            title,
            description
        });
        // const saveTask = await newTask.save();
        const taskDetails = await Task.create({
            title,
            description
        })
        const taskId = taskDetails._id;
        await User.findByIdAndUpdate(id, { $push: {tasks: taskId}})

        return res.status(200).json({ message : "Task created successfully"})
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Internal server error", error: error})
    }
})

router.get("/all-tasks",authenticateToken, async(req,res)=>{
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate({
            path: "tasks",
            options: { sort: { createdAt: -1}}
        });
        res.status(200).json({ data: userData})
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Internal server error"})
    }
})

router.delete("/delete-task/:id",authenticateToken, async(req,res)=>{
    try {
        const { id } = req.params;
        const userId = req.headers.id;
        await Task.findByIdAndDelete(id);
        await User.findByIdAndUpdate(userId, { $pull: {tasks: id}})
        res.status(200).json({ message: "Task deleted successfully"})
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Internal server error"})
    }
})

//Update Task data
router.put("/update-task/:id",authenticateToken, async(req,res)=>{
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        await Task.findByIdAndUpdate(id, {title: title, description: description})
        res.status(200).json({ message: "Task updated successfully"})
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Internal server error"})
    }
})

//Update Important tasks
router.put("/update-imp-task/:id",authenticateToken, async(req,res)=>{
    try {
        const { id } = req.params;
        const taskData= await Task.findById(id);
        const impTask = taskData.important;
        await Task.findByIdAndUpdate(id, {important: !impTask})
        res.status(200).json({ important: !impTask})
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Internal server error"})
    }
})

//Update Completed Tasks
router.put("/update-complete-task/:id",authenticateToken, async(req,res)=>{
    try {
        const { id } = req.params;
        const taskData= await Task.findById(id);
        const completeTask = taskData.complete;
        await Task.findByIdAndUpdate(id, {complete: !completeTask})
        res.status(200).json({ important: !impTask})
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Internal server error"})
    }
})

//Get-important tasks
router.get("/get-imp-tasks",authenticateToken, async(req,res)=>{
    try {
        const { id } = req.headers;
        const data = await User.findById(id).populate({
            path: "tasks",
            match: {important: true},
            options: { sort: { createdAt: -1}}
        });
        const impTaskData = data.tasks;
        res.status(200).json({ data: impTaskData})
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Internal server error"})
    }
})


//Get-complete-Tasks
router.get("/get-complete-tasks",authenticateToken, async(req,res)=>{
    try {
        const { id } = req.headers;
        const data = await User.findById(id).populate({
            path: "tasks",
            match: {complete: true},
            options: { sort: { createdAt: -1}}
        });
        const completeTaskData = data.tasks;
        res.status(200).json({ data: completeTaskData})
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Internal server error"})
    }
})

router.get("/get-incomplete-tasks",authenticateToken, async(req,res)=>{
    try {
        const { id } = req.headers;
        const data = await User.findById(id).populate({
            path: "tasks",
            match: {complete: false},
            options: { sort: { createdAt: -1}}
        });
        const incompleteTaskData = data.tasks;
        res.status(200).json({ data: incompleteTaskData})
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Internal server error"})
    }
})



module.exports = router