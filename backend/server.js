require("dotenv").config()

const express = require("express")
const cors = require("cors")
const { Sequelize, DataTypes } = require("sequelize")

const app = express()

app.use(cors())
app.use(express.json())

// Initialize Sequelize with PostgreSQL
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres"
  }
)

// Define Task model
const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true,
  tableName: "tasks"
})

// Test database connection and sync
sequelize.authenticate()
  .then(() => {
    console.log("PostgreSQL Connected")
    return sequelize.sync()
  })
  .catch(err => console.log("Database connection error:", err))

// CREATE
app.post("/tasks", async (req,res)=>{
  try {
    const task = await Task.create({ title: req.body.title })
    res.json(task)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// READ
app.get("/tasks", async (req,res)=>{
  try {
    const tasks = await Task.findAll()
    res.json(tasks)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// UPDATE
app.put("/tasks/:id", async (req,res)=>{
  try {
    const task = await Task.findByPk(req.params.id)
    if (!task) {
      return res.status(404).json({ error: "Task not found" })
    }
    await task.update({ title: req.body.title })
    res.json(task)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// DELETE
app.delete("/tasks/:id", async (req,res)=>{
  try {
    const task = await Task.findByPk(req.params.id)
    if (!task) {
      return res.status(404).json({ error: "Task not found" })
    }
    await task.destroy()
    res.json({ message: "Deleted" })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

app.listen(process.env.PORT, ()=>{
  console.log("Server running on port", process.env.PORT)
})