// src/App.js
import React, { useState } from 'react';

import UserForm from './components/UserForm';
import UserList from './components/UserList';
import {
  addUser,
  deleteUser,
  fetchUsers,
  openDB,
} from './utils/indexedDB';

function UsersPage() {
  const [users, setUsers] = useState([]);

  const handleAddUser = async (user) => {
    const db = await openDB();
    await addUser(db, user);
    setUsers(await fetchUsers(db));
  };

  const handleDeleteUser = async (userId) => {
    const db = await openDB();
    await deleteUser(db, userId);
    setUsers(await fetchUsers(db));
  };

  React.useEffect(() => {
    async function fetchData() {
        const db = await openDB();
        setUsers(await fetchUsers(db));
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <UserForm onAddUser={handleAddUser} />
      <UserList users={users} deleteUser={handleDeleteUser} />
    </div>
  );
}

export default UsersPage;