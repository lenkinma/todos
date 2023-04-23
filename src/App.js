import './App.css';
import {useEffect, useState} from "react";
import TodoList from "./components/todoList";
import InputField from "./components/inputField";
import {useDispatch, useSelector} from "react-redux";
import {addNewTodo, fetchTodos} from "./store/todoSlice";


function App() {
  const [text, setText] = useState('');
  const {status, error} = useSelector(state => state.todos);
  const dispatch = useDispatch();

  const addTask = () => {
    dispatch(addNewTodo(text))
    setText('');
  }

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div className="App">
      <InputField
        handleSubmit={addTask}
        handleInput={setText}
        text={text}
      />

      {status === 'loading' && <h2>Loading...</h2>}
      {error && <h2>An error occured: {error}</h2>}

      <TodoList />
    </div>
  );
}

export default App;
