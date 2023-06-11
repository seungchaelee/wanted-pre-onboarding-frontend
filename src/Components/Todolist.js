import React, { useRef, useState } from "react";
import styled from "styled-components";

export default function TodoList({ todos }) {
  const [todo, setTodo] = useState(todos);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState(false);
  const [isbutton, setIsButton] = useState(true);
  const [isDone, setIsDone] = useState(todos.isCompleted);
  const editedText = useRef(null);

  function openEdit() {
    setMode(!mode);
  }

  function cancelEdit() {
    setMode(!mode);
    setIsButton(false);
  }

  const toggleDone = async () => {
    const res = await fetch(`http://localhost:3001/todos/${todo.id}`, {
      method: "PUT",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        ...todos,
        isCompleted: !isDone,
      }),
    });

    if (res.ok) {
      setIsDone(!isDone);
    }
    const data = await res.json();

    return data;
  };

  async function changeEdit() {
    const text = editedText.current.value;
    console.log(text);
    const res = await fetch(`http://localhost:3001/todos/${todo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
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
      if (window.confirm("삭제 ?")) {
        const res = await fetch(`http://localhost:3001/todos/${todo.id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          setTodo({
            ...todo,
            id: 0,
          });
          setIsLoading(false);
          alert("삭제 완료");
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
          <li className={isDone ? "off" : ""}>
            <label>
              <input type="checkbox" checked={isDone} onChange={toggleDone} />
              <span>{todos.todo}</span>
              <button
                type="submit"
                data-testid="modify-button"
                onClick={openEdit}
                disabled={!isbutton}
              >
                수정
              </button>
              <button type="submit" data-testid="delete-button" onClick={del}>
                삭제
              </button>
            </label>
          </li>
        </LabelWrapper>
      ) : (
        <LabelWrapper>
          <form>
            <li>
              <input
                data-testid="modify-input"
                ref={editedText}
                placeholder="변경 내용"
              />
              <button
                type="submit"
                data-testid="submit-button"
                onClick={changeEdit}
              >
                수정하기
              </button>
              <button
                type="submit"
                datta-testid="cancel-button"
                onClick={cancelEdit}
              >
                취소
              </button>
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
