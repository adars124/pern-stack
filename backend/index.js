const express = require('express');
const app = express();
const PORT = 5000;
const cors = require('cors');
const pool = require('./db');

// middlewares
app.use(cors());
app.use(express.json());

// Routes

// create a todo
app.post('/todos', async (req, res, next) => {
    try {

        const { description } = req.body;
        const newTodo = await pool.query('INSERT INTO todo (description) VALUES ($1) RETURNING *', [description]);
        
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
})

// get all todos
app.get('/todos', async (req, res, next) => {
    try {
        const todos = await pool.query('SELECT * FROM todo ORDER BY todo_id ASC');
        
        res.json(todos.rows);
    } catch (err) {
        console.log(err.message);
    }
})

// get a todo
app.get('/todos/:id', async (req, res, next) => {
    try {
        const todo = await pool.query('SELECT * FROM todo WHERE todo_id = ($1)', [req.params.id]);

        res.json(todo.rows);
    } catch (err) {
        console.log(err.message);
    }
})

// update a todo
app.put('/todos/:id', async (req, res, next) => {
    try {
        const { description } = req.body;
        const todo = pool.query('UPDATE todo SET description = ($1) WHERE todo_id = ($2)', [description, req.params.id]);

        res.json({
            success: 'Successfully updated!'
        });
    } catch (err) {
        console.log(err.message);
    }
})

// delete a todo
app.delete('/todos/:id', async (req, res, next) => {
    try {
        const todo = pool.query('DELETE FROM todo WHERE todo_id = ($1)', [req.params.id]);

        res.json({
            success: 'Deleted successfully!'
        });
    } catch (err) {
        console.log(err.message);
    }
})

app.listen(PORT, () => {
    console.log(`Server started at: ${PORT}`);
});