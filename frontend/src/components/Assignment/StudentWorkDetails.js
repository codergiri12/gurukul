import {Button, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { clearErrors, getAssignment, getClass, getSubmission, getSubmissions, submitAssignment, unsubmitAssignment, updateGrade } from '../../redux/actions/classAction';
import Loader from '../layout/Loader';


const MyComponent = ({url , fileIndex}) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    console.log("loading --------");
  }, [fileIndex])
  
  return (
    <div className="w-full h-full">
      {isLoading && <Loader />} 
      <iframe className="w-full h-full" src={url} width="100%" height="100%" title="File Viewer" onLoad={()=>{setIsLoading(false)}} />
    </div>
  );
}


const GradeTextbox = ({maxGrade, grade, setGrade}) => {

  const handleChange = (event) => {
    const newGrade = event.target.value;
    if (/^\d*\.?\d*$/.test(newGrade)) {
      setGrade(newGrade);
    }
    console.log(typeof grade);
  }

  return (
    <TextField
      // className={classes.input} 
      label="Grade"
      value={grade}
      controls={false}
      onChange={handleChange}
      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} 
      InputProps={{
        endAdornment: <span>{`/${maxGrade}`}</span>,
        inputMode: 'numeric', pattern: '[0-9]*'
      }}
    />
  );
}

const StudentWorkDetails = ({match}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const alert = useAlert();

  const {
    error,
    loading,
    class: classData,
    studentSubmission:submission,
  } = useSelector((state) => state.class);
  const { loading: loading1, user } = useSelector((state) => state.user);


  useEffect(() => {
    dispatch(getClass(match.params.classId,user)).then(()=>{
      dispatch(getAssignment(match.params.assignmentId,user._id)).then(()=>{
        dispatch(getSubmission(match.params.submissionId))
      })
    })
  }, [user]);
  

  useEffect(() => {
    if (error) {
      alert.error(error);
      const x = error;
      dispatch(clearErrors());
      if (x === "Class not found") {
        history.push("/");
      }else if(x === 'Assignment not found'){
        history.push(`/class/${match.params.classId}`)
      }
    }
  }, [dispatch, error, alert]);

  useEffect(() => {
    if(submission){
      setGrade(submission.grade.marks);
    }
  }, [submission])
  

  const [fileIndex, setfileIndex] = useState(0);
  const [grade, setGrade] = useState(null);

  const handleSubmit = (e)=>{
    e.preventDefault();
    dispatch(updateGrade(submission.grade._id , parseInt(grade)));
  }

  return (
    <>
      {loading | !submission ? (
        <Loader />
      ) : (
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-3/4 h-screen">
            <MyComponent fileIndex={fileIndex} url={`http://localhost:4000/api/v1/class/file/${submission.files[fileIndex].fileName}`} />
          </div>
          <div className="w-full md:w-1/4">
            <div className="flex flex-col">
              {submission.files &&
                submission.files.length > 0 &&
                submission.files.map((file, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer w-full border-2 border-black ${
                      fileIndex === index && "bg-gray-200"
                    }`}
                    onClick={(e) => {
                      setfileIndex(index);
                    }}
                  >
                    {file.originalName}
                  </div>
                ))}
                <GradeTextbox grade={grade} setGrade={setGrade} maxGrade={submission.grade.totalMarks} />
                <Button variant="contained" component="label" onClick = {handleSubmit}>
                  Return 
                </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default StudentWorkDetails