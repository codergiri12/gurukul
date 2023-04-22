import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import { Link, useHistory } from "react-router-dom";
import { Box, Typography,Button, Avatar } from "@mui/material";
import { clearErrors, getClass, getGrades } from "../../redux/actions/classAction";
import Loader from "../layout/Loader";
import ClassHeader from "../Header/ClassHeader";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AssignmentIcon from '@mui/icons-material/Assignment';

const Grades = ({match}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const alert = useAlert();
  const {
    error,
    loading,
    class: classData,
    isTeacher,
    grades
  } = useSelector((state) => state.class);
  const { loading: loading1, user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getClass(match.params.classId, user)).then(()=>{
      dispatch(getGrades(match.params.classId));
    })
  }, [match , user]);
  return (
    <>
      {loading | !classData | !grades ? (
        <Loader />
      ) : (
        <>
          <ClassHeader classData={classData} current={"Grades"} />
          <div className="w-4/5 mx-auto mt-8">
            <div className="flex flex-col">
              <div className="flex justify-start border-2 border-white border-b-indigo-500 pb-4">
                <div className="">
                  <Button component="label" sx={{ borderRadius: "131px" }}>
                    <AssignmentIcon />
                  </Button>
                </div>
                <div className="text-xl font-semibold">Assignments</div>
              </div>
              <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="whitespace-nowrap bg-white sticky left-0 px-6 py-4 border-r border-gray-300 font-semibold text-left">
                        Student Name
                      </th>
                      {classData.assignments.map((assignment,index) => (
                        <th key={index} className="px-4 py-2">
                          <span className="whitespace-nowrap font-semibold" >
                          {assignment.title}
                          </span>
                          <br />
                          <span className="whitespace-nowrap text-gray-500 text-sm font-normal" >
                          {`out of ${assignment.points}`}
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(grades.assignmentGrades).map(([name, grades]) => (
                      <tr key={name}>
                        <td className="sticky left-0 border px-4 py-2 bg-white flex items-center text-lg"><Avatar /> <span className="ml-4" > {name} </span> </td>
                        {classData.assignments.map((assignment,index) => (
                          <td key={index} className={`border px-4 py-2 ${grades[assignment._id] && "font-semibold text-green-500"}`}>
                            {grades[assignment._id] ? grades[assignment._id] : `0`}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex flex-col mt-16">
              <div className="flex justify-start border-2 border-white border-b-indigo-500 pb-4">
                <div className="">
                  <Button component="label" sx={{ borderRadius: "131px" }}>
                    <AssignmentIcon />
                  </Button>
                </div>
                <div className="text-xl font-semibold">Exams</div>
              </div>
              <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="whitespace-nowrap bg-white sticky left-0 px-6 py-4 border-r border-gray-300 font-semibold text-left">
                        Student Name
                      </th>
                      {classData.exams.map((exam,index) => (
                        <th key={index} className="px-4 py-2">
                          <span className="whitespace-nowrap font-semibold" >
                          {exam.name}
                          </span>
                          <br />
                          <span className="whitespace-nowrap text-gray-500 text-sm font-normal" >
                          {`out of ${exam.totalMarks}`}
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(grades.examGrades).map(([name, grades]) => (
                      <tr key={name}>
                        <td className="sticky left-0 border px-4 py-2 bg-white flex items-center text-lg"><Avatar /> <span className="ml-4" > {name} </span> </td>
                        {classData.exams.map((exam,index) => (
                          <td key={index} className={`border px-4 py-2 ${grades[exam._id] && "font-semibold text-green-500"}`}>
                            {grades[exam._id] ? grades[exam._id] : `0`}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Grades