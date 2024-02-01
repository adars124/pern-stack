import React, { useState } from "react";

const InputTodo = () => {

    const [description, setDescription] = useState('');

    const handleSubmit = async (ev) => {
        ev.preventDefault();

        try {
            const body = { description };

            const res = await fetch('http://localhost:5000/todos', {
                method: 'POST',
                headers: { 'Content-Type' : 'application/json' },
                body: JSON.stringify(body)
            });

            window.location.href = '/';
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <>
            <h1 className="text-center mt-5">Pern-Stack Todo App</h1>
            <form className="d-flex mt-5" onSubmit={ handleSubmit }>
                <input type="text" className="form-control me-3" value={description} onChange={ev => setDescription(ev.target.value)} placeholder="Enter your todo..."/>
                <button className="btn btn-success">Add</button>
            </form>
        </>
    );
};

export default InputTodo;