import { createSlice } from "@reduxjs/toolkit";
import questionsData from "../Questionsdata";

const initialState = {
    questions: questionsData,
    currentQuestionIndex: 0,
    userAnswers: {},
    submitted: false,
  };

  const surveySlice = createSlice({
    name: 'survey',
    initialState,
    reducers: {
      answerQuestion: (state, action) => {
        const { questionId, selectedOption } = action.payload;
        state.userAnswers[questionId] = selectedOption;
      },
      nextQuestion: (state) => {
        state.currentQuestionIndex+=2;
      },
      submitSurvey: (state) => {
        state.submitted = true;
      },
      resetSurvey: (state) => {
        state.currentQuestionIndex = 0;
        state.userAnswers = {};
        state.submitted = false;
      },
    },
  });

  const surveyReducer = surveySlice.reducer
export const { answerQuestion, nextQuestion, resetSurvey , submitSurvey} = surveySlice.actions;
export default surveyReducer;