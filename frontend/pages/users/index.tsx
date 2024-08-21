import React, { useEffect, useState } from 'react';

const UsersPage = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // State for creating a new user
  const [newUser, setNewUser] = useState({ name: '', email: '' });

  // State for editing an existing user
  const [editingUser, setEditingUser] = useState<{ _id: string; name: string; email: string } | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/users');
        const data = await res.json();

        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          throw new Error("Data is not an array");
        }
      } catch (err) {
        setError("Failed to load users");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Create a new user
  const handleCreateUser = async () => {
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (res.ok) {
        const createdUser = await res.json();
        setUsers((prev) => [...prev, createdUser]);
        setNewUser({ name: '', email: '' }); // Reset form
      } else {
        throw new Error("Failed to create user");
      }
    } catch (err) {
      setError("Failed to create user");
      console.error(err);
    }
  };

  // Update an existing user
  const handleUpdateUser = async () => {
    if (!editingUser) return;

    try {
      const res = await fetch(`/api/users/${editingUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingUser),
      });

      if (res.ok) {
        const updatedUser = await res.json();
        setUsers((prev) =>
          prev.map((user) => (user._id === updatedUser._id ? updatedUser : user))
        );
        setEditingUser(null); // Reset form
      } else {
        throw new Error("Failed to update user");
      }
    } catch (err) {
      setError("Failed to update user");
      console.error(err);
    }
  };

  // Delete a user
  const handleDeleteUser = async (userId: string) => {
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== userId));
      } else {
        throw new Error("Failed to delete user");
      }
    } catch (err) {
      setError("Failed to delete user");
      console.error(err);
    }
  };

  return (
    <div>
      <h1>User Management</h1>

      {loading && <p>Loading users...</p>}
      {error && <p>{error}</p>}

      {/* Create User Form */}
      <div>
        <h2>Create User</h2>
        <input
          type="text"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          placeholder="Name"
        />
        <input
          type="email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          placeholder="Email"
        />
        <button onClick={handleCreateUser}>Add User</button>
      </div>

      {/* Edit User Form */}
      {editingUser && (
        <div>
          <h2>Edit User</h2>
          <input
            type="text"
            value={editingUser.name}
            onChange={(e) =>
              setEditingUser({ ...editingUser, name: e.target.value })
            }
            placeholder="Name"
          />
          <input
            type="email"
            value={editingUser.email}
            onChange={(e) =>
              setEditingUser({ ...editingUser, email: e.target.value })
            }
            placeholder="Email"
          />
          <button onClick={handleUpdateUser}>Update User</button>
          <button onClick={() => setEditingUser(null)}>Cancel</button>
        </div>
      )}

      {/* User List */}
      {!loading && !error && (
        <ul>
          {users.length > 0 ? (
            users.map((user) => (
              <li key={user._id}>
                {user.name} - {user.email}
                <button onClick={() => setEditingUser(user)}>Edit</button>
                <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
              </li>
            ))
          ) : (
            <p>No users available</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default UsersPage;
