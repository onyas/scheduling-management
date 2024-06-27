// src/utils/indexedDB.js
const dbName = 'userDB';
const storeName = 'users';

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
      }
    };

    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = (event) => reject(event.target.error);
  });
};

const addUser = (db, user) => {
  const transaction = db.transaction([storeName], 'readwrite');
  const store = transaction.objectStore(storeName);
  const request = store.add(user);

  request.onsuccess = () => console.log('User added successfully');
  request.onerror = () => console.error('Failed to add user');
};

const fetchUsers = (db) => {
  const transaction = db.transaction([storeName], 'readonly');
  const store = transaction.objectStore(storeName);
  const request = store.getAll();

  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      resolve(request.result);
    };
    request.onerror = () => {
      reject(request.error);
    };
  });
};

const deleteUser = (db, userId) => {
  const transaction = db.transaction([storeName], 'readwrite');
  const store = transaction.objectStore(storeName);
  const request = store.delete(userId);

  request.onsuccess = () => console.log('User deleted successfully');
  request.onerror = () => console.error('Failed to delete user');
};

export { addUser, deleteUser, fetchUsers, openDB };