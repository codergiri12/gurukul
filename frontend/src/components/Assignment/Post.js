import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { clearErrors, getClass, getPost } from '../../redux/actions/classAction';
import Loader from '../layout/Loader';

const Post = ({match}) => {

  const history = useHistory();
  const dispatch = useDispatch();
  const alert = useAlert();
  const {
    error,
    loading,
    class: classData,
    post
  } = useSelector((state) => state.class);
  const { loading: loading1, user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getClass(match.params.classId,user)).then(()=>{
      dispatch(getPost(match.params.postId));
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
      {(loading | !post) ? (
        <Loader />
      ) : (
        <>
          <div>
              {/* // TODO: create a component for below one.... */}
              <div className="amt" >
                <div className="amt__Cnt">
                  <div className="amt__top">
                    <div>{ (post.title === undefined ? "Post ": post.title)}</div>
                  </div>
                  <p className="amt__txt">{post.description}</p>
                  <p className="amt__txt">{post.postedBy.email}</p>
                </div>
              </div>
            
          </div>
        </>
      )}
    </>
  )
}

export default Post