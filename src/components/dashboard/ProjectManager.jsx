"use client";

import { useState } from "react";
import { saveProject, deleteProject } from "@/app/actions";

export default function ProjectManager({ initialProjects, availableStaff }) {
  
  const [isEditing, setIsEditing] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({ 
    projectName: "", 
    projectLocation: "", 
    projectStatus: "NOT_STARTED",
    assignedUserIDs: []
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleUser = (userId) => {
    const currentIds = formData.assignedUserIDs;
    if (currentIds.includes(userId)) {
      setFormData({ ...formData, assignedUserIDs: currentIds.filter(id => id !== userId) });
    } else {
      setFormData({ ...formData, assignedUserIDs: [...currentIds, userId] });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
        ...formData,
        projectID: isEditing
    };

    const result = await saveProject(payload);

    setIsLoading(false);

    if (result.success) {
        resetForm();
    } else {
        alert("Error: " + result.error);
    }
  };

  const handleDelete = async (id) => {
      if(!confirm("Are you sure?")) return;
      
      const result = await deleteProject(id);
      
      if (!result.success) {
          alert("Failed to delete project");
      }
  };

  const startEdit = (project) => {
    setIsEditing(project.projectID);
    setFormData({ 
        projectName: project.projectName, 
        projectLocation: project.projectLocation, 
        projectStatus: project.projectStatus,
        assignedUserIDs: project.users.map(u => u.userID) 
    });
  };

  const resetForm = () => {
    setIsEditing(null);
    setFormData({ projectName: "", projectLocation: "", projectStatus: "NOT_STARTED", assignedUserIDs: [] });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      
      <div className="mb-8 p-6 bg-white rounded-lg border border-gray-200">
         <h2 className="text-xl font-bold mb-4 text-orange-600">
            {isEditing ? "Edit Project" : "Create New Project"}
         </h2>
         
         <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-black mb-1">Project Name</label>
                    <input name="projectName" value={formData.projectName} onChange={handleChange} className="w-full border p-2 rounded text-black" required />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-black mb-1">Location</label>
                    <input name="projectLocation" value={formData.projectLocation} onChange={handleChange} className="w-full border p-2 rounded text-black" required />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-black mb-1">Status</label>
                    <select name="projectStatus" value={formData.projectStatus} onChange={handleChange} className="w-full border p-2 rounded text-black">
                        <option value="NOT_STARTED">Not Started</option>
                        <option value="ONGOING">Ongoing</option>
                        <option value="ON_HOLD">On Hold</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="CANCELLED">Cancelled</option>
                    </select>
                </div>
            </div>

            <div className="border p-4 rounded bg-white">
                <label className="block text-sm font-bold text-gray-700 mb-3">Assign Team Members:</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-60 overflow-y-auto">
                    {availableStaff.map(user => {
                        const isBusy = user.project && user.project.projectID !== isEditing;
                        return (
                            <label key={user.userID} className={`flex items-start space-x-3 p-3 rounded border cursor-pointer ${isBusy ? "bg-yellow-50" : "hover:bg-blue-50"}`}>
                                <input type="checkbox" checked={formData.assignedUserIDs.includes(user.userID)} onChange={() => toggleUser(user.userID)} className="mt-1 h-4 w-4 text-blue-600" />
                                <div className="flex flex-col">
                                    <span className="text-gray-900 font-medium">{user.username}</span>
                                    <span className="text-xs text-gray-500">{user.role.replace("_", " ")}</span>
                                    {isBusy && <span className="mt-1 text-xs text-amber-700 font-bold">On Active Project: {user.project.projectName}</span>}
                                </div>
                            </label>
                        )
                    })}
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="bg-orange-600 text-white px-6 py-2 rounded font-bold hover:bg-orange-700 disabled:opacity-50"
                >
                    {isLoading ? "Saving..." : (isEditing ? "Update Project" : "Create Project")}
                </button>
                {isEditing && <button type="button" onClick={resetForm} className="text-gray-500 underline hover:text-blue-600">Cancel Edit</button>}
            </div>
         </form>
      </div>

      <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-gray-200 rounded-lg">
            <thead className="bg-gray-100 text-black uppercase text-sm">
                <tr>
                    <th className="p-3 border-b">Project Name</th>
                    <th className="p-3 border-b">Location</th>
                    <th className="p-3 border-b">Status</th>
                    <th className="p-3 border-b">Team</th>
                    <th className="p-3 border-b text-center">Edit/Delete</th>
                </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
                {initialProjects.map((project) => (
                    <tr key={project.projectID} className="border-b hover:bg-gray-50 text-black">
                        <td className="p-3 font-medium">{project.projectName}</td>
                        <td className="p-3">{project.projectLocation}</td>
                        <td className="p-3">
                             <span className={`px-2 py-1 rounded-full text-xs font-bold ${project.projectStatus === 'ONGOING' ? 'bg-green-100 text-green-800' : 'bg-gray-100'}`}>
                                {project.projectStatus.replace("_", " ")}
                            </span>
                        </td>
                        <td className="p-3">
                            <div className="flex flex-wrap gap-1">
                                {project.users.length > 0 ? project.users.map(u => <span key={u.userID} className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded">{u.username}</span>) : "-"}
                            </div>
                        </td>
                        <td className="p-3 text-center space-x-2">
                            <button onClick={() => startEdit(project)} className="text-blue-500">Edit</button>
                            <button onClick={() => handleDelete(project.projectID)} className="text-red-500">Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
          </table>
      </div>
    </div>
  );
}