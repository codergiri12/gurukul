import React from 'react'
import { Link } from 'react-router-dom';

const ClassHeader = ({classData,current}) => {
  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-white pt-4 px-6 shadow">
        {/* ClassName link on the left */}
        <div className="flex items-center mr-4">
          {/* <Link to={`/`} className="font-semibold text-gray-900 hover:text-blue-500 hover:underline">
            {"Home"}
          </Link> */}
          <div className="flex ">
            <img
              className="w-20"
              src={process.env.PUBLIC_URL + '/assets/img/logo.jpg'}
              alt="Logo"
            />
            <Link to="/" className=" flex cursor-pointer items-center rounded-md py-1 mt-2 capitalize decoration-indigo-500 decoration-2 underline-offset-1 transition   duration-300 ease-in-out">
              <span className="text-amber-900	 text-3xl">Gurukul</span>
            </Link>
          </div>
        </div>

        {/* Two main buttons in the center */}
        <div className="flex items-center flex-auto justify-center">
          <Link
            to={`/class/${classData._id}`}
            className={`${current=="Stream" && "border-4 border-white border-b-indigo-500"} text-gray-600 hover:bg-gray-300 px-3 py-2 rounded-md `}
          >
            Stream
          </Link>
          <Link
            to={`/class/${classData._id}/exams`}
            className={`${current=="Exams" && "border-4 border-white border-b-indigo-500"} text-gray-600 hover:bg-gray-300 px-3 py-2 rounded-md ml-2`}
          >
            Exams
          </Link>
          <Link
            to={`/class/${classData._id}/people`}
            className={`${current=="People" && "border-4 border-white border-b-indigo-500"} text-gray-600 hover:bg-gray-300 px-3 py-2 rounded-md`}
          >
            People
          </Link>
          <Link
            to={`/class/${classData._id}/grades`}
            className={`${current=="Grades" && "border-4 border-white border-b-indigo-500"} text-gray-600 hover:bg-gray-300 px-3 py-2 rounded-md ml-2`}
          >
            Grades
          </Link>
        </div>
      </nav>
    </>
  );
}

export default ClassHeader