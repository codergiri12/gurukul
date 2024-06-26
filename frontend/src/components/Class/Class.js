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
import AddIcon from '@mui/icons-material/Add';
import "../../styles/Class/Class.css";
import ClassHeader from "../Header/ClassHeader";

const Class = ({ match }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const alert = useAlert();
  const {
    successMessage,
    error,
    loading,
    class: classData,
    posts,
    isTeacher
  } = useSelector((state) => state.class);
  const { loading: loading1, user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getClass(match.params.id,user)).then(()=>{
      dispatch(getPostsAndAssignments(match.params.id));
    })

  }, [user,dispatch]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      const x = error;
      dispatch(clearErrors());
      if (x === "Class not found") {
        history.push("/");
      } 
      // else {
      //   alert.error(error);
      //   dispatch(clearErrors());
      //   history.push(`/class/${match.params.id}`)
      // }
    }
  }, [dispatch, error, alert]);

  useEffect(() => {
    if (successMessage) {
      alert.success(successMessage);
      dispatch(clearErrors());
    }
  }, [dispatch, successMessage, alert]);

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
      {loading | loading1 | (classData === undefined) ? (
        <Loader />
      ) : (
        <>
          <ClassHeader classData={classData} current={"Stream"} />
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
                {isTeacher && (
                  <div className="h-16 flex flex-row">
                    <button
                      type="button"
                      class="flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-lg px-4 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={() => {
                        history.push(
                          `/class/${classData._id}/createAssignment`
                        );
                      }}
                    >
                      <AddIcon />
                      Assignment
                    </button>
                  </div>
                )}

                <div className="main__announcements">
                  <div className="main__announcementsWrapper">
                    <div className="main__ancContent">
                      {showInput ? (
                        <div className="main__form ">
                          <ReactQuill
                            id=""
                            className="pb-8 w-full h-48 px-2"
                            multiline
                            label="Announce Something to class"
                            variant="filled"
                            theme="snow"
                            value={inputValue}
                            onChange={setInput}
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
                          <div className="cursor-pointer">
                            Announce Something to class
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <Announcement data={classData} />
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
