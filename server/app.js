import express from 'express'
import cors from 'cors'
import ConnectDB from './config/db.js'
import TodoList from './routes/todolist.js'

// Instance or function calling
const app = express()

// DB
ConnectDB()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/task', TodoList)

// Home route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Server running
const PORT = process.env.PORT || 3000
app.listen(PORT, () =>{
    console.log(`Server is running - ${PORT}`);
})