import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getPostsAndAssignments } from "../../redux/actions/classAction";
import "../../styles/Class/Announcement.css"
import Loader from "../layout/Loader";
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link } from "react-router-dom";

const Post = ({item,id})=>{
  return (
    <div className="amt" key={id}>
      <div className="amt__Cnt">
        <div className="amt__top">
          <Avatar />
          <div>{item.postedBy.email}</div>
        </div>
        <p className="amt__txt">{item.description}</p>
        {/* TODO: add files viewer */}
      </div>
    </div>
  );
}
const Assignment = ({item,index})=>{
  return (
    <Link key={index} to={`/class/${item.classId}/assignment/${item._id}`}>
      <div className="amt" >
        <div className="amt__Cnt">
          <div className="amt__top">
            <AssignmentIcon />
            <div>{`${item.postedBy.email} posted a new Assignment - ${item.title}`}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
const Announcement = ({data}) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const {class:classData , loading,posts , success} = useSelector((state) => state.class);
  const [announcment, setAnnouncment] = useState([]);

  useEffect(() => {
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