import React, { useState } from "react";
// import { Modal, ModalBody } from "reactstrap";
import Modal from "@mui/material/Modal";
import { useHistory } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createClass, joinClass } from "../../redux/actions/classAction";
import { loadUser } from "../../redux/actions/userAction";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  borderRadius: 2,
  pt: 2,
  px: 4,
  pb: 3,
};

const HomeHeader = ({user}) => {
  const history = useHistory();
  const dispatch  = useDispatch();
  const [joinClassModal, setJoinClassModal] = useState(false);
  const [createClassModal, setCreateClassModal] = useState(false);
  const [classNameInput, setClassNameInput] = useState("");
  const [classCodeInput, setClassCodeInput] = useState("")

  const {
    classroom
  } = useSelector((state) => state.class);

  const logout = () => {
    localStorage.removeItem("token");
    history.push("/login");
    window.location.reload();
  };

  const handleCreate = ()=>{
    dispatch(createClass(classNameInput,user._id)).then(()=>{
      dispatch(loadUser())
    })
  }

  const handleJoin = ()=>{
    dispatch(joinClass(classCodeInput, user._id)).then(()=>{
      dispatch(loadUser())
    })
  }
  return (
    <>
      <div className="flex  flex-col">
        <div className="mb-2 md:border-b py-2">
          <div className="container mx-auto">
            <div className="flex justify-between gap-2">
              <div className="flex flex-row">
                <img
                  className="w-20 ml-4"
                  src="./assets/img/logo.jpg"
                  alt="Logo"
                />
                <a className=" flex   cursor-pointer items-center gap-1 rounded-md px-2 py-1 mt-2 capitalize decoration-indigo-500 decoration-2 underline-offset-1 transition   duration-300 ease-in-out">
                  <span className="text-amber-900	 text-3xl">Gurukul</span>
                </a>
              </div>

              <ul className="hidden md:flex">
                {/* {menuItems.map(({ name, route }) => ( */}
                <li  className="float-left">
                    <a href="/coding"
                        className="flex cursor-pointer items-center gap-3 rounded-md px-4 py-1 mt-2 capitalize decoration-indigo-500 decoration-2 underline-offset-1 transition   duration-300 ease-in-out"
                    >
                        <span className="text-gray-800 text-2xl">Coding</span>
                    </a>
                </li>
                <li className="float-left">
                  <button className="flex cursor-pointer items-center gap-3 rounded-sm px-4 py-1 mt-2 capitalize decoration-indigo-500 decoration-2 underline-offset-1 transition   duration-300 ease-in-out"
                    onClick={() => {
                      setCreateClassModal(true);
                    }}
                  >
                    <span className="text-gray-800 text-2xl">Create</span>
                  </button>
                </li>
                <li className="float-left">
                  <button
                    className="flex cursor-pointer items-center gap-3 rounded-sm px-4 py-1 mt-2 capitalize decoration-indigo-500 decoration-2 underline-offset-1 transition   duration-300 ease-in-out"
                    onClick={() => {
                      setJoinClassModal(true);
                    }}
                  >
                    <span className="text-gray-800 text-2xl">Join</span>
                  </button>
                </li>
                <li className="float-left">
                  <a className="flex cursor-pointer items-center gap-3 rounded-sm px-4 py-1 mt-2 capitalize decoration-indigo-500 decoration-2 underline-offset-1 transition   duration-300 ease-in-out">
                    <span
                      className="text-gray-800 text-2xl"
                      onClick={(e) => {
                        e.preventDefault();
                        logout();
                      }}
                    >
                      Logout
                    </span>
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
        <a href="/coding" className="flex justify-center cursor-pointer items-center gap-1 rounded-sm px-2 py-1 mt-2 capitalize decoration-indigo-500 decoration-2 underline-offset-1 transition     duration-300 ease-in-out"
        >
            <span className="text-gray-500">Coding</span>
        </a>
        <a className="flex justify-center cursor-pointer items-center gap-1 rounded-sm px-2 py-1 mt-2 capitalize decoration-indigo-500 decoration-2 underline-offset-1 transition     duration-300 ease-in-out">
          <span className="text-gray-500">Create</span>
        </a>
        <a
          type="button"
          data-modal-target="authentication-modal"
          data-modal-toggle="authentication-modal"
          className="flex justify-center cursor-pointer items-center gap-1 rounded-sm px-2 py-1 mt-2 capitalize decoration-indigo-500 decoration-2 underline-offset-1 transition     duration-300 ease-in-out"
        >
          <span className="text-gray-500">Join</span>
        </a>
        <a className="flex justify-center cursor-pointer items-center gap-1 rounded-sm px-2 py-1 mt-2 capitalize decoration-indigo-500 decoration-2 underline-offset-1 transition     duration-300 ease-in-out">
          <span
            className="text-gray-500"
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}
          >
            Logout
          </span>
        </a>
        {/* ))} */}
      </div>

      <Modal
        open={joinClassModal}
        onClose={() => {
          setJoinClassModal(false);
        }}
        className="authentication-modal"
      >
        <Box sx={style}>
          <div class="relative w-full h-full max-w-md md:h-auto">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                class="absolute top-0 right-0 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-hide="authentication-modal"
                onClick={() => {
                  setJoinClassModal(false);
                }}
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
              <div class="">
                <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                  Join Classroom
                </h3>
                <div class="space-y-6">
                  <div>
                    <label
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Class Code:{" "}
                    </label>
                    <input
                      type="text"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="class code"
                      required
                      value = {classCodeInput}
                      onChange = {(e)=>{setClassCodeInput(e.target.value)}}
                    />
                  </div>

                  <button
                    onClick={handleJoin}
                    class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Join Class
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
      <Modal
        open={createClassModal}
        onClose={() => {
          setCreateClassModal(false);
        }}
        className="authentication-modal-1"
      >
        <Box sx={style}>
          <div class="relative w-full h-full max-w-md md:h-auto">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                class="absolute top-0 right-0 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-hide="authentication-modal-1"
                onClick={() => {
                  setCreateClassModal(false);
                }}
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
              <div class="">
                <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                  Create Classroom
                </h3>
                <div className="space-y-6">
                  <div>
                    <label
                      // for="email"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Class Name:{" "}
                    </label>
                    <input
                      type="text"
                      // name="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Class Name"
                      required
                      value={classNameInput}
                      onChange={(e)=>{setClassNameInput(e.target.value)}}
                    />
                  </div>

                  <button
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={handleCreate}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default HomeHeader;
