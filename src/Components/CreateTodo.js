import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateTodo() {
  const [isLoading, setIsLoading] = useState(false);
  const todoRef = useRef(null);
  const navigate = useNavigate();

  const CreateTodo = async () => {
    if (!isLoading && todoRef.current) {
      setIsLoading(true);

      const todo = todoRef.current.value;

      const res = await fetch(`http://localhost:3001/todos/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          todo,
          isCompleted: false,
        }),
      });

      if (res.ok) {
        alert(`${todo} 생성`);
        setIsLoading(false);
        navigate(`/todo`);
      }
      const data = await res.json();

      return data;
    }
  };

  return (
    <form onSubmit={CreateTodo}>
      <input data-testid="new-todo-input" ref={todoRef} placeholder="할 일" />
      <button type="submit" data-testid="new-todo-add-button">
        추가
      </button>
    </form>
  );
}
