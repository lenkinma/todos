import TodoItem from "./todoItem";

const TodoList = ({todos, toggleTodoComplete, removeTodo}) => {
	return (
		<ul>
			{todos.map(todo =>
				<TodoItem
					key={todo.id}
					{...todo}
					toggleTodoComplete={toggleTodoComplete}
					removeTodo={removeTodo}
				/>)}
		</ul>
	);
}

export default TodoList;