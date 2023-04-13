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

  const [timeRemaining, setTimeRemaining] = useState(null);
  const [optionsSelected , setOptionsSelected] = useState({});
  const [score, setScore] = useState(0)

  useEffect(() => {
    dispatch(getClass(match.params.classId, user)).then(() => {
      dispatch(getExamReport(user._id, match.params.examId));
    });
  }, []);

  

  const intervalRef = React.useRef();

  const startTimer = (timerParameter) => {
    let timer = timerParameter;
    intervalRef.current = setInterval(() => {
      timer--;
      setTimeRemaining(timer);
      socket.emit("set-remaining-time", {
        reportId : examReport._id ,
        timeRemaining: timer,
      }) ;

      if (timer <= 0) {
        clearInterval(intervalRef.current);
      }
    }, 1000);
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
    console.log("submit called...")
    handleSubmit();
  }

  return (
    <>
      {loading | loading1 | !examReport ? (
        <Loader />
      ) : (
        <>
          {
            (examReport.remainingTime > 0 && timeRemaining>0)? 
            (<div>
              <h1>Timer</h1>
              <p>{formatTime(timeRemaining)}</p>
              <div className="bg-gray-100 py-4 px-8">
                <h1 className="text-2xl font-bold mb-4">
                  Question {currentQuestion + 1}
                </h1>
                <p className="mb-4">{questionsState[currentQuestion].name}</p>
                <div className="flex flex-wrap">
                  {questionsState[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      className={`${(optionsSelected && optionsSelected[currentQuestion] && optionsSelected[currentQuestion]) === index ? "bg-blue-500 transition duration-200" : "bg-white"} hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-4 mb-4`}
                      onClick={()=>{
                        setOptionsSelected({...optionsSelected , [currentQuestion]:index})
                        socket.emit("set-option",{reportId :examReport._id ,question : currentQuestion , option : index+1 });
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <div className="mt-4">
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
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>):(
              <ShowScore exam={selectedExam} score={score} />
            )
          }
        </>
      )}
    </>
  );
}

export default StudentExam