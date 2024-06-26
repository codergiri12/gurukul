import React, { useEffect, useState } from "react";
import { Login, Home , ClassHeader, Class , CreateAssignment, Assignment, Post, Studentwork, StudentWorkDetails,NotFound, Exams, Exam, StudentExam, Ide, People, Grades, CodingQuestion, CodingQuestions } from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {ProtectedRoute}  from "./routes/Routes";
import store from "./redux/store/store"
import { loadUser } from "./redux/actions/userAction";
import "./App.css"
function App() {

  useEffect(() => {
    console.log("----------------FNNNNNNSSSSSSSS----------------")
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Switch>  
      <Route exact path="/login" component={Login}  />
      <Route exact path="/ide" component={Ide}  />
      <Route exact path="/coding" component={CodingQuestions}  />
      <Route exact path="/coding/:id" component={CodingQuestion}  />
      <ProtectedRoute exact path="/class/:classId/assignment/:assignmentId/studentwork" component={Studentwork} />
        <ProtectedRoute exact path="/class/:classId/assignment/:assignmentId/studentwork/:submissionId" component={StudentWorkDetails} />
        <ProtectedRoute exact path="/class/:classId/assignment/:assignmentId" component={Assignment} />
        <ProtectedRoute exact path="/class/:classId/exams" component={Exams} />
        <ProtectedRoute exact path="/class/:classId/people" component={People} />
        <ProtectedRoute exact path="/class/:classId/grades" component={Grades} />
        <ProtectedRoute exact path="/class/:classId/exam/:examId" component={Exam} />
        <ProtectedRoute exact path="/class/:classId/takeExam/:examId" component={StudentExam} />
        <ProtectedRoute exact path="/class/:id/createAssignment" component={CreateAssignment} />
        <ProtectedRoute exact path="/class/:id" component={Class} />
        <ProtectedRoute exact path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;