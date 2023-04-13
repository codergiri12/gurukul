const { getExamResultAfterCompletion } = require("../controllers/exam");
const { ExamReport } = require("../models");

module.exports = function (server) {
  const io = require("socket.io")(server, { 
    cors: { origin: "http://localhost:3000" }
  });
  io.on("connection", (socket) => {
    console.log("New Connection");

    socket.on("get-remaining-time", ({clientUUID,duration}) => {
      console.log("emntererd");
      redisClient.get(clientUUID, (err, reply) => {
        if (err) {
          console.log("Redis error: ", err);
          socket.emit("getTimeRemainingError",err);
          return;
        } else if (reply === null) {
          const data = {duration , questions:{}};
          redisClient.set(uuid, JSON.stringify(data), (error) => {
            if (error) {
              console.error(error);
              socket.emit("error", "Failed to update remaining time");
              return;
            }
      
            // Send a success message back to the client
            socket.emit("set-remaining-time-success");
          });
          socket.emit("timeRemaining", data);
        } else {
          const timeRemaining = JSON.parse(reply);
          socket.emit("timeRemaining", timeRemaining);
        }
      });
      console.log("exited");
    });

    socket.on("set-remaining-time", async({reportId , timeRemaining})=>{
      await ExamReport.findByIdAndUpdate(reportId,{remainingTime : timeRemaining});
      socket.emit("set-remaining-time-success");
    });
    
    socket.on("set-option",async({reportId , question , option})=>{
      const optionKey = `selectedOptions.${question}`;
      await ExamReport.findByIdAndUpdate(reportId, {
        $set: { [optionKey]: option },
      });
      socket.emit("set-option-success");
    })

    socket.on("submit-exam",async (examReportId)=>{
      const data = await getExamResultAfterCompletion(examReportId);
      socket.emit("submit-exam-success",data);
    })
    socket.on("disconnect", () => {
      console.log("Client disconnected");

      // Delete the timer data for the client from Redis
    });
  });

  // put other things that use io here
};
