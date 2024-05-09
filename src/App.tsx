import React, { useState } from 'react';
import './App.scss';
import FullScreenAgreement from './Components/FullScreenAgreement';
import ConsentForm from './Components/ConsentForm';
import BirthSelector from './Components/BirthSelector';
import QuizForm from './Components/QuizForm';
import { GameMessageType } from './enums/GameMessageType';
import SuspenceGame from './Components/SuspenseGame';

export const App: React.FC = () => {
  const [fullScreen, setFullScreen] = useState(false);
  const [consentFormAgreed, setConsentFormAgreed] = useState(false);
  const [birthOption, setBirthOption] = useState('');
  const [quizFormCompleted, setQuizFormCompleted] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState('');
  const [gameName, setGameName] = useState<GameMessageType>(GameMessageType.firstGame);
  const [userPointsSum, setUserPointsSum] = useState(0);

  return (
    <div className='todo_app'>
      {!fullScreen && (<FullScreenAgreement setFullScreen={setFullScreen} />)}
      {!consentFormAgreed && fullScreen && (<ConsentForm setConsentFormAgreed={setConsentFormAgreed}/>)}
      {!birthOption && consentFormAgreed && (<BirthSelector setBirthOption={setBirthOption}/>)}
      {!quizFormCompleted && birthOption && (<QuizForm 
        setQuizFormCompleted={setQuizFormCompleted}
        setGlobalUserName={setName}
        setGlobalUserAge={setAge}
        setGlobalUserGender={setGender}
      />)}
      {quizFormCompleted && gameName === GameMessageType.firstGame && (<SuspenceGame gameName={gameName} />)}
    </div>
  )
}

export default App;
