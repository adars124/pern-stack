import React, { useEffect, useState } from "react";

import EditTodo from "./EditTodo";

const ListTodos = () => {

    const [todos, setTodos] = useState([]);

    const getTodos = async () => {
        try {
            const res = await fetch('http://localhost:5000/todos');

            const jsonData = await res.json();

            setTodos(jsonData);
        } catch (err) {
            console.log(err.message);
        }
    };

    const deleteTodo = async (id) => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
                method: 'DELETE'
            });

            setTodos(todos.filter(todo => todo.todo_id !== id));
        } catch (err) {
            console.log(err.message);
        }
    }

    // for fetching data
    useEffect(() => {
        getTodos();
    }, []);

    return (
        <>
            <table className="table table-bordered table-success table-striped table-hover mt-5">
                <thead>
                    <tr>
                        <th>S.N.</th>
                        <th>Description</th>
                        <th colSpan='2'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr key={todo.todo_id}>
                            <td>{todo.todo_id}</td>
                            <td>{todo.description}</td>
                            <td><EditTodo todo={todo}/></td>
                            <td><button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
};

export default ListTodos;