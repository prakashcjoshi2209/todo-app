import React, { useEffect, useRef, useState } from "react";
import todo_icon from "../assets/todo_icon.png";
import { Todoitems } from "./Todoitems";

export const Todo = () => {
  const [todoList, settodoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : ""
  );

  const inputRef = useRef();

  const add = () => {
    const inputText = inputRef.current.value.trim();

    if (inputText === "") {
      return null;
    }
    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };
    settodoList((data) => [...data, newTodo]);
    inputRef.current.value = "";
  };

  const deleteTodo = (id) => {
    settodoList((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id);
    });
  };


  const toggle = (id) => {
    settodoList((prevTodos) => {
      return prevTodos.map((data) => {
        if (data.id === id) {
          return {
            ...data,
            isComplete: !data.isComplete,
          };
        }
        return data;
      });
    });
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
    console.log(todoList);
  }, [todoList]);

  return (
    <div className="bg-white place-self-center w-11/12 max-w-md  flex flex-col p-7 min-h-[550px] rounded-xl ">
      {/* title */}
      <div className="flex items-center mt-7 gap-2">
        <img className="w-8" src={todo_icon} alt="" />
        <h1 className="text-3xl font-semibold">To-Do List</h1>
      </div>

      {/* inputBox */}
      <div className="flex items-center my-7 bg-gray-200 rounded-full">
        <input
          ref={inputRef}
          type="text"
          placeholder="Add your task"
          className="bg-transparent bottom-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
        />
        <button
          onClick={add}
          className="border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer"
        >
          ADD +
        </button>
      </div>
      {/* todo list */}
      <div>
        {todoList.map((data, index) => (
          <div key={index}>
            <Todoitems
              id={data.id}
              text={data.text}
              isComplete={data.isComplete}
              deleteTodo={deleteTodo}
            
            />
          </div>
        ))}
      </div>
    </div>
  );
};
