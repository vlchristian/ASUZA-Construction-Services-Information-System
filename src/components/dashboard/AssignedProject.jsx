"use client";

export default function AssignedProject({ project }) {
  if (!project) {
    return (
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <p className="text-gray-500">You are currently not assigned to any project at this moment.</p>
      </div>
    );
  }

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">

      <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">
          Assigned Project
        </h3>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">

          <div className="sm:col-span-1">
            <div className="text-sm text-black">Project Name</div>
            <div className="mt-1 text-gray-700">{project.projectName}</div>
          </div>
          <div className="sm:col-span-1">
            <div className="text-sm text-black">Status</div>
            <div className="mt-1">
              <span className={`px-2 py-1 text-xs font-bold rounded-full
                ${project.projectStatus === 'NOT_STARTED' ? 'bg-gray-100 text-gray-800' : ''}
                ${project.projectStatus === 'ONGOING' ? 'bg-green-100 text-green-800' : ''}
                ${project.projectStatus === 'COMPLETED' ? 'bg-blue-100 text-blue-800' : ''}
                ${project.projectStatus === 'ON_HOLD' ? 'bg-yellow-100 text-yellow-800' : ''}
                ${project.projectStatus === 'CANCELLED' ? 'bg-yellow-100 text-yellow-800' : ''}
              `}>
                {project.projectStatus.replace("_", " ")}
              </span>
            </div>
          </div>
          <div className="sm:col-span-2">
            <div className="text-sm text-black">Site Location</div>
            <div className="mt-1 text-sm text-gray-700 flex items-center gap-2">
              {project.projectLocation}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}