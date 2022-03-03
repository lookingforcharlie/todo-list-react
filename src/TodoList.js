import React from 'react'; 
import Todo from './Todo'


export default function TodoList({ todos, todoToggle, editTodo }) {
  return (
    <div>
        {todos.map(todo => <Todo key={todo.id} todo={todo} todoToggle={todoToggle} editTodo={editTodo}/>)}
    </div>  
  )
}