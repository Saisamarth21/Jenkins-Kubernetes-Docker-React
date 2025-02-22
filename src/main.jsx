import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

// Single file Todo App with inline styles
const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  // Add a new todo item
  const addTodo = () => {
    if (todo.trim() !== "") {
      setTodos([...todos, todo.trim()]);
      setTodo("");
    }
  };

  // Delete a todo item by its index
  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  // Allow adding todo with Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  // Inline CSS styles
  const styles = {
    container: {
      maxWidth: "500px",
      margin: "50px auto",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      fontFamily: "Arial, sans-serif"
    },
    input: {
      width: "80%",
      padding: "10px",
      fontSize: "16px"
    },
    button: {
      padding: "10px",
      marginLeft: "5px",
      fontSize: "16px"
    },
    todoItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 0",
      borderBottom: "1px solid #eee"
    },
    deleteButton: {
      background: "red",
      color: "white",
      border: "none",
      padding: "5px 10px",
      borderRadius: "4px",
      cursor: "pointer"
    }
  };

  return (
    <div style={styles.container}>
      <h1>Todo App</h1>
      <div>
        <input
          type="text"
          placeholder="Enter a todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          onKeyDown={handleKeyDown}
          style={styles.input}
        />
        <button onClick={addTodo} style={styles.button}>Add</button>
      </div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((item, index) => (
          <li key={index} style={styles.todoItem}>
            <span>{item}</span>
            <button onClick={() => deleteTodo(index)} style={styles.deleteButton}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Render the app in the root element
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
