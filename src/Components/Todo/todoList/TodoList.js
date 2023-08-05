import React from 'react';
import TodoItem from '../todoItem/TodoItem';
import styles from './TodoList.module.css';

function TodoList({ todos, updateData, deleteData, onToggle }) {
  return (
    <li className={styles.TodoList}>
      {todos.map((data, i) => (
        <TodoItem
          key={data.id}
          idx={i}
          todos={data}
          updateData={updateData}
          deleteData={deleteData}
          onToggle={onToggle}
        />
      ))}
    </li>
  );
}

export default TodoList;
