import React from 'react'
import {useHistory} from 'react-router-dom'
const HomeHeader = () => {
    const history=useHistory();

    const logout = () => {
        localStorage.removeItem("token")
        history.push('/login')
        window.location.reload()
      }
  return (
    <>
    <div className="flex  flex-col">
            <div className="mb-2 md:border-b py-2">
                <div className="container mx-auto">
                    <div className="flex justify-between gap-2">
                            <div className='flex flex-row'>
                            <img
                                className="w-20 ml-4"
                                src="./assets/img/logo.jpg"
                                alt="Logo"
                            />
                            <a
                                        className=" flex   cursor-pointer items-center gap-1 rounded-md px-2 py-1 mt-2 capitalize decoration-indigo-500 decoration-2 underline-offset-1 transition   duration-300 ease-in-out"
                                    >
                                        <span className="text-amber-900	 text-3xl">Gurukul</span>
                                    </a>
                            </div>
                            
                        <ul className="hidden md:flex">
                            {/* {menuItems.map(({ name, route }) => ( */}
                                <li  className="float-left">
                                    <a
                                        className="flex cursor-pointer items-center gap-3 rounded-md px-4 py-1 mt-2 capitalize decoration-indigo-500 decoration-2 underline-offset-1 transition   duration-300 ease-in-out"
                                    >
                                        <span className="text-gray-800 text-2xl">IDE</span>
                                    </a>
                                </li>
                                <li  className="float-left">
                                    <a
                                        className="flex cursor-pointer items-center gap-3 rounded-sm px-4 py-1 mt-2 capitalize decoration-indigo-500 decoration-2 underline-offset-1 transition   duration-300 ease-in-out"
                                    >
                                        <span className="text-gray-800 text-2xl">Create</span>
                                    </a>
                                </li>
                                <li  className="float-left">
                                    <a
                                        className="flex cursor-pointer items-center gap-3 rounded-sm px-4 py-1 mt-2 capitalize decoration-indigo-500 decoration-2 underline-offset-1 transition   duration-300 ease-in-out"
                                    >
                                        <span className="text-gray-800 text-2xl">Join</span>
                                    </a>
                                </li>
                                <li  className="float-left">
                                    <a
                                        className="flex cursor-pointer items-center gap-3 rounded-sm px-4 py-1 mt-2 capitalize decoration-indigo-500 decoration-2 underline-offset-1 transition   duration-300 ease-in-out"
                                    >
                                        <span className="text-gray-800 text-2xl"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            logout()
                                          }}>Logout</span>
                                    </a>
                                </li>
                            {/* ))} */}
                        </ul>
                    </div>
                </div>
            </div>
            {/* <div className="bg-white">satyam</div> */}
        </div>

        <div className="flex flex-col md:hidden border-b pl-3 ">
    {/* {menuItems.map(({ name, route }) => ( */}
        <a className="flex justify-center cursor-pointer items-center gap-1 rounded-sm px-2 py-1 mt-2 capitalize decoration-indigo-500 decoration-2 underline-offset-1 transition     duration-300 ease-in-out"
        >
            <span className="text-gray-500">IDE</span>
        </a>
        <a className="flex justify-center cursor-pointer items-center gap-1 rounded-sm px-2 py-1 mt-2 capitalize decoration-indigo-500 decoration-2 underline-offset-1 transition     duration-300 ease-in-out"
        >
            <span className="text-gray-500">Create</span>
        </a>
        <a className="flex justify-center cursor-pointer items-center gap-1 rounded-sm px-2 py-1 mt-2 capitalize decoration-indigo-500 decoration-2 underline-offset-1 transition     duration-300 ease-in-out"
        >
            <span className="text-gray-500">Join</span>
        </a>
        <a className="flex justify-center cursor-pointer items-center gap-1 rounded-sm px-2 py-1 mt-2 capitalize decoration-indigo-500 decoration-2 underline-offset-1 transition     duration-300 ease-in-out"
        >
            <span className="text-gray-500" onClick={(e) => {
                  e.preventDefault()
                  logout()
                }}>Logout</span>
        </a>
    {/* ))} */}
</div>
</>

     
  )
}

export default HomeHeader