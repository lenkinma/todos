import TodoItem from "./todoItem";
import {useSelector} from "react-redux";


const TodoList = () => {
	const todos = useSelector(state => state.todos.todos);

	return (
		<div>
			<ul>
				{todos.map(todo =>
					<TodoItem
						key={todo.id}
						{...todo}
					/>)}
			</ul>
		</div>

	);
}

export default TodoList;