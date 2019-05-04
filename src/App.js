import React, { useContext, useReducer } from "react";
import { UserContext } from "./index";

const initialState = {
  count: 0
};

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return {
        count: state.count + 1
      };
    case "decrement":
      return {
        count: state.count - 1
      };
    case "reset":
    default:
      return initialState;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useContext(UserContext);
  return (
    <div className="container mx-auto shadow rounded">
      <p>Hello, {value}</p>
      <button
        className="border rounded bg-teal m-3 p-1"
        onClick={() => {
          dispatch({ type: "increment" });
        }}
      >
        Increment
      </button>
      <button
        className="border rounded bg-teal m-3 p-1"
        onClick={() => {
          dispatch({ type: "decrement" });
        }}
      >
        Decrement
      </button>
      <button
        className="border rounded bg-orange-light m-3 p-1"
        onClick={() => {
          dispatch({ type: "reset" });
        }}
      >
        Reset
      </button>
      <h2 className="text-bold ml-3">Count: {state.count}</h2>
    </div>
  );
}
