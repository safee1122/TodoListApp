import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function ListHeading({ title }) {
  return (
    <div className="flex justify-between h-10 w-auto bg-neutral-400 px-5">
      <input className=" text-white" type="button" value={title} />
      <IconButton aria-label="edit" size="large">
        <EditIcon />
      </IconButton>
      <IconButton aria-label="delete" size="large">
        <DeleteIcon />
      </IconButton>
    </div>
  );
}

export default ListHeading;
