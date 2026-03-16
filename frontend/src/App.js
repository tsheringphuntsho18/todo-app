import { useEffect, useState } from "react"

function App() {

  const [tasks,setTasks] = useState([])
  const [title,setTitle] = useState("")
  const [editId,setEditId] = useState(null)

  const API = process.env.REACT_APP_API_URL

  const fetchTasks = async ()=>{
    try {
      const res = await fetch(`${API}/tasks`)
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      const data = await res.json()
      setTasks(data)
    } catch (error) {
      console.error("Error fetching tasks:", error)
    }
  }

  useEffect(()=>{
    fetchTasks()
    // eslint-disable-next-line
  },[])

  const addTask = async ()=>{
    try {
      if(editId){
        const res = await fetch(`${API}/tasks/${editId}`,{
          method:"PUT",
          headers:{"Content-Type":"application/json"},
          body: JSON.stringify({title})
        })
        if (!res.ok) throw new Error("Failed to update task")
        setEditId(null)
      } else {
        const res = await fetch(`${API}/tasks`,{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body: JSON.stringify({title})
        })
        if (!res.ok) throw new Error("Failed to add task")
      }
      setTitle("")
      fetchTasks()
    } catch (error) {
      console.error("Error adding/updating task:", error)
    }
  }

  const deleteTask = async (id)=>{
    try {
      const res = await fetch(`${API}/tasks/${id}`,{
        method:"DELETE"
      })
      if (!res.ok) throw new Error("Failed to delete task")
      fetchTasks()
    } catch (error) {
      console.error("Error deleting task:", error)
    }
  }

  const editTask = (task)=>{
    setTitle(task.title)
    setEditId(task.id)
  }

  return (
    <div className="app" style={{padding:"40px"}}>
      <h1 className="app-title">My To-Do List </h1>

      <div className="input-row">
        <input
          className="task-input"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          placeholder="Enter task"
        />

        <button className="btn add-btn" onClick={addTask}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      <ul className="task-list">
        {tasks.map(task=>(
          <li key={task.id} className="task-item">
            <span className="task-title">{task.title}</span>
            <div className="item-actions">
              <button className="btn edit-btn" onClick={()=>editTask(task)}>Edit</button>
              <button className="btn delete-btn" onClick={()=>deleteTask(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

    </div>
  )
}

export default App;