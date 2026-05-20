import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);

  const API_URL = "http://44.212.221.147:3000/users";

  // Fetch users
  const fetchUsers = async () => {
    const response = await axios.get(API_URL);
    setUsers(response.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Add user
  const addUser = async () => {
    if (!name) return;

    const response = await axios.post(API_URL, {
      name: name,
    });

    setUsers([...users, response.data]);
    setName("");
  };

  // Delete user
  const deleteUser = async (id) => {
    await axios.delete(`${API_URL}/${id}`);

    setUsers(users.filter((user) => user.id !== id));
  };

  // Edit user
  const editUser = (user) => {
    setName(user.name);
    setEditingId(user.id);
  };

  // Update user
  const updateUser = async () => {
    const response = await axios.put(
      `${API_URL}/${editingId}`,
      {
        name: name,
      }
    );

    setUsers(
      users.map((user) =>
        user.id === editingId ? response.data : user
      )
    );

    setName("");
    setEditingId(null);
  };

  return (
    <div>
      <Navbar title="Details"/>
  
      <div style={{ padding: "20px" }}>
        <h1>React CRUD App</h1>
  
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
  
        {editingId ? (
          <button onClick={updateUser}>Update</button>
        ) : (
          <button onClick={addUser}>Add</button>
        )}
  
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name}
  
              <button
                className="edit"
                onClick={() => editUser(user)}
              >
                Edit
              </button>
  
              <button
                className="delete"
                onClick={() => deleteUser(user.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;