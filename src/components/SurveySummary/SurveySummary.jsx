import React, { useEffect, useRef, } from "react";
import "./surveySummary.css";
import { useSelector } from "react-redux";
import { Chart } from "chart.js/auto";
import { useNavigate } from 'react-router-dom';


const SurveySummary = () => {
  const navigate = useNavigate()
  const questions = useSelector((state) => state.survey.questions);
  const userAnswers = useSelector((state) => state.survey.userAnswers);

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const score = questions.reduce((totalScore, question) => {
    if (userAnswers[question.id] === question.correctAnswer) {
      return totalScore + 1;
    }
    return totalScore;
  }, 0);

  const totalScore = questions.length;

  useEffect(() => {
    if (!questions || Object.keys(userAnswers).length === 0) {
      navigate("/");
   }

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const myChartRef = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(myChartRef, {
      type: "pie",
      data: {
        labels: ["Correct", "Incorrect"],
        datasets: [
          {
            data: [score, totalScore - score],
            backgroundColor: ["rgb(102, 255, 102)", "rgb(255, 80, 80)"],
          },
        ],
      },
    });
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);


  return (
    <div className="surveyResultContainer">
      <div className="surveyResultWrapper">
        <h1 className="surveyResultTitle">Result Page</h1>
        <p className="surveyResultScore">
          Your Score: {score} / {questions.length}
        </p>
        <h2 className="surveyResultAnswer">Answers:</h2>
        <ul className="surveyResultLists">
          {questions.map((question) => (
            <li key={question.id} className="surveyResultListItems">
              <div className="question-text">
                <h4>{question.text}</h4>
                <p className="answer-text">
                  Your Answer: {userAnswers[question.id]}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div
        className="surveyResult"
      >
        <h1 className="surveyResultTitle">Your Performance</h1>
        <canvas ref={chartRef} />
      </div>
    </div>
  );
};

export default SurveySummary;
