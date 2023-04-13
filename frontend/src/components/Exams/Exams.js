import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import { Link, useHistory } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { clearErrors, getClass } from "../../redux/actions/classAction";
import Loader from "../layout/Loader";
import {
  clearErrors as clearExamErrors,
  createExam,
  deleteExam,
  editExam,
  getExam,
} from "../../redux/actions/examAction";
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

const Exams = ({ match }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const alert = useAlert();
  const {
    error,
    loading,
    class: classData,
  } = useSelector((state) => state.class);
  const { loading: loading1, user } = useSelector((state) => state.user);
  const {
    exams: examsState,
    error: examError,
    success: examSuccess,
  } = useSelector((state) => state.exam);

  useEffect(() => {
    dispatch(getClass(match.params.classId, user));
  }, []);

  const [exams, setExams] = useState(null);
  const [createExamModal, setCreateExamModal] = useState(false);
  const [editExamModal, setEditExamModal] = useState(false);
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");
  const [duration, setDuration] = useState("");
  const [expiry, setExpiry] = useState(new Date());
  const [totalMarks, setTotalMarks] = useState("");
  const [exam, setExam] = useState(null);

  useEffect(() => {
    setExams(examsState);
  }, [examsState]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      const x = error;
      dispatch(clearErrors());
      if (x === "Class not found") {
        history.push("/");
      } else if (x === "Exam not found") {
        history.push(`/class/${match.params.classId}`);
      }
    } else if (examError) {
      alert.error(examError);
      dispatch(clearExamErrors());
    }
  }, [dispatch, error, examError, alert]);

  useEffect(() => {
    if (examSuccess) {
      alert.success(examSuccess);
      dispatch(clearErrors());
    }
  }, [dispatch, examSuccess, alert]);

  const handleCloseModal = ()=>{
    setName("");
    setTopic("");
    setDuration("");
    setExpiry(new Date());
    setTotalMarks("");
    setExam(null);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const obj = { name, topic, duration, expiry, totalMarks };
    dispatch(createExam(obj, classData._id));
    handleCloseModal();
    setCreateExamModal(false);
  };
  
  const handleEditSubmit = (e) => {
    e.preventDefault();
    const obj = { name, topic, duration, expiry, totalMarks };
    dispatch(editExam(obj, exam._id));
    setEditExamModal(false);
    handleCloseModal();
  };

  const handleEditClick = (exam)=>{
    setExam(exam);
    setEditExamModal(true);
    setName(exam.name);
    setTopic(exam.topic);
    setDuration(exam.duration);
    setExpiry(exam.expiry);
    setTotalMarks(exam.totalMarks);
  }

  const handleDeleteExam = (examId)=>{
    dispatch(deleteExam(examId , classData._id));
  }

  return (
    <>
      {loading | !exams ? (
        <Loader />
      ) : (
        <>
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Exam name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Exam topic
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Duration
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Expiry Date
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Total Marks
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {exams.map((exam) => (
                    <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                      <th
                        scope="row"
                        onClick={()=>{history.push(`/class/${classData._id}/exam/${exam._id}`)}}
                        class="cursor-pointer px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {exam.name}
                      </th>
                      <td class="px-6 py-4">{exam.topic}</td>
                      <td class="px-6 py-4">{exam.duration } {"  min"}</td>
                      <td class="px-6 py-4">{new Date(exam.expiry).toISOString().slice(0,10)}</td>
                      <td class="px-6 py-4">{exam.totalMarks}</td>
                      <td class="px-6 py-4">
                        <button onClick={()=>{handleEditClick(exam)}} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                          Edit 
                        </button>
                        <button onClick={()=>{handleDeleteExam(exam._id)}} class="ml-2 font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
                      </td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={() => {
              setCreateExamModal(true);
            }}
          >
            {" "}
            Create exam
          </button>

{/* Create exam */}
          <Modal
            open={createExamModal}
            onClose={() => {
              setCreateExamModal(false);
              handleCloseModal();
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
                      setCreateExamModal(false);
                      handleCloseModal();
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
                      Create Exam
                    </h3>
                    <form class="space-y-6" action="#">
                      <div>
                        <label
                          for="name"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Exam Name :{" "}
                        </label>
                        <input
                          type="text"
                          name="name"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Exam name"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                          required
                        />
                      </div>
                      <div>
                        <label
                          for="topic"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Topic Name :{" "}
                        </label>
                        <input
                          type="text"
                          name="topic"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Topic"
                          required
                          value={topic}
                          onChange={(e) => {
                            setTopic(e.target.value);
                          }}
                        />
                      </div>
                      <div>
                        <label
                          for="total-marks"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Total Marks :{" "}
                        </label>
                        <input
                          type="number"
                          name="total-marks"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Total Marks"
                          required
                          value={totalMarks}
                          onChange={(e) => {
                            setTotalMarks(e.target.value);
                          }}
                        />
                      </div>
                      <div>
                        <label
                          for="duration"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Duration :{" "}
                        </label>
                        <input
                          type="number"
                          name="duration"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Duration"
                          required
                          value={duration}
                          onChange={(e) => {
                            setDuration(e.target.value);
                          }}
                        />
                      </div>

                      <div class="flex items-center justify-center">
                        <div
                          // class="relative mb-3 xl:w-96"
                          data-te-datepicker-init
                          data-te-input-wrapper-init
                        >
                          <label
                            for="floatingInput"
                            class="pblock mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Select a date
                          </label>
                          <input
                            type="date"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Select a date"
                            value={expiry}
                            onChange={(e) => {
                              setExpiry(e.target.value);
                            }}
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={handleSubmit}
                      >
                        Create Exam
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </Box>
          </Modal>

{/* Edit Exam */}
          <Modal
            open={editExamModal}
            onClose={() => {
              setEditExamModal(false);
              handleCloseModal();
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
                      setEditExamModal(false);
                      handleCloseModal();
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
                      Edit Exam
                    </h3>
                    <form class="space-y-6" action="#">
                      <div>
                        <label
                          for="name"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Exam Name :{" "}
                        </label>
                        <input
                          type="text"
                          name="name"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Exam name"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                          required
                        />
                      </div>
                      <div>
                        <label
                          for="topic"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Topic Name :{" "}
                        </label>
                        <input
                          type="text"
                          name="topic"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Topic"
                          required
                          value={topic}
                          onChange={(e) => {
                            setTopic(e.target.value);
                          }}
                        />
                      </div>
                      <div>
                        <label
                          for="total-marks"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Total Marks :{" "}
                        </label>
                        <input
                          type="number"
                          name="total-marks"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Total Marks"
                          required
                          value={totalMarks}
                          onChange={(e) => {
                            setTotalMarks(e.target.value);
                          }}
                        />
                      </div>
                      <div>
                        <label
                          for="duration"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Duration :{" "}
                        </label>
                        <input
                          type="number"
                          name="duration"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Duration"
                          required
                          value={duration}
                          onChange={(e) => {
                            setDuration(e.target.value);
                          }}
                        />
                      </div>

                      <div class="flex items-center justify-center">
                        <div
                          data-te-datepicker-init
                          data-te-input-wrapper-init
                        >
                          <label
                            for="floatingInput"
                            class="pblock mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Select a date
                          </label>
                          <input
                            type="date"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Select a date"
                            value={new Date(expiry).toISOString().slice(0,10)}
                            onChange={(e) => {
                              setExpiry(e.target.value);
                            }}
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={handleEditSubmit}
                      >
                        Save Changes
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </Box>
          </Modal>
        </>
      )}
    </>
  );
};

export default Exams;
