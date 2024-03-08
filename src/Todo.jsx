import { useState } from "react";
import { v4 as uuid } from "uuid";
import "./Todo.css";
import "bootstrap/dist/css/bootstrap.css";

export default function TodoList() {
  let [todo, setTodo] = useState([
    { task: "Eat", id: uuid(), isDone: false, edit: false },
    { task: "Code", id: uuid(), isDone: false, edit: false },
    { task: "Chai", id: uuid(), isDone: false, edit: false },
    { task: "Sleep", id: uuid(), isDone: false, edit: false },
  ]);
  let [newTodo, setNewTodo] = useState("");
  let [editTask, setEditTask] = useState("");

  let addNewTask = () => {
    setTodo((prevTodos) => [
      ...prevTodos,
      { task: newTodo, id: uuid(), isDone: false, edit: false },
    ]);
    setNewTodo("");
  };

  function updateTodoValue(event) {
    setNewTodo(event.target.value);
  }

  function deleteTodo(id) {
    setTodo((prevTodo) => prevTodo.filter((prevTodo) => prevTodo.id != id));
  }

  function updateToUpperCase() {
    setTodo((prevTodo) => {
      return prevTodo.map((el) => {
        return {
          ...el,
          task: el.task.toUpperCase(),
        };
      });
    });
  }

  function updateToUpperCaseOne(id) {
    setTodo((prevTodo) => {
      return prevTodo.map((el) => {
        if (el.id === id) {
          return { ...el, task: el.task.toUpperCase() };
        } else {
          return el;
        }
      });
    });
  }

  function updateTodoListTask(id) {
    setTodo((prevTodo) => {
      return todo.map((ele) => {
        if (ele.id === id) {
          return {
            ...ele,
            edit: true,
          };
        } else {
          return {
            ...ele,
          };
        }
      });
    });
  }

  function deleteAllTodoTask() {
    setTodo([]);
  }

  function markAsDone(id) {
    setTodo((prevTodo) => {
      return prevTodo.map((ele) => {
        if (ele.id === id) {
          return {
            ...ele,
            isDone: true,
          };
        } else {
          return {
            ...ele,
          };
        }
      });
    });
  }

  function markAsDoneAll() {
    setTodo(
      todo.map((ele) => {
        return { ...ele, isDone: true };
      })
    );
  }

  function editTodoList(event) {
    setEditTask(event.target.value);
  }

  function editTodoListTask(id) {
    setTodo(
      todo.map((ele) => {
        if (ele.id === id) {
          return {
            ...ele,
            task: editTask,
            edit: false,
          };
        } else {
          return {
            ...ele,
          };
        }
      })
    );
    setEditTask("");
  }

  return (
    <div className="mainContainer">
      <div className="container mt-3 mb-3">
        <input
          className="form-control mt-3"
          type="text"
          placeholder="Add a task"
          value={newTodo}
          onChange={updateTodoValue}
        />
        &nbsp;
        <br></br>
        <button className="btn btn-primary" onClick={addNewTask}>
          Add a Task
        </button>
        <hr />
        <h3 className="Heading">Task Todo</h3>
        <hr />
        <ul>
          {todo.map((ele) => (
            <li key={ele.id}>
              <span
                className="Text"
                style={
                  ele.isDone ? { textDecorationLine: "line-through" } : {}
                }>
                {ele.edit ? (
                  <input
                    className="form-control mb-3"
                    type="text"
                    value={editTask}
                    onChange={editTodoList}
                  />
                ) : (
                  ele.task
                )}
              </span>
              &nbsp;&nbsp;&nbsp;
              {ele.edit ? (
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => editTodoListTask(ele.id)}>
                  Edit
                </button>
              ) : (
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => updateTodoListTask(ele.id)}>
                  Edit
                </button>
              )}
              &nbsp;&nbsp;
              <button
                className="btn btn-warning btn-sm"
                onClick={() => updateToUpperCaseOne(ele.id)}>
                UpperCase
              </button>
              &nbsp;&nbsp;
              <button
                className="btn btn-info btn-sm"
                onClick={() => markAsDone(ele.id)}>
                Mark as Done
              </button>
              &nbsp;&nbsp;
              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteTodo(ele.id)}>
                Delete
              </button>
              <hr />
            </li>
          ))}
        </ul>
        <button className="btn btn-warning mb-3" onClick={updateToUpperCase}>
          UpperCase All
        </button>
        &nbsp;&nbsp;&nbsp;
        <button className="btn btn-info mb-3" onClick={markAsDoneAll}>
          Mark as Done ALL
        </button>
        &nbsp;&nbsp;&nbsp;
        <button className="btn btn-danger mb-3" onClick={deleteAllTodoTask}>
          Delete All Task
        </button>
      </div>
    </div>
  );
}
