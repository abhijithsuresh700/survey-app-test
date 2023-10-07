import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import SurveyQuestions from './components/SurveyQuestions/SurveyQuestions'
import SurveySummary from './components/SurveySummary/SurveySummary'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<SurveyQuestions/>}/>
      <Route path='/results' element={<SurveySummary/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
