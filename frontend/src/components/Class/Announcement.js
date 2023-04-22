import { Avatar, Box, IconButton, Modal, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { deleteAssignment, deletePost, editAssignment, editPost, getPostsAndAssignments } from "../../redux/actions/classAction";
import "../../styles/Class/Announcement.css"
import Loader from "../layout/Loader";
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link } from "react-router-dom";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Button,Menu,MenuItem,Fade} from '@mui/material';
import ReactQuill from "react-quill";
import File from "../layout/File";


const fileUrl = "http://localhost:4000/api/v1/class/file";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  borderRadius: 2,
  pt: 2,
  px: 4,
  pb: 3,
};

const MenuDots = ({item}) =>{
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [editPostModal, setEditPostModal] = useState(false);
  const open = Boolean(anchorEl);
  const [inputValue, setInput] = useState(item.description);
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    if (e.target.files) {
      setImage(e.target.files);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseModal = () => {
    
  };
  const handleEdit = ()=>{
    handleClose();
    setEditPostModal(true);
  }
  const handleUpdatePost = (e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("description",inputValue);
    // formData.append("dueDate" , expiry);
    if(image)
      for (let i = 0; i < image.length; i++) {
        formData.append('files', image[i]);
      }
      
    dispatch(editPost(formData, item._id)).then(()=>{
      dispatch(getPostsAndAssignments(item.classId));
    })

    setInput("");setImage(null);
    setEditPostModal(false);
  }
  const handleDeletePost = (e)=>{
    e.preventDefault();
    
    dispatch(deletePost(item.classId,item._id)).then(()=>{
      dispatch(getPostsAndAssignments(item.classId));
    })

    handleClose();
  }

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Options">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDeletePost}>Delete</MenuItem>
      </Menu>

      <Modal
        open={editPostModal}
        onClose={() => {
          setEditPostModal(false);
          handleCloseModal();
        }}
        className="authentication-modal"
      >
        <Box sx={style}>
          <div class="relative w-full h-full max-w-md md:h-auto">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                class="absolute top-0 right-0 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-hide="authentication-modal"
                onClick={() => {
                  setEditPostModal(false);
                  handleCloseModal();
                }}
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
              <div className="main__form ">
                <p className="text-2xl font-medium ml-4 mb-4" >Update Post </p>
                <ReactQuill
                  id=""
                  className="pb-8 w-full px-2"
                  multiline
                  label="Announce Something to class"
                  variant="filled"
                  theme="snow"
                  value={inputValue}
                  onChange={setInput}
                />
                {/* <div class="flex items-center justify-center">
                  <div
                    data-te-datepicker-init
                    data-te-input-wrapper-init
                  >
                    <label
                      for="floatingInput"
                      class="pblock mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Due Date
                    </label>
                    <input
                      type="date"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Select a date"
                      value={new Date(expiry).toISOString().slice(0,10)}
                      onChange={(e) => {
                        setExpiry(e.target.value);
                      }}
                    />
                  </div>
                </div> */}
                <div className="main__buttons ">
                  <input
                    onChange={handleChange}
                    variant="outlined"
                    color="primary"
                    type="file"
                    multiple
                  />

                  <div>
                    <Button
                      onClick={handleUpdatePost}
                      color="primary"
                      variant="contained"
                    >
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
const MenuDotsForAssignment = ({item}) =>{
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [editPostModal, setEditPostModal] = useState(false);
  const open = Boolean(anchorEl);
  const [inputValue, setInput] = useState(item.description);
  const [oldFiles, setOldFiles] = useState([]);
  const [image, setImage] = useState(null);
  const [title , setTitle] = useState(item.title);
  const [points, setPoints] = useState(item.points);
  const [expiry, setExpiry] = useState((item.dueDate)?item.dueDate:new Date());

  const handleChange = (e) => {
    if (e.target.files) {
      setImage(e.target.files);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseModal = () => {
    
  };
  const handleEdit = ()=>{
    handleClose();
    setEditPostModal(true);
  }
  const handleUpdatePost = (e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("description",inputValue);
    formData.append("title",title);
    formData.append("points",points);
    formData.append("dueDate" , expiry);
    if(image)
      for (let i = 0; i < image.length; i++) {
        formData.append('files', image[i]);
      }
      
    dispatch(editAssignment(formData, item._id)).then(()=>{
      dispatch(getPostsAndAssignments(item.classId));
    })

    setInput("");setImage(null);setExpiry(new Date());
    setTitle("");setPoints(null);
    setEditPostModal(false);
  }
  const handleDeletePost = (e)=>{
    e.preventDefault();
    
    dispatch(deleteAssignment(item.classId,item._id)).then(()=>{
      dispatch(getPostsAndAssignments(item.classId));
    })

    handleClose();
  }

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Options">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDeletePost}>Delete</MenuItem>
      </Menu>

      <Modal
        open={editPostModal}
        onClose={() => {
          setEditPostModal(false);
          handleCloseModal();
        }}
        className="authentication-modal"
      >
        <Box sx={style}>
          <div class="relative w-full h-full max-w-md md:h-auto">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                class="absolute top-0 right-0 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-hide="authentication-modal"
                onClick={() => {
                  setEditPostModal(false);
                  handleCloseModal();
                }}
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
              <div className="main__form ">
                <p className="text-2xl font-medium ml-4 mb-4 text-underline" >Update Assignment </p>

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
                <ReactQuill
                  id=""
                  className="pb-8 w-full px-2"
                  multiline
                  label="Announce Something to class"
                  variant="filled"
                  theme="snow"
                  value={inputValue}
                  onChange={setInput}
                />
                <div class="flex items-center justify-center">
                  <div
                    data-te-datepicker-init
                    data-te-input-wrapper-init
                  >
                    <label
                      for="floatingInput"
                      class="pblock mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Due Date
                    </label>
                    <input
                      type="date"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Select a date"
                      value={new Date(expiry).toISOString().slice(0,10)}
                      onChange={(e) => {
                        setExpiry(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="main__buttons ">
                  <input
                    onChange={handleChange}
                    variant="outlined"
                    color="primary"
                    type="file"
                    multiple
                  />

                  <div>
                    <Button
                      onClick={handleUpdatePost}
                      color="primary"
                      variant="contained"
                    >
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

const Post = ({item,id})=>{
  const openInNewTab = (link) => {
    window.open(link, '_blank', 'noreferrer');
  };


  return (
    <div className="amt" key={id}>
      <div className="amt__Cnt">
        <div className="flex flex-wrap justify-between">
          <div className="amt__top">
            <Avatar />
            <div>{item.postedBy.email}</div>
          </div>
          <MenuDots item={item} />
        </div>
        <div className="amt__txt"><div dangerouslySetInnerHTML={{ __html: item.description }} /></div>
        <div className="pl-4 flex flex-wrap justify-start items-center">
          {
            item.files.map(file=>(
              <File file={file} className="mr-4" />
            ))
          }
        </div>
      </div>
    </div>
  );
}

const Assignment = ({item,index})=>{
  return (
    
      <div className="amt" >
        <div className="amt__Cnt">
          <div className="flex flex-wrap justify-between">
            <div className="amt__top">
              <Link className="flex flex-wrap" key={index} to={`/class/${item.classId}/assignment/${item._id}`}>
                <AssignmentIcon />
                <div>{`${item.postedBy.email} posted a new Assignment - ${item.title}`}</div>
              </Link>
            </div>
            <MenuDotsForAssignment item={item} />
          </div>
        </div>
      </div>
    
  );
}
const Announcement = ({data}) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const {class:classData , loading,posts , success} = useSelector((state) => state.class);
  const [announcment, setAnnouncment] = useState([]);

  useEffect(() => {
    console.log("posts changed")
    setAnnouncment(posts);
  }, [posts]);

  useEffect(() => {
    if(success){
      alert.success("Post added successfully");
    }
  }, [success]);
  
  console.log(announcment);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div>
            {announcment.map((item,id) =>{
              if(item.title){
                return <Assignment item={item} index = {id} />
              }else{
                return <Post item={item} id = {id} />
              }
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Announcement;