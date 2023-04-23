import React from 'react'
import { Link } from 'react-router-dom';

const CodingHeader = ({current}) => {
  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-white pt-4 px-6 shadow">
        <div className="flex items-center mr-4">
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
        <div className="flex items-center justify-center">
          <Link to="/coding"
            className={`${current=="Coding" && "border-4 border-white border-b-indigo-500"} font-semibold text-xl text-gray-600 px-3 py-2 rounded-md `}
          >
            Coding Practice
          </Link>
        </div>
        <div className="flex items-center justify-center">
          <Link
            to={`/ide`}
            className={`${current=="IDE" && "border-4 border-white border-b-indigo-500"} font-semibold text-xl text-gray-600 hover:bg-gray-300 px-3 py-2 rounded-md `}
          >
            IDE
          </Link>
        </div>
      </nav>
    </>
  );
}

export default CodingHeader