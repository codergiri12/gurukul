import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import { useHistory } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { clearErrors, getClass } from "../../redux/actions/classAction";
import Loader from "../layout/Loader";
import {
  clearErrors as clearExamErrors,
  createQuestion,
  deleteQuestion,
  editQuestion,
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

const Exam = ({ match }) => {
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
    exam: selectedExam,
    error: examError,
    success: examSuccess,
    questions: questionsState
  } = useSelector((state) => state.exam);

  useEffect(() => {
    dispatch(getClass(match.params.classId, user)).then(() => {
      dispatch(getExam(match.params.examId));
    });
  }, []);

  const [questions, setQuestions] = useState(null);
  const [createQuestionModal, setCreateQuestionModal] = useState(false);
  const [editQuestionModal, setEditQuestionModal] = useState(false);
  const [name, setName] = useState("");
  const [options, setOptions] = useState({
    option1: "",
    option2: "",
    option3: "",
    option4: "",
  });
  const [answer, setAnswer] = useState("");
  const [selectedQuestion , setSelectedQuestion] = useState(null);

  useEffect(() => {
    if(questionsState)
      setQuestions(questionsState);
  }, [questionsState]);

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
    setOptions({});
    setAnswer(0);
    setSelectedQuestion(null);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const obj = {
      name,
      options: [
        options.option1,
        options.option2,
        options.option3,
        options.option4,
      ],
      answer,
    };
    console.log(obj);
    dispatch(createQuestion(obj, selectedExam._id));
    handleCloseModal();
    setCreateQuestionModal(false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const obj = {
      name,
      options: [
        options.option1,
        options.option2,
        options.option3,
        options.option4,
      ],
      answer,
    };
    dispatch(editQuestion(obj, selectedQuestion._id));
    setEditQuestionModal(false);
    handleCloseModal();
  };

  const handleEditClick = (question)=>{
    setSelectedQuestion(question);
    setEditQuestionModal(true);
    setName(question.name);
    setOptions({
      option1: question.options[0],
      option2: question.options[1],
      option3: question.options[2],
      option4: question.options[3]
    })
    setAnswer(question.answer);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setOptions({ ...options, [name]: value });
  };

  const handleDeleteQuestion = (questionId)=>{
    dispatch(deleteQuestion(questionId));
  }

  return (
    <>
      {loading | loading1 | !questions ? (
        <Loader />
      ) : (
        <>
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Question
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Option 1
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Option 2
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Option 3
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Option 4
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Answer
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {questions.map((question) => (
                  <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {question.name}
                    </th>
                    <td class="px-6 py-4">{question.options[0]}</td>
                    <td class="px-6 py-4">{question.options[1]}</td>
                    <td class="px-6 py-4">{question.options[2]}</td>
                    <td class="px-6 py-4">{question.options[3]}</td>
                    <td class="px-6 py-4">{String.fromCharCode(64 + question.answer)}</td>
                    <td class="px-6 py-4">
                    <button onClick={()=>{handleEditClick(question)}} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                          Edit 
                        </button>
                      <button onClick={()=>{handleDeleteQuestion(question._id)}} class="ml-2 font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            className="border border-4 border-blue-500"
            onClick={() => {
              setCreateQuestionModal(true);
            }}
          >
            {" "}
            + Create Question{" "}
          </button>

          <Modal
            open={createQuestionModal}
            onClose={() => {
              setCreateQuestionModal(false);
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
                      setCreateQuestionModal(false);
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
                      Create Question
                    </h3>
                    <form class="space-y-6" action="#">
                      <div>
                        <label
                          for="name"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Question name :{" "}
                        </label>
                        <input
                          type="text"
                          name="name"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Question name"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                          required
                        />
                      </div>
                      <div>
                        <label
                          for="option1"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Option1 :{" "}
                        </label>
                        <input
                          type="text"
                          name="option1"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Option1"
                          required
                          value={options.option1}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label
                          for="option2"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Option2 :{" "}
                        </label>
                        <input
                          type="text"
                          name="option2"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Option2"
                          required
                          value={options.option2}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label
                          for="option3"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Option3 :{" "}
                        </label>
                        <input
                          type="text"
                          name="option3"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Option3"
                          required
                          value={options.option3}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label
                          for="option4"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Option4 :{" "}
                        </label>
                        <input
                          type="text"
                          name="option4"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Option4"
                          required
                          value={options.option4}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label
                          for="answer"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Answer :{" "}
                        </label>
                        <input
                          type="number"
                          name="answer"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Answer (1/2/3/4)"
                          required
                          value={answer}
                          onChange={(e) => {
                            setAnswer(e.target.value);
                          }}
                        />
                      </div>

                      <button
                        type="button"
                        class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={handleSubmit}
                      >
                        Create Question
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </Box>
          </Modal>

          <Modal
            open={editQuestionModal}
            onClose={() => {
              setEditQuestionModal(false);
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
                      setEditQuestionModal(false);
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
                      Edit Question
                    </h3>
                    <form class="space-y-6" action="#">
                      <div>
                        <label
                          for="name"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Question name :{" "}
                        </label>
                        <input
                          type="text"
                          name="name"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Question name"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                          required
                        />
                      </div>
                      <div>
                        <label
                          for="option1"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Option1 :{" "}
                        </label>
                        <input
                          type="text"
                          name="option1"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Option1"
                          required
                          value={options.option1}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label
                          for="option2"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Option2 :{" "}
                        </label>
                        <input
                          type="text"
                          name="option2"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Option2"
                          required
                          value={options.option2}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label
                          for="option3"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Option3 :{" "}
                        </label>
                        <input
                          type="text"
                          name="option3"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Option3"
                          required
                          value={options.option3}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label
                          for="option4"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Option4 :{" "}
                        </label>
                        <input
                          type="text"
                          name="option4"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Option4"
                          required
                          value={options.option4}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label
                          for="answer"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Answer :{" "}
                        </label>
                        <input
                          type="number"
                          name="answer"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Answer (1/2/3/4)"
                          required
                          value={answer}
                          onChange={(e) => {
                            setAnswer(e.target.value);
                          }}
                        />
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

export default Exam;
