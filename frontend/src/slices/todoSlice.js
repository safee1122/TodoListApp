import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const AddTodo = createAsyncThunk(
  "todo/AddTodo",
  async (todo, { rejectWithValue }) => {
    console.log(todo);
    try {
      const response = await axios.post("http://localhost:9000/todo/addtodo", {
        title: todo,
        todoList: [],
      });
      const { data } = response;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(AddTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(AddTodo.rejected, (state, action) => {
        state.message = action.payload;
      });
  },
});
// Extract the action creators object and the reducer
const { actions, reducer } = todoSlice;
// Extract and export each action creator by name

// Export the reducer, either as a default or named export
export default reducer;
