import './App.css';
import {useState} from "react";
import TodoList from "./components/todoList";
import InputField from "./components/inputField";
import {useDispatch} from "react-redux";
import {addTodo} from "./store/todoSlice";


function App() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const addTask = () => {
    dispatch(addTodo({text}))
    setText('');
  }

  return (
    <div className="App">
      <InputField
        handleSubmit={addTask}
        handleInput={setText}
        text={text}
      />

      <TodoList />
    </div>
  );
}

export default App;
