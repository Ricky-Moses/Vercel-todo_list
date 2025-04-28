import express from 'express'
import ConnectDB from './config/db.js'
import TodoList from './routes/todolist.js'

// Instance or function calling
const app = express()

// DB
ConnectDB()

// Middleware
app.use(express.json())

// Routes
app.use('/api/task', TodoList)

// Server running
const PORT = process.env.PORT || 3000
app.listen(PORT, () =>{
    console.log(`Server is running http://localhost:3000/api/task - ${PORT}`);
})