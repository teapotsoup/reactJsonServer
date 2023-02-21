import axios from "axios";

const getData = async () => {
  return axios.get("http://localhost:4000/todos");
};

const postData = async (todo) => {
  await axios.post("http://localhost:4000/todos", {
    todo: todo,
  });
  return getData();
};

const updateData = async (id, todo) => {
  await axios.put(`http://localhost:4000/todos/${id}`, {
    id: id,
    todo: todo,
  });
  return getData();
};

const deleteData = async (id) => {
  await axios.delete(`http://localhost:4000/todos/${id}`);
  return getData();
};

export { getData, postData, deleteData, updateData };
