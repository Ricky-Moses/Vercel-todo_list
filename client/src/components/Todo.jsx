import React, { useEffect, useState } from 'react'
// Axios
import axios from 'axios'

// Environmental variable
const API = import.meta.env.VITE_API_URL

const Task = () => {

  const [data, setData] = useState([])
  const [newForm, setNewForm] = useState({
    taskName: '',
    taskDate: '',
    taskDetails: ''
  })
  const [isEditId, setIsEditId] = useState(null)
  const [editForm, setEditForm] = useState({
    taskName: '',
    taskDate: '',
    taskDetails: ''
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API}`)
      setData(res.data)
    }
    catch (err) {
      console.log('Error', err.message);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    if (isEditId) {
      setEditForm({ ...editForm, [name]: value })
    }
    else {
      setNewForm({ ...newForm, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("New Form: ", newForm);

    try {
      if (isEditId) {
        const res = await axios.put(`${API}/update_task/${isEditId}`, editForm)

        const updatedTask = data.map(task => 
          task._id === isEditId ? res.data.updateTask || res.data.task || res.data : task
        )

        setData(updatedTask)
        setEditForm({ taskName: '', taskDate: '', taskDetails: '' })
        setIsEditId(null)
      }
      else {
        const res = await axios.post(`${API}/add_task`, newForm)
        console.log(`New Form: `, res);

        setData([...data, res.data.Task])
        setNewForm({ taskName: '', taskDate: '', taskDetails: '' })
      }

    }
    catch (err) {
      console.log('Error', err.message);
    }


  }

  const handleEdit = (id) => {
    const selectedTask = data.find(task => task._id === id)
    setIsEditId(id)
    setEditForm({
      taskName: selectedTask.taskName,
      taskDate: selectedTask.taskDate,
      taskDetails: selectedTask.taskDetails,
    })
  }
  console.log('Edit ID: ', isEditId);

  const handleDelete = async (id) => {
    try{
      if(window.confirm(`Are you sure want to delete this list😨 - ${String(id).slice(-2)}`)){
        const res = await axios.delete(`${API}/delete_task/${id}`)

      if(res.status === 200){
        const filtered = data.filter(task => task._id !== id)
        setData(filtered)
      }
      }
    }
    catch(err){
      console.log('Error', err.message);
    }
  }

  console.log(data);

  return (
    <>
      <section className="container">
        <main className="task-cont">
          {isEditId ? (
            <form onSubmit={handleSubmit} className="add-task">
              <fieldset>
                <legend>Task Name</legend>
                <input type='text' name='taskName' className="" value={editForm.taskName} onChange={handleChange} />
              </fieldset>
              <fieldset>
                <legend>Task Date</legend>
                <input type='date' name='taskDate' className="" value={editForm.taskDate} onChange={handleChange} />
              </fieldset>
              <textarea name="taskDetails" id="" placeholder='Description' value={editForm.taskDetails} onChange={handleChange}></textarea>
              <button type='submit'>Update</button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="add-task">
              <fieldset>
                <legend>Task Name</legend>
                <input type='text' name='taskName' className="" value={newForm.taskName} onChange={handleChange} />
              </fieldset>
              <fieldset>
                <legend>Task Date</legend>
                <input type='date' name='taskDate' className="" value={newForm.taskDate} onChange={handleChange} />
              </fieldset>
              <textarea name="taskDetails" id="" placeholder='Description' value={newForm.taskDetails} onChange={handleChange}></textarea>
              <button type='submit'>Submit</button>
            </form>
          )}
          <div className="task-list">
            {data.filter(task => task && task.taskName).map((tasks, i) => (
              <details key={tasks._id}>
                <summary>{i + 1}. {tasks.taskName} ({String(tasks._id).slice(-2)}) [{String(tasks.taskDate)}] </summary>
                <p>{tasks.taskDetails}</p>
                <p>
                  <button type='button' onClick={() => handleEdit(tasks._id)}>Edit</button>
                  <button type='button' onClick={() => handleDelete(tasks._id)}>Delete</button>
                </p>
              </details>
            ))}
          </div>
        </main>
      </section>
    </>
  )
}

export default Task