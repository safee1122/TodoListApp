import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const AddTodoList = createAsyncThunk(
  "todo/AddTodoList",
  async (todo, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:9000/todoList/addTodoList",
        {
          todo,
        }
      );
      return todo;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const GetTodo = createAsyncThunk(
  "todo/GetTodo",
  async (todo, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:9000/todo/getTodos");

      const { data } = response;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const UpdateTodoList = createAsyncThunk(
  "todo/UpdateTodo",
  async (todo, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:9000/todoList/updatetodoList",
        {
          todo,
        }
      );

      const { data } = response;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const DeleteTodoList = createAsyncThunk(
  "todo/DeleteTodoList",
  async (_id, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:9000/todoList/deleteTodoList",
        {
          _id,
        }
      );
      const { data } = response;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const todoSlice = createSlice({
  name: "todoList",
  initialState: {
    todoList: [],
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(AddTodoList.fulfilled, (state, action) => {
        state.todoList.forEach((todo) => {
          if (todo._id === action.payload.todo._id) {
            todo.todoList.push(action.payload.todo.todoList);
          }
        });
      })
      .addCase(AddTodoList.rejected, (state, action) => {
        state.message = action.payload;
      })
      .addCase(UpdateTodoList.fulfilled, (state, action) => {
        state.todos.forEach((element) => {
          if (element._id === action.payload._id) {
            console.log(element._id);
            element.title = action.payload.title;
          } else {
            state.alert = "todo not found";
          }
        });
      })
      .addCase(UpdateTodo.rejected, (state, action) => {
        state.message = action.payload;
      })
      .addCase(GetTodo.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      .addCase(GetTodo.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(DeleteTodoList.fulfilled, (state, action) => {
        state.todos = state.todos.filter(
          (todo) => todo._id !== action.payload._id
        );
      });
  },
});
// Extract the action creators object and the reducer
const { actions, reducer } = todoSlice;
// Extract and export each action creator by name
export const { getTodos } = actions;
// Export the reducer, either as a default or named export
export default reducer;
