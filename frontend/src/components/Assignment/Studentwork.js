import { Avatar, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { clearErrors, getAssignment, getClass, getSubmissions, submitAssignment, unsubmitAssignment } from '../../redux/actions/classAction';
import Loader from '../layout/Loader';
import { StudentWorkHeader } from '../Header/AssignmentHeader';
import AssignmentIcon from '@mui/icons-material/Assignment';



const SubmissionCard = ({item  , index, url})=>{

  const openInNewTab = (link) => {
    window.open(link, '_blank', 'noreferrer');
  };

  return (
    <>
      {
        (item.submissionStatus!==undefined) ? (
          <div className="p-4 rounded-md border-2 bg-gray-200 cursor-pointer flex flex-col items-center " onClick={()=>{openInNewTab(url)}} key={index}>
            <div className="flex flex-row text-xl items-center mb-4">
              <Avatar />
            <div className="ml-4">
              {item.studentName}
            </div>
            </div>
            <span className='text-green-500'> Submitted </span>
          </div>
        ): (
          <div className="p-4 rounded-md border-2 bg-gray-200 flex flex-col items-center " key={index}>
            <div className="flex flex-row text-xl items-center mb-4">
              <Avatar />
            <div className="ml-4">
              {item.name}
            </div>
            </div>
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

  const getLocalDate = (dt) =>{
    const date = new Date(dt);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  return (
    <>
      {loading | !assignment | !submitted | !notSubmitted ? (
        <Loader />
      ) : (
        <>
          <StudentWorkHeader assignment={assignment} classData={classData} />

          <div className="mt-4">
            <div className="amt__Cnt">
              <div className="amt__top text-4xl text-blue-500">
                <AssignmentIcon fontSize="large" className="" />
                <div>{assignment.title}</div>
              </div>
              <div className="flex items-center text-gray-500">
                <p className="amt__txt">{user.name}</p>
                {"•"}
                <p className="amt__txt">
                  {getLocalDate(assignment.createdAt) }
                  {/* {assignment.createdAt} */}
                </p>
              </div>
              <div className="amt__txt py-2 border-2 border-white border-b-blue-500">
                {assignment.points} {" points"}
              </div>
            </div>
            <div className="px-4">
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
           <div className="flex flex-wrap justify-start gap-x-4 mt-4">
           {filtered.map((item, index) => (
              <SubmissionCard
                index={index}
                item={item}
                url={`${baseUrl}/${classData._id}/assignment/${assignment._id}/studentwork/${item._id}`}
              />
            ))}
           </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Studentwork