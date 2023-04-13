import React from 'react'
import { Link } from 'react-router-dom';

export const AssignmentHeader = ({classData,assignment}) => {
  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-white py-4 px-6 shadow">
        {/* ClassName link on the left */}
        <div className="flex items-center mr-4">
          <Link to={`/class/${classData._id}`} className="text-gray-900 font-medium hover:text-blue-500 hover:underline">
            {classData.className}
          </Link>
        </div>

        {/* Two main buttons in the center */}
        <div className="flex items-center flex-1 justify-center">
          <Link
            to={`/class/${classData._id}/assignment/${assignment._id}`}
            className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md border-4 border-white border-b-indigo-500"
          >
            Instructions
          </Link>
          <Link
            to={`/class/${classData._id}/assignment/${assignment._id}/studentwork`}
            className="text-gray-600 hover:bg-gray-300 px-3 py-2 rounded-md ml-2"
          >
            Student Work
          </Link>
        </div>
      </nav>
    </>
  );
}
export const StudentWorkHeader = ({classData,assignment}) => {
  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-white py-4 px-6 shadow">
        {/* ClassName link on the left */}
        <div className="flex items-center mr-4">
          <Link to={`/class/${classData._id}`} className="text-gray-900 font-medium hover:text-blue-500 hover:underline">
            {classData.className}
          </Link>
        </div>

        {/* Two main buttons in the center */}
        <div className="flex items-center flex-1 justify-center">
          <Link
            to={`/class/${classData._id}/assignment/${assignment._id}`}
            className="text-gray-600 hover:bg-gray-300 px-3 py-2 rounded-md ml-2"
          >
            Instructions
          </Link>
          <Link
            to={`/class/${classData._id}/assignment/${assignment._id}/studentwork`}
            className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md border-4 border-white border-b-indigo-500"
          >
            Student Work
          </Link>
        </div>
      </nav>
    </>
  );
}


