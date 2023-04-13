import React from "react";
import { Link } from "react-router-dom";

const ShowScore = ({ exam,score }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      <h2 className="text-lg font-medium mb-4">Score: </h2>
      <p className="font-medium text-2xl mb-6">{score}</p>
      <Link
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
        to={`/class/${exam.classId}`}
      >
        Back to Class
      </Link>
    </div>
  );
};

export default ShowScore;