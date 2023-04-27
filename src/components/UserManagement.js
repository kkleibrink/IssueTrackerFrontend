import React, { useState, useEffect } from 'react';
import { getAllUsers, updateUserRole } from './api';

const UserManagement = ({ token }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getAllUsers(token);
      setUsers(fetchedUsers);
    };
    fetchUsers();
  }, [token]);

  const handleRoleChange = async (userId, newRole) => {
    await updateUserRole(userId, newRole, token);
    setUsers(users.map(user => user._id === userId ? { ...user, role: newRole } : user));
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-semibold mb-8">User Management</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left text-gray-600 uppercase font-semibold text-sm py-3 px-4">Name</th>
            <th className="text-left text-gray-600 uppercase font-semibold text-sm py-3 px-4">Email</th>
            <th className="text-left text-gray-600 uppercase font-semibold text-sm py-3 px-4">Role</th>
            <th className="text-left text-gray-600 uppercase font-semibold text-sm py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-4 px-4">{user.name}</td>
              <td className="py-4 px-4">{user.email}</td>
              <td className="py-4 px-4">{user.role}</td>
              <td className="py-4 px-4">
                {user.role === 'admin' ? (
                  <button disabled className="bg-gray-200 py-1 px-2 rounded text-gray-600 text-sm">Admin</button>
                ) : (
                  <button onClick={() => handleRoleChange(user._id, 'admin')} className="bg-green-500 hover:bg-green-600 py-1 px-2 rounded text-white text-sm">Promote to Admin</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
