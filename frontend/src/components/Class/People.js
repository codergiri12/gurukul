import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import { Link, useHistory } from "react-router-dom";
import { Box, Typography,Button, Avatar } from "@mui/material";
import { clearErrors, getClass } from "../../redux/actions/classAction";
import Loader from "../layout/Loader";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ClassHeader from "../Header/ClassHeader";
import MoreVertIcon from '@mui/icons-material/MoreVert';


const UserCard = ({userName,index})=>{
  return (
    <>
      <div className="flex justify-between hover:bg-gray-200 rounded-md">
      <div className="w-full px-4 py-2 flex items-center" index={index} >
      <Avatar />
      <span className="text-xl ml-4" >{userName}</span>
      </div>
      <Button sx={{borderRadius:"50%"}} >
      <MoreVertIcon />
      </Button>
      </div>
    </>
  );
}

const People = ({match}) => {

  const history = useHistory();
  const dispatch = useDispatch();
  const alert = useAlert();
  const {
    error,
    loading,
    class: classData,
    isTeacher
  } = useSelector((state) => state.class);
  const { loading: loading1, user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getClass(match.params.classId, user));
  }, [match , user]);
  return (
    <>
      {loading | !classData ? (
        <Loader />
      ) : (
        <>
          <ClassHeader classData={classData} current={"People"} />
          <div className="w-1/2 mx-auto mt-8">
            <div>
              <div className="flex justify-between border-2 border-white border-b-indigo-500">
                <div className="text-xl font-semibold">Teacher</div>
                <div className="">
                  <Button component="label" sx={{ borderRadius: "131px" }}>
                    <PersonAddAltIcon />
                  </Button>
                </div>
              </div>
              <div className="mt-4">
                <UserCard userName={classData.ownerId.name} />
              </div>
            </div>
            <div className="mt-4" >
              <div className="flex justify-between border-2 border-white border-b-indigo-500">
                <div className="text-xl font-semibold">Students</div>
                <div className="">
                  <Button component="label" sx={{ borderRadius: "131px" }}>
                    <PersonAddAltIcon />
                  </Button>
                </div>
              </div>
              <div className="mt-4">
                {
                  classData.students.map((student,index)=>{
                    return (
                      <UserCard userName={student.name} index={index} />
                    )
                  })
                }
                
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default People