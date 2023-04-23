import React, { useState } from "react";
import MathJax from "react-mathjax";
import {questions as data} from "./questions"
import CodingHeader from "../Header/CodingHeader";
import { Link } from "react-router-dom";

const CodingQuestion = ({match}) => {
  return (
    <MathJax.Provider>
      <div className="">
        <CodingHeader />
        <div className="h-4 w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"></div>
        <div className="">
          <div className="w-2/3 mx-auto">
            <div className="flex justify-between items-center text-4xl font-bold py-4 border-2 border-white border-b-black">
              <div className="">{data[match.params.id].title}</div>
              <Link to="/ide"
                className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Submit
              </Link>
            </div>
            <div className="flex justify-center my-4">
              <span className="font-semibold mx-2 underline">
                Time Limit : {data[match.params.id].timeLimit}
              </span>
              <span className="font-semibold mx-2 underline">
                Memory Limit : {data[match.params.id].memoryLimit}
              </span>
            </div>
            <div className="py-2">{data[match.params.id].component}</div>
          </div>
        </div>
      </div>
    </MathJax.Provider>
  );
}

export default CodingQuestion