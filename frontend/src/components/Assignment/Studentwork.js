import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { clearErrors, getAssignment, getClass, submitAssignment, unsubmitAssignment } from '../../redux/actions/classAction';
import Loader from '../layout/Loader';
const Studentwork = ({match}) => {
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
  return (
    <>
    {loading | !assignment ? (
        <Loader />
      ) : (
        <div className=""> studentwork </div>
      )
    }
    </>
  )
}

export default Studentwork