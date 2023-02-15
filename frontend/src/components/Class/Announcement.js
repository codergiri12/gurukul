import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getPostsAndAssignments } from "../../redux/actions/classAction";
import "../../styles/Class/Announcement.css"
import Loader from "../layout/Loader";
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
            {announcment.map((item,id) => (
              // TODO: create a component for below one....
              <div className="amt" key={id}>
                <div className="amt__Cnt">
                  <div className="amt__top">
                    <Avatar />
                    <div>{ (item.title === undefined ? "Post ": item.title)}</div>
                  </div>
                  <p className="amt__txt">{item.description}</p>
                  <p className="amt__txt">{item.postedBy.email}</p>
                  {/* <img
                    className="amt__img"
                    src={item.imageUrl}
                    alt={item.text}
                  /> */}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Announcement;