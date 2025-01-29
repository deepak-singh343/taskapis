const express = require('express')
const app = express()
require('dotenv').config(); 
const port  = process.env.PORT 
const db = require('./mongoose')
const Task = require('./Models/Task')
app.use(express.json())

app.get('/',async function(req,res){
    try {
        const tasks = await Task.find()
        console.log('tasks',tasks)
        res.status(200).json(tasks);
    } catch (error) {
        console.log('error',error)
    }
})

app.get('/default',async function(req,res){
    try {
        res.status(200).json("default request");
    } catch (error) {
        console.log('error',error)
    }
})

app.post('/add',async function(req,res){
    try {
        console.log(req.body)
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Task name is required" });
        }
        const task = new Task({ name });
        await task.save();
        console.log(task)
        res.status(201).json({ message: "Task added successfully", task });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
})

app.delete('/delete/:id',async(req,res)=>{
    try {
        const id = req.params.id
        const res = await Task.findByIdAndDelete(id)
        res.status(201).json({ message: "Task deleted successfully" });
        console.log(res)
    } catch (error) {
        console.log(error)
    }
})

app.put('/update', async (req, res) => {
    try {
        const { name, id } = req.body;

        // Check if both 'name' and 'id' are provided
        if (!name || !id) {
            return res.status(400).json({ message: "Both 'name' and 'id' are required" });
        }

        // Use Mongoose's findByIdAndUpdate to update the task by its ID
        const updatedTask = await Task.findByIdAndUpdate(id, { name:name }, { new: true });

        // If task not found
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Send success response with updated task
        res.status(200).json({ message: "Task updated successfully", updatedTask });
    } catch (error) {
        // Handle any errors that might occur
        console.error("Error during update:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = app
// app.listen(port,(err)=>{
//     if(err)
//         console.log(err)
//     else
//         console.log(`app is listening on port ${port}`)
// })