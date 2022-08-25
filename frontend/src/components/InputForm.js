import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { AddTodo } from "../slices/todoSlice";
import { useDispatch } from "react-redux";

function InputForm(props) {
  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(AddTodo(todo));
    setTodo("");
  };
  return (
    <div className="flex p-5">
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        value={todo}
        required
        size="small"
        onChange={(e) => {
          setTodo(e.target.value);
        }}
      />
      <div className="ml-3">
        <Button variant="contained" onClick={handleClick}>
          Add
        </Button>
      </div>
    </div>
  );
}

export default InputForm;
