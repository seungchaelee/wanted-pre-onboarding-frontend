import React from "react";
import styled from "styled-components";
import CreateTodo from "./CreateTodo";
import TodoList from "./Todolist";
import useFetch from "../hooks/useFetch";

export default function Todo() {
  const todos = useFetch(`http://localhost:3001/todos`);

  return (
    <>
      <Wrapper>
        <LabelWrapper>
          <CreateTodo />
        </LabelWrapper>
        {todos.map((todo, i) => (
          <TodoList todos={todo} key={todo.id} />
        ))}
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  margin: 20px auto;
  width: 250px;
`;

const LabelWrapper = styled.label`
  position: relative;
  margin: 10px 30px;
`;
