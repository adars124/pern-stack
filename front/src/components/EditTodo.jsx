import React, { useState } from 'react';

const EditTodo = ({ todo }) => {

    const [description, setDescription] = useState(todo.description);

    const updateDescription = async (ev) => {
        ev.preventDefault();

        try {
            const body = { description };
            const res = await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
                method: 'PUT',
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
            <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target={`#id${todo.todo_id}`}>
                Edit
            </button>

            <div className="modal" id={`id${todo.todo_id}`}>
                <div className="modal-dialog">
                    <div className="modal-content">

        
                        <div className="modal-header">
                            <h4 className="modal-title">Edit Todo</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => setDescription(todo.description)}></button>
                        </div>

        
                        <div className="modal-body">
                            <input type="text" className='form-control' value={description} onChange={e => setDescription(e.target.value)}/>
                        </div>

        
                        <div className="modal-footer">
                            <button type="button" classsName="btn btn-warning" data-bs-dismiss="modal" onClick={e => updateDescription(e)}>Save</button>
                            <button type="button" classsName="btn btn-danger" data-bs-dismiss="modal" onClick={() => setDescription(todo.description)}>Close</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default EditTodo;