/*
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";

function Todolist() {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() !== "") {
      if (editingId !== null) {
        const updatedTodos = todos.map((todo) =>
          todo.id === editingId ? { ...todo, text: value } : todo
        );
        setTodos(updatedTodos);
        setEditingId(null);
      } else {
       const isDuplicate = todos.some((todo) => todo.text === value);
      if (!isDuplicate) {
        setTodos([...todos, { text: value, id: Date.now() }]);
      }
    }
      setValue("");
    }
  };
 */
  import React, { useState } from "react";
  import { FaEdit } from "react-icons/fa";
  import { RiDeleteBin5Fill } from "react-icons/ri";
  
  function Todolist() {
    const [value, setValue] = useState("");
    const [todos, setTodos] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState(null);
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (value.trim() !== "") {
        const lowercaseValue = value.toLowerCase();
        const isDuplicate = todos.some((todo) => todo.text.toLowerCase() === lowercaseValue);
  
        if (!isDuplicate) {
          if (editingId !== null) {
            const updatedTodos = todos.map((todo) =>
              todo.id === editingId ? { ...todo, text: value } : todo
            );
            setTodos(updatedTodos);
            setEditingId(null);
          } else {
            setTodos([...todos, { text: value, id: Date.now() }]);
          }
          setValue("");
          setError(null);
        } else {
          setError("Already exists!");
        }
      }
    };
  
  const handleInputChange = (e) => {
    const value = e.target.value;
    setValue(value);
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleEdit = (id) => {
    setEditingId(id);
    const todoToEdit = todos.find((todo) => todo.id === id);
    setValue(todoToEdit.text);
  };

  return (
    <div className="container">
      <div className="todolist">
          <h2>TODO-LIST</h2>
          <form className="todoform" onSubmit={handleSubmit}>
            <div className="field-items">
              <input
                type="text"
                placeholder="Enter a Todo.."
                value={value}
                onChange={handleInputChange}
              />
              <button type="submit">{editingId !== null ? "Update" : "Add"}</button>
            </div>
            {error && <div style={{ color: "red" ,fontSize: "18px"}}>{error}</div>}
          </form>
          <div className="list-items">
            {todos.map((todo) => (
              <li className="lists" key={todo.id}>
                {editingId === todo.id ? (
                  <input
                    type="text"
                    value={value}
                  />
                ) : (
                  <span>{todo.text}</span>
                )}
                <div className="field-icons">
                <FaEdit size={25} color="#11cf79ed" onClick={() => handleEdit(todo.id)}></FaEdit>
                <RiDeleteBin5Fill  size={25} color="#86b7fe" onClick={() => handleDelete(todo.id)}></RiDeleteBin5Fill>
                </div>
              </li>
            ))}
        </div>
      </div>
      </div>
  );
}

export default Todolist;

