import React from "react";
import uuidv4 from "uuid/v4";

export default function reducer(state, action) {
  switch (action.type) {
    case "SET_CURRENT_TODO":
      return {
        ...state,
        currentTodo: action.payload
      };
    case "TOGGLE_TODO":
      const toggledTodos = state.todos.map(el =>
        el.id === action.payload.id
          ? { ...action.payload, complete: !action.payload.complete }
          : el
      );
      return {
        ...state,
        todos: toggledTodos
      };
    case "REMOVE_TODO":
      const filteredTodos = state.todos.filter(
        el => el.id !== action.payload.id
      );
      const isRemovedTodo =
        state.currentTodo.id === action.payload.id ? {} : state.currentTodo;

      return {
        ...state,
        currentTodo: isRemovedTodo,
        todos: filteredTodos
      };
    case "ADD_TODO":
      if (!action.payload) {
        return state;
      }

      if (state.todos.findIndex(el => el.text === action.payload) > -1) {
        return state;
      }
      const newTodo = {
        id: uuidv4(),
        text: action.payload,
        complete: false
      };

      const addedTodos = [...state.todos, newTodo];
      return {
        ...state,
        todos: addedTodos
      };

    case "UPDATE_TODO":
      if (!action.payload) {
        return state;
      }

      if (state.todos.findIndex(el => el.text === action.payload) > -1) {
        return state;
      }
      const updatedTodo = { ...state.currentTodo, text: action.payload };
      const updatedTodoIndex = state.todos.findIndex(
        t => t.id === state.currentTodo.id
      );

      const updatedTodos = [
        ...state.todos.slice(0, updatedTodoIndex),
        updatedTodo,
        ...state.todos.slice(updatedTodoIndex + 1)
      ];
      return {
        ...state,
        currentTodo: {},
        todos: updatedTodos
      };

    default:
      return state;
  }
}
