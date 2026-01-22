"use client";

import { useState } from "react";

export default function UserManagement({ users }) {
  const [selectedRoles, setSelectedRoles] = useState({});
  const [loading, setLoading] = useState(false);

  const handleRoleChange = (userId, newRole) => {
    
  };

  const handleApproveClick = async (userId) => {
    setLoading(true);
    
    setLoading(false);
  };

  const handleRejectClick = async (userId) => {
      
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                No pending users found.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.userID}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.fullName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    className="border p-1 rounded text-black focus:ring-2 focus:ring-blue-500"
                    value={selectedRoles[user.userID] || "UNASSIGNED"}
                    onChange={(e) => handleRoleChange(user.userID, e.target.value)}
                  >
                    <option value="UNASSIGNED">Unassigned</option>
                    <option value="WORKER">Worker</option>
                    <option value="TEAM_LEADER">Team Leader</option>
                    <option value="OFFICE_STAFF">Office Staff</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
                  <button
                    onClick={() => handleApproveClick(user.userID)}
                    disabled={loading}
                    className="text-blue-600 hover:text-blue-900 mr-4 font-semibold disabled:opacity-50"
                  >
                    Approve
                  </button>
                  <button 
                    onClick={() => handleRejectClick(user.userID)}
                    disabled={loading}
                    className="text-red-600 hover:text-red-900 font-semibold disabled:opacity-50"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}