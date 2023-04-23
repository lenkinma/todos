import {useDispatch} from "react-redux";
import {deleteTodo, toggleStatus} from "../store/todoSlice";


const TodoItem = ({id, title, completed}) => {
	const dispatch = useDispatch();

	return (
		<li className='todo_item'>
			<input className='checkbox'
				type={'checkbox'}
				checked={completed}
				onChange={() => dispatch(toggleStatus(id))}
			/>
			<div className='title'>{title}</div>
			<div
				className='delete'
				onClick={() => dispatch(deleteTodo(id))}>&times;</div>
		</li>
	);
}

export default TodoItem;