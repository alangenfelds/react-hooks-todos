import React, { useContext } from "react";
import TodosContext from "../context";

export default function TodoList() {
  const { state, dispatch } = useContext(TodosContext);
  const title =
    state.todos.length > 0 ? `${state.todos.length} Todos` : "Nothing To Do!";

  return (
    <div className="container mx-auto max-w-md text-center font-mono">
      <h1 className="test-bold">{title}</h1>
      <ul className="list-reset text-white p-0">
        {state.todos.map(el => (
          <li
            key={el.id}
            className="flex bg-orange-dark border-black border-dashed border-2 my-2 py-4 items-center"
          >
            <span
              className={`flex-1 ml-12 cursor-pointer ${el.complete &&
                "line-through text-grey-darkest"}`}
              onDoubleClick={() =>
                dispatch({ type: "TOGGLE_TODO", payload: el })
              }
            >
              {el.text}
            </span>
            <button
              onClick={() =>
                dispatch({ type: "SET_CURRENT_TODO", payload: el })
              }
            >
              <img
                src="https://icon.now.sh/edit/0050c5"
                alt="Edit icon"
                className="h-6"
              />
            </button>
            <button
              onClick={() => dispatch({ type: "REMOVE_TODO", payload: el })}
            >
              <img
                src="https://icon.now.sh/delete/8b0000"
                alt="Delete icon"
                className="h-6"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
