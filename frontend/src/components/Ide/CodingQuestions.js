import React from 'react'
import {topicsWithQuestions as topics} from "./questions"
import CodingHeader from '../Header/CodingHeader'
import { Link } from 'react-router-dom'
import CodingIcon from '@mui/icons-material/IntegrationInstructions';

const TopicComponent = ({topic,index})=>{
  console.log(topic);
  return (
    <>
      <div className="font-semibold text-2xl my-4 underline" key={index}>
        {" "}
        {topic.topicName}{" "}
      </div>
      <div className="">
        {topic.questions.map((question, index) => (
          <div
            className="py-2 hover:bg-gray-200 flex justify-between items-center rounded-lg hover:underline decoration-blue-500"
            key={index}
          >
            <Link to={`/coding/${question.indexInArray}`} className="">
              <CodingIcon fontSize="large" />
              <span className="text-lg ml-4 text-blue-500 font-semibold">
                {question.questionName}
              </span>
            </Link>
            <Link to={`/coding/${question.indexInArray}`}
              className="decoration-none text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Open
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
const CodingQuestions = () => {
  return (
    <div>
      <CodingHeader current="Coding" />
      <div className="h-4 w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"></div>

      <div className="">
        <div className="w-2/3 mx-auto">
          <div className="text-4xl font-bold py-4 border-2 border-white border-b-black">Problem set</div>
          <div className="py-2">
            {
              topics.map((topic,index)=>(
                <TopicComponent topic={topic} index={index} />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default CodingQuestions