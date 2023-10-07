import React from 'react';
import "./surveyQuestions.css";
import { useSelector, useDispatch } from 'react-redux';
import { answerQuestion, nextQuestion, submitSurvey } from '../../redux/surveySlice';
import { useNavigate } from 'react-router-dom';

const SurveyQuestions = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
     const questions = useSelector((state) => state.survey.questions);
     const currentQuestionIndex = useSelector((state) => state.survey.currentQuestionIndex);
     const userAnswers = useSelector((state) => state.survey.userAnswers);
     const submitted = useSelector((state) => state.survey.submitted);

     const handleOptionSelect = (questionId, selectedOption) => {
        dispatch(answerQuestion({ questionId, selectedOption }));
      };
    
      const handleNextOrSubmitClick = () => {
        if (currentQuestionIndex === questions.length - 2 && !submitted) {
          const unansweredQuestions = questions.slice(currentQuestionIndex, currentQuestionIndex + 2).filter(question => !userAnswers[question.id]);
          if (unansweredQuestions.length === 0) {
            dispatch(submitSurvey());
            navigate("/results");
          } else {
            alert("Please answer all questions before submitting.");
          }
        } else {
          dispatch(nextQuestion());
        }
      };
    
      const isLastQuestion = currentQuestionIndex === questions.length - 1;
  return (
        <div className='surveyContainer'>
      <h1 className='surveyTitle'>Survey App - Test</h1>
      {questions.slice(currentQuestionIndex, currentQuestionIndex + 2).map((question) => (
        <div key={question.id} className='surveyQuestionsBox'>
          <h3 className='surveyQuestions'>{question.text}</h3>
          <ul className='surveyQuestionsList'>
            {question.options.map((option) => (
              <li key={option} className='surveyQuestionsListItems'>
                <label>
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option}
                    onChange={() => handleOptionSelect(question.id, option)}
                    checked={userAnswers[question.id] === option}
                    className='surveyQuestionsInput'
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button 
      className='surveyQuestionsButton' 
      onClick={handleNextOrSubmitClick} 
      disabled={!userAnswers[questions[currentQuestionIndex].id] || !userAnswers[questions[currentQuestionIndex + 1].id]}>
        {currentQuestionIndex === questions.length - 2 ? 'Submit' : 'Next'}
      </button>
    </div>
  )
}

export default SurveyQuestions