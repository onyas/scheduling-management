// src/App.js
import React, { useState } from 'react';

import UserForm from '../components/UserForm';
import UserList from '../components/UserList';
import {
  addData,
  deleteById,
  fetchData,
  openDB,
} from '../utils/indexedDB';

function UsersPage() {
  const dbName = 'userDB';
  const storeName = 'users';

  const [users, setUsers] = useState([]);

  const handleAddUser = async (user) => {
    const db = await openDB(dbName,storeName);
    await addData(db,storeName, user);
    setUsers(await fetchData(db, storeName));
  };

  const handleDeleteUser = async (userId) => {
    const db = await openDB(dbName,storeName);
    await deleteById(db,storeName, userId);
    setUsers(await fetchData(db, storeName));
  };

  React.useEffect(() => {
    async function fetchRemote() {
        const db = await openDB(dbName, storeName);
        setUsers(await fetchData(db, storeName));
    }
    fetchRemote();
  }, []);

  return (
    <div className="App">
      <UserForm onAddUser={handleAddUser} />
      <UserList users={users} deleteUser={handleDeleteUser} />
    </div>
  );
}

export default UsersPage;