import React from "react";
import ListHeading from "./ListHeading";
import { useSelector } from "react-redux";
function TodoTab() {
  const todos = useSelector((state) => state.app.todos);
  console.log(todos);
  return (
    <div className="flex flex-col justify-between content-center w-1/2 ml-5">
      <div className=" flex justify-between content-center h-8 bg-gray-300 px-5 text-white">
        <p>Name</p>
        <p>Update</p>
        <p>Delete</p>
      </div>
      {todos.map((todo, index) => (
        <ListHeading key={index} title={todo.title} />
      ))}
    </div>
  );
}

export default TodoTab;
