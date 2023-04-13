import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { clearErrors, getAssignment, getClass, submitAssignment, unsubmitAssignment } from '../../redux/actions/classAction';
import Loader from '../layout/Loader';
import {Button} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import '../../styles/Assignment.css'
import {AssignmentHeader} from '../Header/AssignmentHeader';
const File = ({name , index , handleDelete})=>{
  
  return (
    <div key={index} className="flex items-center border-2 border-black " >
      <code className="flex items-center text-xl mr-2 px-4 py-2" > {name} </code>
      <CloseIcon onClick = {()=>{handleDelete(index)}} className="cursor-pointer hover:text-red-500 mr-2" />
    </div>
  )
}
const SubmittedFile = ({name , index })=>{
  
  return (
    <div key={index} className="flex items-center border-2 border-black " >
      <code className="flex items-center text-xl mr-2 px-4 py-2" > {name} </code>
    </div>
  )
}

const fileUrl = "http://localhost:4000/api/v1/class/file";

const Assignment = ({match}) => {

  const history = useHistory();
  const dispatch = useDispatch();
  const alert = useAlert();
  const {
    error,
    loading,
    class: classData,
    assignment,
    submission
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

  const openInNewTab = (link) => {
    window.open(link, '_blank', 'noreferrer');
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

  return (
    <>
      {loading | !assignment ? (
        <Loader />
      ) : (
        <>
          <AssignmentHeader classData={classData} assignment={assignment} />
          <div className="flex flex-row mt-16 gap-x-10">
            {/* // TODO: create a component for below one.... */}
            <div className="amt w-2/3">
              <div className="amt__Cnt border border-2xl ">
                <div className="amt__top text-4xl">
                  <div>{assignment.title}</div>
                </div>
                <p className="amt__txt">{assignment.description}</p>
                <p className="amt__txt">{assignment._id}</p>
                <p className="amt__txt">{assignment.postedBy.email}</p>
              </div>

              <p className="text-2xl font-medium ml-4">Files: </p>
              <div className="flex flex-wrap justify-evenly items-center">
                {assignment.files.map((file) => (
                  <div
                    className="cursor-pointer border border-2 border-black w-1/3"
                    onClick={() => {
                      openInNewTab(fileUrl + "/" + file.fileName);
                    }}
                  >
                    {file.originalName}
                  </div>
                ))}
              </div>
            </div>
            <div className="border border-2xl shadow-md shadow-gray-400 rounded-md">
              <div className="flex flex-row justify-center items-center gap-x-2 py-4 px-3">
                <a className="text-2xl ">Your work</a>
                <a className="text-sm">Handed on time</a>
              </div>
              {submission ? (
                <div className="flex flex-col justify-center  px-4  gap-y-4">
                  <div className="flex items-center justify-center w-full ">
                    <div className="w-full">
                      {submission.files.map((file, index) => (
                        <SubmittedFile
                          index={index}
                          name={file.originalName}
                          className="gap-y-4 "
                        />
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
                <div className="flex items-center justify-center ">
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
          </div>
          <div>
            <Link
              className="underline text-blue-600"
              to={`/class/${classData._id}/assignment/${assignment._id}/studentwork`}
            >
              Student Work
            </Link>
          </div>
        </>
      )}
    </>
  );
}

export default Assignment