import React, { useState, useEffect } from 'react';
import { addTodo, deleteTodo, fetchTodos, toggleTodo } from './api/todoAPI';
import './App.css';

function App() {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
      async function loadTodos() {
          const data = await fetchTodos();
          setTodos(data);
      }

      loadTodos();
    }, []);

    async function handleAddTodo() {
        const newTodo = await addTodo(title);
        setTodos((prevTodos) => [...prevTodos, newTodo]);
        setTitle('');
    }

    async function handleToggleTodo(id) {
        const updatedItem = await toggleTodo(id);
        setTodos((prevTodos) => prevTodos.map(todo => todo.id === id ? updatedItem : todo));
    }

    async function handleDeleteTodo(id) {
        await deleteTodo(id);
        setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
    }

    return (
        <div class="todolist">
            <h1>Todo List</h1>
            <input value={title} onChange={e => setTitle(e.target.value)} />
            <button onClick={handleAddTodo}>Add</button>
            <ul>
                {todos && todos.length > 0 && todos.map(todo => (
                    <li key={todo.id}>
                        <span
                            style={{
                                textDecoration: todo.isCompleted ? 'line-through' : 'none'
                            }}
                        >
                            {todo.title}
                        </span>
                        <button onClick={() => handleToggleTodo(todo.id)}>Toggle</button>
                        <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;