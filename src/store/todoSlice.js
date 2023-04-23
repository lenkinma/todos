import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const deleteTodo = createAsyncThunk(
	'todos.deleteTodos',
	async function (id, {rejectWithValue, dispatch}) {
		try {
			const responce = await fetch('https://jsonplaceholder.typicode.com/todos/${id}', {
				method: 'DELETE',
			})
			if (!responce.ok){
				throw new Error('Can\'t delete task. Server error.');
			}

			dispatch(removeTodo({id}));

		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const fetchTodos = createAsyncThunk(
	'todos/fetchTodos',
	async function(_, {rejectWithValue}){
		try {
			const responce = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
			if (!responce.ok){
				throw new Error('Server Error!');
			}
			const data = await responce.json();

			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}


	}
);

export const toggleStatus = createAsyncThunk(
	'todos.toggleStatus',
	async function (id, {rejectWithValue, dispatch, getState}) {
		const todo = getState().todos.todos.find(todo => todo.id === id)

		try {
			const responce = await fetch('https://jsonplaceholder.typicode.com/todos/${id}', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					completed: !todo.completed,
				})
			})
			if (!responce.ok){
				throw new Error('Can\'t toggle status. Server error.');
			}

			dispatch(toggleTodoComplete({id}));

		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const addNewTodo = createAsyncThunk(
	'todos.addNewTodo',
	async function (title, {rejectWithValue, dispatch}) {

		try {
			const todo = {
				title: title,
				userId: 1,
				completed: false,
			};

			const responce = await fetch('https://jsonplaceholder.typicode.com/todos/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(todo)
			})
			if (!responce.ok){
				throw new Error('Can\'t add task. Server error.');
			}

			const data = await responce.json();
			dispatch(addTodo({title}))

		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);



const setError = (state, action) => {
	state.status = 'rejected';
	state.error = action.payload;
};



const todoSlice = createSlice({
	name: 'todos',
	initialState: {
		todos: [],
		status: null,
		error: null,
	},
	reducers: {
		addTodo(state, action) {
			state.todos.push({
				id: new Date().toISOString(),
				title: action.payload.title,
				completed: false,
			})
		},
		removeTodo(state, action) {
			state.todos = state.todos.filter(todo => todo.id !== action.payload.id)
		},
		toggleTodoComplete(state, action){
			const toggledTodo = state.todos.find(todo => todo.id === action.payload.id);
			toggledTodo.completed = !toggledTodo.completed;
		},
	},
	extraReducers: {
		[fetchTodos.pending]: (state, action) => {
			state.status = 'loading';
			state.error = null;
		},
		[fetchTodos.fulfilled]: (state, action) => {
			state.status = 'resolved';
			state.todos = action.payload;
		},
		[fetchTodos.rejected]: setError,
		[deleteTodo.rejected]: setError,
		[toggleStatus.rejected]: setError,
	}
});

const {addTodo, removeTodo, toggleTodoComplete} = todoSlice.actions;

export default todoSlice.reducer;