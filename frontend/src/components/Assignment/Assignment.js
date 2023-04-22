import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { clearErrors, getAssignment, getClass, submitAssignment, unsubmitAssignment } from '../../redux/actions/classAction';
import Loader from '../layout/Loader';
import {Button} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CloseIcon from '@mui/icons-material/Close';
import '../../styles/Assignment.css'
import {AssignmentHeader} from '../Header/AssignmentHeader';
import FileButton from "../layout/File"

const File = ({name , index , handleDelete})=>{
  
  return (
    <div key={index} className="flex items-center border-2 border-black " >
      <code className="flex items-center text-xl mr-2 px-4 py-2" > {name} </code>
      <CloseIcon onClick = {()=>{handleDelete(index)}} className="cursor-pointer hover:text-red-500 mr-2" />
    </div>
  )
}

const Assignment = ({match}) => {

  const history = useHistory();
  const dispatch = useDispatch();
  const alert = useAlert();
  const {
    error,
    loading,
    class: classData,
    assignment,
    submission,
    isTeacher
  } = useSelector((state) => state.class);
  const { loading: loading1, user } = useSelector((state) => state.user);
  const [image, setImage] = useState(null);


  useEffect(() => {
    dispatch(getClass(match.params.classId,user)).then(()=>{
      console.log("id: " , match.params.assignmentId , "  ---" , user);
      dispatch(getAssignment(match.params.assignmentId,user._id));
    })
  }, [user,dispatch]);


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


  const handleChange = (e) => {
    if (e.target.files) {
      setImage(Array.from(e.target.files));
    }
  };

  const handleDelete = (index)=>{
    const cpy = [...image];
    cpy.splice(index,1);
    setImage(cpy);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("studentid" , user._id);
    if(image)
      for (let i = 0; i < image.length; i++) {
        formData.append('files', image[i]);
      }

    dispatch(submitAssignment(formData , assignment._id));
    setImage(null);
  };
  const handleUnSubmit = (e) => {
    e.preventDefault();
    dispatch(unsubmitAssignment(assignment._id , user._id));
  };

  const getLocalDate = (dt) =>{
    const date = new Date(dt);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }


  return (
    <>
      {loading | !assignment ? (
        <Loader />
      ) : (
        <>
          <AssignmentHeader classData={classData} assignment={assignment} />
          <div className="flex flex-row mt-4 justify-center">
            {/* // TODO: create a component for below one.... */}
            <div className=" w-2/3">
              <div className="amt__Cnt">
                <div className="amt__top text-4xl text-blue-500">
                  <AssignmentIcon fontSize='large' className="" />
                  <div>{assignment.title}</div>
                </div>
                <div className="flex items-center text-gray-500">
                  <p className="amt__txt">{assignment.postedBy.name}</p>
                  {"•"}
                  <p className="amt__txt">{getLocalDate(assignment.postedBy.createdAt)}</p>
                </div>
                <div className="amt__txt py-2 border-2 border-white border-b-blue-500">
                  {assignment.points} {" points"}
                </div>
                <p className="amt__txt">{assignment.description}</p>
                
              </div>

              <p className="text-2xl font-medium ml-4">Files: </p>
              <div className="flex flex-wrap justify-evenly items-center">
                {assignment.files.map((file) => (
                  <FileButton file={file} />
                ))}
              </div>
            </div>
            {!isTeacher && (
              <div className="pb-8 flex flex-col justify-between border border-2xl shadow-md shadow-gray-400 rounded-md">
                <div className="flex flex-row justify-center items-center gap-x-2 py-4 px-3">
                  <a className="text-2xl ">Your work</a>
                  <a className="text-sm">Handed on time</a>
                </div>
                {submission ? (
                  <div className="flex flex-col justify-center  px-4  gap-y-4">
                    <div className="flex items-center justify-center w-full ">
                      <div className="w-full">
                        {submission.files.map((file, index) => (
                          <FileButton file={file} className="w-full my-2" />
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-row justify-center">
                      <Button
                        className=""
                        variant="contained"
                        component="label"
                        onClick={handleUnSubmit}
                      >
                        UnSubmit
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-4 items-center justify-center order-last ">
                    <div className="flex items-center justify-center w-full">
                      {image?.length ? (
                        <div>
                          {image.map((file, index) => (
                            <File
                              index={index}
                              name={file.name}
                              handleDelete={handleDelete}
                            />
                          ))}
                        </div>
                      ) : (
                        <Button variant="contained" component="label">
                          <AddIcon />
                          Upload Submission
                          <input
                            hidden
                            multiple
                            type="file"
                            onChange={handleChange}
                          />
                        </Button>
                      )}
                    </div>
                    <Button
                      variant="contained"
                      component="label"
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Assignment