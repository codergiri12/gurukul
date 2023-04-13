import { MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { clearErrors, getAssignment, getClass, getSubmissions, submitAssignment, unsubmitAssignment } from '../../redux/actions/classAction';
import Loader from '../layout/Loader';
import { StudentWorkHeader } from '../Header/AssignmentHeader';



const SubmissionCard = ({item  , index, url})=>{

  const openInNewTab = (link) => {
    window.open(link, '_blank', 'noreferrer');
  };

  return (
    <>
      {
        (item.submissionStatus!==undefined) ? (
          <div className="w-48 h-48 border-2 bg-gray-600 cursor-pointer" onClick={()=>{openInNewTab(url)}} key={index}>
            {item.studentName}
            <span className='text-green-500'> Submitted </span>
          </div>
        ): (
          <div className="w-48 h-48 border-2 bg-gray-600" key={index}>
            {item.name}
            <span className='text-red-500'> Assigned </span>
          </div>
        )
      }
    </>
  )
}
const Studentwork = ({match}) => {
  const baseUrl = "http://localhost:3000/class"
  const history = useHistory();
  const dispatch = useDispatch();
  const alert = useAlert();

  const [checkboxValue , setCheckboxValue] = useState("All");
  const {
    error,
    loading,
    class: classData,
    assignment,
    submitted, notSubmitted
  } = useSelector((state) => state.class);
  const { loading: loading1, user } = useSelector((state) => state.user);
  const [filtered, setFiltered] = useState([])


  useEffect(() => {
    dispatch(getClass(match.params.classId,user)).then(()=>{
      dispatch(getAssignment(match.params.assignmentId,user._id)).then(()=>{
        dispatch(getSubmissions(match.params.assignmentId))
      })
    })
  }, [user]);

  useEffect(() => {
    if(submitted && notSubmitted){
      if(checkboxValue === "All"){
        setFiltered([...notSubmitted , ...submitted]);
      }else if(checkboxValue === "Submitted"){
        setFiltered([...submitted]);
      }
      else{
        setFiltered([...notSubmitted]);
      }
    }
    
  }, [checkboxValue,submitted, notSubmitted])
  

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
  return (
    <>
      {loading | !assignment | !submitted | !notSubmitted ? (
        <Loader />
      ) : (
        <>
          <StudentWorkHeader assignment={assignment} classData={classData} />
          <div className="">
            <Select
              value={checkboxValue}
              onChange={(e) => {
                setCheckboxValue(e.target.value);
              }}
            >
              <MenuItem value={"All"}>All</MenuItem>
              <MenuItem value={"Submitted"}>Submitted</MenuItem>
              <MenuItem value={"Assignemd"}>Assigned</MenuItem>
            </Select>
            {filtered.map((item, index) => (
              <SubmissionCard
                index={index}
                item={item}
                url={`${baseUrl}/${classData._id}/assignment/${assignment._id}/studentwork/${item._id}`}
              />
            ))}
          </div>
        </>
        
      )}
    </>
  );
}

export default Studentwork