import React, { useEffect,useState }from 'react'
import io from "socket.io-client";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getExamReport } from '../../redux/actions/examAction';
import Loader from "../layout/Loader";
import { getClass } from '../../redux/actions/classAction';
import ShowScore from './ShowScore';


const socket = io("http://localhost:4000");
const StudentExam = ({match}) => {
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
    examReport,
    exam: selectedExam,
    error: examError,
    questions: questionsState
  } = useSelector((state) => state.exam);

  const [timeRemaining, setTimeRemaining] = useState(-1);
  const [optionsSelected , setOptionsSelected] = useState({});
  const [score, setScore] = useState(0)

  useEffect(() => {
    dispatch(getClass(match.params.classId, user)).then(() => {
      dispatch(getExamReport(user._id, match.params.examId));
    });
  }, []);

  

  const intervalRef = React.useRef();
  let timer;
  const startTimer = (timerParameter) => {
    timer = timerParameter;
    intervalRef.current = setInterval(() => {
      if (timer <= 0) {
        clearInterval(intervalRef.current);
      }
      timer--;
      socket.emit("set-remaining-time", {
        reportId : examReport._id ,
        timeRemaining: timer,
      }) ;
      setTimeRemaining(timer);
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  };


  useEffect(() => {
    if(examReport){
      setTimeRemaining(examReport.remainingTime);
      setOptionsSelected(examReport.selectedOptions);
      startTimer(examReport.remainingTime);
      if(examReport.score){
        setScore(examReport.score);
      }
    }
      
  }, [examReport])

  useEffect(() => {
    socket.on("set-remaining-time-success", () => {
      console.log("time updatd in backend");
    });
    socket.on("set-option-success", () => {
      console.log("option updated backend");
    });
    socket.on("submit-exam-success", (data) => {
      console.log("exam Submitted, ", data);
      timer=-1;
      clearInterval(intervalRef.current);
      setTimeRemaining(-1);
      setScore(data.score);
    });

  }, [socket]);



  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
  
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  
    if (formattedHours !== '00') {
      return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }
  
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleNext = () => {
    if (currentQuestion < questionsState.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit= ()=>{
    socket.emit("submit-exam",examReport._id);
  }

  if(timeRemaining==0){
    handleSubmit();
  }

  return (
    <>
      {loading | loading1 | !examReport ? (
        <Loader />
      ) : (
        <>
          {(examReport.remainingTime > 0 && timeRemaining > 0) ? (
            <div className="">
              <div className="flex justify-between p-4 items-center">
                <div className="flex ">
                  <img
                    className="w-20 ml-4"
                    src={process.env.PUBLIC_URL + '/assets/img/logo.jpg'}
                    alt="Logo"
                  />
                  <span className=" flex cursor-pointer items-center gap-1 rounded-md px-2 py-1 mt-2 capitalize decoration-indigo-500 decoration-2 underline-offset-1 transition   duration-300 ease-in-out">
                    <span className="text-amber-900	 text-3xl">Gurukul</span>
                  </span>
                </div>
                <div className="font-bold text-xl underline">
                  {selectedExam.name} {"  Exam"}
                </div>
                <div className="flex items-center text-lg">
                  <span> {"Time left: "} {formatTime(timeRemaining)} </span>
                  <button
                    className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
              <div className="w-4/5 mx-auto mt-8">
                {/* <div className=""> */}
                  <div className="flex justify-between border-2 border-white border-b-indigo-500">
                    <div className="text-xl font-semibold">Question No {currentQuestion+1}</div>
                    <div className="">Single Type Question</div>
                  </div>
                {/* </div> */}
                <div className="mt-8">
                  <div className="">
                    {questionsState[currentQuestion].name}
                  </div>
                  <div className="flex flex-col mt-4">
                    {questionsState[currentQuestion].options.map(
                      (option, index) => (
                        <button
                          key={index}
                          className={`${
                            (optionsSelected &&
                              optionsSelected[currentQuestion] &&
                              optionsSelected[currentQuestion]) === index
                              ? "bg-blue-500 transition duration-200"
                              : "bg-white"
                          } hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-4 mb-4`}
                          onClick={() => {
                            const newOptions = {...optionsSelected , [currentQuestion]:index};
                            setOptionsSelected(newOptions);
                            socket.emit("set-option", {
                              reportId: examReport._id,
                              question: currentQuestion,
                              option: index + 1,
                            });
                          }}
                        >
                          {option}
                        </button>
                      )
                    )}
                  </div>
                </div>
                <div className="flex justify-between">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
                    onClick={handlePrev}
                    disabled={currentQuestion === 0}
                  >
                    Previous
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleNext}
                    disabled={currentQuestion === questionsState.length - 1}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <ShowScore exam={selectedExam} score={score} />
          )}
        </>
      )}
    </>
  );
}

export default StudentExam