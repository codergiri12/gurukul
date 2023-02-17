import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { clearErrors, getAssignment, getClass, submitAssignment, unsubmitAssignment } from '../../redux/actions/classAction';
import Loader from '../layout/Loader';
import {Button} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

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
      dispatch(getAssignment(match.params.assignmentId,user._id));
    })
  }, [user]);


  useEffect(() => {
    if (error) {
      alert.error(error);
      const x = error;
      dispatch(clearErrors());
      if (x === "Class not found") {
        history.push("/");
      }else if(x === 'Post not found'){
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

  return (
    <>
      {loading | !assignment ? (
        <Loader />
      ) : (
        <>
          <div>
            {/* // TODO: create a component for below one.... */}
            <div className="amt">
              <div className="amt__Cnt">
                <div className="amt__top">
                  <div>{assignment.title}</div>
                </div>
                <p className="amt__txt">{assignment.description}</p>
                <p className="amt__txt">{assignment._id}</p>
                <p className="amt__txt">{assignment.postedBy.email}</p>
              </div>
            </div>
            {(submission) ? (
              <div>
                <div className="flex items-center justify-center w-full">
                  <div>
                    {submission.files.map((file, index) => (
                      <SubmittedFile
                        index={index}
                        name={file.originalName}
                      />
                    ))}
                  </div>
                </div>
                <Button variant="contained" component="label" onClick = {handleUnSubmit}>
                  UnSubmit
                </Button>
              </div>
            ) : (
              <div>
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
                <Button variant="contained" component="label" onClick = {handleSubmit}>
                  Submit
                </Button>
              </div>
            )}
          </div>
          <div>
            <Link className = "underline text-blue-600" to={`/class/${classData._id}/assignment/${assignment._id}/studentwork`}>
              Student Work
            </Link>
          </div>
        </>
      )}
    </>
  );
}

export default Assignment