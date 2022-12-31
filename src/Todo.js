import React, { useRef, useState } from 'react';

export default function Todo({ todo, todoToggle, editTodo }) {
  const [editable, setEditable] = useState(false);
  const todoEditRef = useRef();

  const handleToggle = () => {
    todoToggle(todo.id);
  };

  // toggle the value of editable
  const handleEditable = () => {
    !editable ? setEditable(true) : setEditable(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(todoEditRef);
    console.log(todoEditRef.current.value);
    // todoEditRef can't be used directly, need todoEditRef.current.value to make it a string
    editTodo(todo.id, todoEditRef.current.value);
    // turn editable back to false after save todo item
    handleEditable();
  };

  // always return html, so we need div here, otherwise it causes render error
  return (
    <div>
      {editable ? (
        <div>
          <form onSubmit={handleSubmit}>
            {/* make defaultValue={todo.name} instead of value={todo.name}, 
                    in that case, todo.name is editable inside input tag */}
            <div>
              <input
                type='text'
                defaultValue={todo.name}
                ref={todoEditRef}
                autoFocus
              />
            </div>
            <div>
              <button type='submit'>Save</button>
              <button onClick={handleEditable} type='button'>
                Back
              </button>
            </div>
          </form>
        </div>
      ) : (
        <label className='todoItem'>
          <div>
            <input
              type='checkbox'
              checked={todo.isComplete}
              onChange={handleToggle}
            />
            <span className={todo.isComplete ? 'completed' : 'notCompleted'}>
              {todo.name}
            </span>
          </div>
          <button onClick={handleEditable} className='editBtn'>
            Edit
          </button>
        </label>
      )}
    </div>
  );
}

// inside label in line 42 (March 1st, 2022)
// nest the <input> directly inside the <label>, in which case the for and id attributes are not needed
// because the association is implicit.
// now the checkbox will be check even if you only click the to do items
