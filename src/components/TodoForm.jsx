import React, { useState, useContext, useEffect } from "react";
import Axios from 'axios';
import uuidv4 from 'uuid/v4';
import TodosContext from "../context";

export default function TodoForm() {
  const {
    state: { currentTodo = {} },
    dispatch
  } = useContext(TodosContext);
  const [todo, setTodo] = useState("");

  useEffect(() => {
    if (currentTodo.text) {
      setTodo(currentTodo.text);
    } else {
      setTodo("");
    }
  }, [currentTodo.id]);

  const handleSubmit = async event => {
    // TODO: check for empty or repeated text before calling actions
    event.preventDefault();
    if (currentTodo.text) {
      const response = await Axios.patch(`https://todos-api.alangenfeld.now.sh/todos/${currentTodo.id}`, {
        text: todo
      });
      dispatch({ type: "UPDATE_TODO", payload: response.data });
    } else {
     const response = await Axios.post("https://todos-api.alangenfeld.now.sh/todos", {
        id: uuidv4(),
        text: todo,
        complete: false
      })
      dispatch({ type: "ADD_TODO", payload: response.data });
    }
    setTodo("");
  };
  return (
    <form className="flex justify-center p-5" onSubmit={handleSubmit}>
      <input
        type="text"
        className="border-black border-solid border-2"
        onChange={e => setTodo(e.target.value)}
        value={todo}
      />
    </form>
  );
}
