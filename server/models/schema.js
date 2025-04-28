import mongoose from "mongoose";

const userTasksSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true
    },
    taskDate: {
        type: String,
        required: true
    },
    taskDetails: {
        type: String,
        required: true
    }
})

const UserTask = mongoose.model('usertasks', userTasksSchema)

export default UserTask