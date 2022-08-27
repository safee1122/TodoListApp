import React, { useEffect } from "react";
import ListHeading from "./ListHeading";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AddTodoList } from "../slices/todoSlice";
import dayjs from "dayjs";

function ListTab({ id }) {
  const todos = useSelector((state) => state.app.todos);
  const listTodo = todos.find((todo) => todo._id === id);
  const listItem = listTodo.todoList;
  const [update, setUpdate] = useState({
    _id: "",
    status: false,
  });
  const [todo, setTodo] = useState("");
  const [value, setValue] = useState(null);

  const dispatch = useDispatch();

  const handleAddClick = () => {
    console.log(value);
    dispatch(
      AddTodoList({
        id,
        todoList: {
          name: todo,
          date: dayjs(value).format("DD-MM-YYYY"),
          status: false,
        },
      })
    );
    setTodo("");
  };
  const handleUpdateClick = () => {
    setTodo("");
    setUpdate({ _id: "", status: false });
  };
  const deleteHandler = (_id) => {};
  const handleEdit = (_id, text) => {
    if (!update.status) {
      setUpdate({ _id, status: true });
      setTodo(text);
    }
    if (update.status) {
      setUpdate({ _id: "", status: false });
      setTodo("");
    }
  };
  const handleStatusChange = (listItemStatus) => {
    console.log(listItemStatus);
  };
  return (
    <>
      <div className="flex p-5">
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          value={todo}
          required
          size="medium"
          onChange={(e) => {
            setTodo(e.target.value);
          }}
        />
        {update.status === false && (
          <div className="px-1">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Enter Date"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                InputProps={{ readOnly: true }}
                renderInput={(params) => <TextField {...params} />}
                inputFormat={"DD-MM-YYYY"}
              />
            </LocalizationProvider>
          </div>
        )}
        <div className="ml-3">
          <Button
            variant="contained"
            onClick={update.status ? handleUpdateClick : handleAddClick}
            size="large"
          >
            {update.status ? "Update" : "Add"}
          </Button>
        </div>
      </div>
      <div className="flex flex-col justify-between content-center w-full ">
        <div className=" flex justify-between content-center h-8 bg-gray-300 px-5 text-white">
          <p>Status</p>
          <p>Name</p>
          <p>Date</p>
          <p>update</p>
          <p>Delete</p>
        </div>
        {listItem.map((listItem, index) => (
          <ListHeading
            key={index}
            title={listItem.name}
            onUpdate={() => handleEdit(listItem._id, listItem.title)}
            onDelete={() => deleteHandler(listItem._id)}
            onStatusChange={() => handleStatusChange(listItem.id)}
            defaultStatus={listItem.status}
            Date={listItem.date}
          />
        ))}
      </div>
    </>
  );
}

export default ListTab;
