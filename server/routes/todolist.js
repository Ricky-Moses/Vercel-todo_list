import express from 'express'
import UserTask from '../models/schema.js'

const router = express.Router()

// GET
router.get('/', async (req, res) => {
    try{
        const User = await UserTask.find()
        res.status(200).json(User)
    }
    catch(err){
        console.log(`Server Error ${err.message}`);
        res.status(500).json({message: 'Server Error'})
    }
})

// POST
router.post('/add_task', async (req, res) => {
    const {taskName, taskDate, taskDetails} = req.body

    try{
        const newTask = new UserTask({
            taskName, taskDate, taskDetails
        })

        await newTask.save()

        res.status(200).json({message: 'Successfully task added', Task: newTask})
    }
    catch(err){
        console.log('Error creating user', err.message);
        res.status(500).json({message: 'Server Error'})
    }
})

// Update
router.put('/update_task/:id', async (req, res) =>{
    try{
        const updateTask = await UserTask.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        )
        res.status(200).json(updateTask)
    }
    catch(err){
        console.log('Error creating user', err.message);
        res.status(500).json({message: 'Server Error'})
    }
})

// Delete
router.delete('/delete_task/:id', async (req, res) => {
    try{
        const deleteTask = await UserTask.findByIdAndDelete(req.params.id)
        res.status(200).json({message: 'Task deleted successfully'})
    }
    catch(err){
        console.log('Error creating user', err.message);
        res.status(500).json({message: 'Server Error'})
    }
})

export default router