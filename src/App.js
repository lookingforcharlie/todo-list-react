import './App.css';
import React from 'react'; 
import TodoList from './TodoList';
import { useState, useRef, useEffect } from 'react'; 
import Time from './Time';

const LOCAL_STORAGE_KEY = 'saveTodoItems';

function App() {
  const [todos, setTodos] = useState([]); 
  const todoNameRef = useRef();

  // Only call this method once when the page loads
  // This useEffect for getting stored item must run first compared to localStorage.setItem
  // [] as the condition means call the function only once
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)); 
    if (storedItems) setTodos(storedItems);
  }, []); 

  // Everytime todos array changes, it will trigger useEffect to store todos in local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos]); 

  // e.target.value doesn't work here because e is passed in function of click button
  const handleAddTodo = () => {
    const name = todoNameRef.current.value; 
    const tempTodos = [...todos]; 
    if (name.trim() === '') return 
    const readyForSet = [...tempTodos, {id: Date.now(), name: name, isComplete: false}]
    setTodos(readyForSet); 
    todoNameRef.current.value = null; 
    document.querySelector('.todoKeyword').focus(); 
  }

  // function to edit todo item. Using find() return reference behavior 
  const editTodo = (id, value) => {
    const tempTodos = [...todos]; 
    const existTodo = tempTodos.find((todo) => todo.id === id);
    existTodo.name = value;
    setTodos(tempTodos);
  }


  const todoToggle = (id) => {
    const tempTodos = [...todos]; 
    // can't use filter here, 
    // cos filer() here will return an array of object as [Object { id: 11, name: "michael", complete: false }]
    // find() will return an object as { id: 11, name: "michael", complete: false }
    // you can't do array.complete 
    // object.complete is legit 
    // find() returns a copy if it's a primitive, returns a reference if it's a complex type
    // this is normal JavaScript behaviour.
    const existTodo = tempTodos.find((todo) => todo.id === id);
    // console.log(existTodo);
    existTodo.isComplete = !existTodo.isComplete; 
    setTodos(tempTodos);
  }

  const handleClear = () => {
    const tempTodos = [...todos]; 
    setTodos(tempTodos.filter(todo => todo.isComplete !== true));
  }
  
  return (
    <div>
      <h2>Charlie's Todo List</h2>
      <Time />
      <input type="text" ref={todoNameRef} className="todoKeyword" autoFocus></input>
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClear}>Clear Completed</button>
      <hr></hr>
      <TodoList todos={todos} todoToggle={todoToggle} editTodo={editTodo}/> 
      <p>{todos.filter(todo => !todo.isComplete).length} Todo(s) Left</p>
    </div>
  );
}

export default App;
