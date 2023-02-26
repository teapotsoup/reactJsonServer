import { useEffect, useState } from "react";
import { deleteData, getData, postData, updateData } from "./appApi";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [edit, setEdit] = useState("");

  const handleChange = ({ target: { value } }) => setTodo(value);
  const handleEditChange = ({ target: { value } }) => setEdit(value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await postData(todo);
    setTodos(res.data);
    setTodo("");
  };
  const handleEditSubmit = async (event) => {
    event.preventDefault();
    const res = await updateData(event.target.name, edit);
    setTodos(res.data);
    setEdit("");
  };

  const deleteTodo = async (id) => {
    const res = await deleteData(id);
    setTodos(res.data);
  };

  useEffect(() => {
    (async () => {
      const res = await getData();
      setTodos(res.data);
    })();
  }, []);

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          Todo
          <input type="text" name="todo" onChange={handleChange} value={todo} />
        </label>
        <input type="submit" value="submit" />
      </form>
      <ul>
        {todos.map((todo) => (
          <div style={{ display: "flex" }} key={todo.id}>
            <li style={{ listStyle: "none" }}>{todo.todo}</li>
            <button onClick={() => deleteTodo(todo.id)}>X</button>
            {/* <button onClick={() => editTodo(todo.id)}>Edit</button> */}
            <form onSubmit={handleEditSubmit} name={todo.id}>
              <label>
                <input
                  type="text"
                  onChange={handleEditChange}
                  placeholder={todo.todo}
                />
              </label>
              <input type="submit" style={{ display: "none" }} />
            </form>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
