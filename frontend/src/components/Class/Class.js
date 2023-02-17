import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { clearErrors, createPost, getClass, getPostsAndAssignments } from "../../redux/actions/classAction";
import Loader from "../layout/Loader";
import { Avatar, Button, TextField } from "@mui/material";
import Announcement from "./Announcement";
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';

import "../../styles/Class/Class.css";

const Class = ({ match }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const alert = useAlert();
  const {
    error,
    loading,
    class: classData,
    posts
  } = useSelector((state) => state.class);
  const { loading: loading1, user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getClass(match.params.id,user)).then(()=>{
      dispatch(getPostsAndAssignments(match.params.id));
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
        history.push(`/class/${match.params.id}`)
      }
    }
  }, [dispatch, error, alert]);

  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInput] = useState("");
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    if (e.target.files) {
      setImage(e.target.files);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("description",inputValue);
    formData.append("postedBy" , user._id);
    if(image)
      for (let i = 0; i < image.length; i++) {
        formData.append('files', image[i]);
      }

    dispatch(createPost(formData, classData._id)).then(()=>{
      dispatch(getPostsAndAssignments(match.params.id));
    })

    setInput("");setImage(null);setShowInput(false);
  };

  return (
    <>
      {((loading | loading1) | (classData===undefined)) ? (
        <Loader />
      ) : (
        <>
          <div className="main">
            <div className="main__wrapper">
              <div className="main__content">
                <div className="main__wrapper1">
                  <div className="main__bgImage">
                    <div className="main__emptyStyles" />
                  </div>
                  <div className="main__text">
                    <h1 className="main__heading main__overflow">
                      {classData.className}
                    </h1>
                    <div className="main__section main__overflow">
                      {classData.section}
                    </div>
                    <div className="main__wrapper2">
                      <em className="main__code">Class Code :</em>
                      <div className="main__id">{classData.classCode}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="main__announce">
                <div className="main__status">
                  <p>Upcoming</p>
                  <p className="main__subText">No work due</p>
                </div>
                <div className="main__announcements">
                  <div className="main__announcementsWrapper">
                    <div className="main__ancContent">
                      {showInput ? (
                        <div className="main__form ">
                          {/* <TextField
                            
                            value={inputValue}
                            onChange={(e) => setInput(e.target.value)}
                          /> */}
                          <ReactQuill
                          id=""
                          className="pb-8 w-full h-48 px-2"
                          multiline
                          label="Announce Something to class"
                          variant="filled"
                          theme="snow" value={inputValue}  onChange={(e) => setInput(e.target.value)}
                          />
                          <div className="main__buttons ">
                            <input
                              onChange={handleChange}
                              variant="outlined"
                              color="primary"
                              type="file"
                              multiple
                            />

                            <div>
                              <Button onClick={() => setShowInput(false)}>
                                Cancel
                              </Button>

                              <Button
                                onClick={handleUpload}
                                color="primary"
                                variant="contained"
                              >
                                Post
                              </Button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="main__wrapper100"
                          onClick={() => setShowInput(true)}
                        >
                          <Avatar />
                          <div className="cursor-pointer" >Announce Something to class</div>
                        </div>
                      )}
                    </div>
                  </div>
                  <Announcement data = {classData} />
                </div>
              </div>
            </div>
          </div>




       
        </>
      )}
    </>
  );
};

export default Class;
