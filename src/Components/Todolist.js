import React, { useRef, useState } from "react";
import styled from "styled-components";

export default function TodoList({ todos }) {
  const [todo, setTodo] = useState(todos);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState(false);
  const editedText = useRef(null);

  function openEdit() {
    setMode(!mode);
  }

  async function changeEdit() {
    const text = editedText.current.value;
    console.log(text)
    const res = await fetch(`http://localhost:3001/todos/${todo.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        todo: text,
      }),
    });
    setMode(!mode);

    const data = await res.json();

    return data;
  }

  async function del() {
    if (!isLoading) {
      setIsLoading(true);
      if (window.confirm('삭제 ?')) {
        const res = await fetch(`http://localhost:3001/todos/${todo.id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          setTodo({
            ...todo,
            id: 0,
          });
          setIsLoading(false);
          alert('삭제 완료');
        }
        const data = await res.json();

        return data;
      }
    }
  }

  if (todo.id === 0) {
    return null;
  }

  return (
    <>
      {!mode ? (
        <LabelWrapper>
          <li>
            <label>
              <input type="checkbox" />
              <span>{todos.todo}</span>
              <button
                type="submit"
                data-testid="modify-button"
                onClick={openEdit}
              >수정</button>
              <button
                type="submit"
                data-testid="delete-button"
                onClick={del}
              >삭제</button>
            </label>
          </li>
        </LabelWrapper>
      ) : (
        <LabelWrapper>
          <form>
            <li>
              <input
                data-testid="change-todo-input"
                ref={editedText}
                placeholder="변경 내용"
              />
              <button
                type="submit"
                data-testid="modify-button"
                onClick={changeEdit}
              >변경</button>
              <button
                type="submit"
                datta-testid="cancel-button"
                onClick={openEdit}
              >취소</button>
            </li>
          </form>

        </LabelWrapper>
      )}
    </>
  );
}

const LabelWrapper = styled.label`
  position: relative;
  margin: 10px 30px;
`;
