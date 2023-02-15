import React, { useEffect, useState } from 'react'
import { Avatar, Button, TextField } from "@mui/material";

import "../../styles/Class/Class.css"
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearErrors, createAssignment, getClass } from '../../redux/actions/classAction';
import Loader from '../layout/Loader';
import { loadUser } from '../../redux/actions/userAction';

const CreateAssignment = ({match}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const alert = useAlert();

  const {
    error,
    loading,
    class: classData,
    posts,
    isTeacher,
    success
  } = useSelector((state) => state.class);
  const { loading: loading1, user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getClass(match.params.id,user)).then(()=>{
      if(isTeacher){
        history.push("/");
      }
    })
  }, [user,dispatch]);
  
  useEffect(() => {
    if (error) {
      if (error === "Resource not found. Invalid: _id") {
        alert.error("Class not found");
        dispatch(clearErrors());
        history.push("/");
      } else {
        alert.error(error);
        dispatch(clearErrors());
      }
    }
  }, [dispatch, error, alert]);

  const [inputValue, setInput] = useState("");
  const [title , setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [points, setPoints] = useState(null);

  const handleChange = (e) => {
    if (e.target.files) {
      setImage(e.target.files);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title" , title);
    formData.append("description",inputValue);
    formData.append("points",points);
    for (let i = 0; i < image.length; i++) {
      formData.append('files', image[i]);
    }

    dispatch(createAssignment(formData, classData._id));
  };

  useEffect(() => {
    if(success){
      alert.success("Created Assignment successfully");
      history.push(`/class/${classData._id}`);
    }
  }, [success])
  
  return (
    <>
      {loading | loading1 ? (
        <Loader />
      ) : (
        <div className="main__announcements">
          <div className="main__announcementsWrapper">
            <div className="main__ancContent">
              <div className="main__form">
                <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title of Assignment</label>
                <input
                  type="text"
                  className ="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
                <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Points</label>
                <input
                  type="number"
                  className ="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={points}
                  onChange={(e) => {
                    setPoints(e.target.valueAsNumber);
                  }}
                />
                <TextField
                  id="filled-multiline-flexible"
                  multiline
                  label="Announce Something to class"
                  variant="filled"
                  value={inputValue}
                  onChange={(e) => setInput(e.target.value)}
                />
                <div className="main__buttons">
                  <input
                    onChange={handleChange}
                    variant="outlined"
                    color="primary"
                    type="file"
                    multiple
                  />

                  <div>
                    {/* <Button onClick={() => setShowInput(false)}>Cancel</Button> */}

                    <Button
                      onClick={handleUpload}
                      color="primary"
                      variant="contained"
                    >
                      Create Assignment
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateAssignment