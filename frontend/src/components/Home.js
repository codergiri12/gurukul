import React,{Fragment, useRef, useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './layout/Loader';
import Avatar from '@mui/material/Avatar';
import { FolderOpen, PermContactCalendar } from "@mui/icons-material";
import { Link, useHistory } from "react-router-dom";
import "../styles/Home.css";
import HomeHeader from './Header/HomeHeader';
import { clearErrors, loadUser } from '../redux/actions/userAction';
import { useAlert } from 'react-alert';

const ClassCard = ({ classData }) => {
  return (
    <li className="joined__list">
      <div className="joined__wrapper">
        <div className="joined__container">
          <div className="joined__imgWrapper" />
          <div className="joined__image" />
          <div className="joined__content">
            <Link className="joined__title" to={`/class/${classData._id}`}>
              <h2>{classData.className}</h2>
            </Link>
            <p className="joined__owner">{classData.ownerEmail}</p>
          </div>
        </div>
        <Avatar
          className="joined__avatar"
          src="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/s75-c-fbw=1/photo.jpg"
        />
      </div>
      <div className="joined__bottom">
        <PermContactCalendar />
        <FolderOpen />
      </div>
    </li>
  );
};

const Home = () => {
  const {user,loading,error} = useSelector((state)=>state.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if(!user)
      dispatch(loadUser());
  }, [user, dispatch])
  

  useEffect(() => {
    if (error) {
      alert.error(error);
      const x = error;
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);
  return (
    <Fragment>
      {
        loading ? <Loader /> : (
          <>
            <HomeHeader/>
            <div className='mt-16 ml-4'>
              {
                user.classes.map((classData,index)=>{
                  return (<ClassCard classData = {classData} key={index}/>);
                })
              }
            </div>
          </>
        )
      }
      
    </Fragment>
  )
}

export default Home