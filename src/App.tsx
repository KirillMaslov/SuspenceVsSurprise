import React, { useState } from 'react';
import './App.scss';
import FullScreenAgreement from './Components/FullScreenAgreement';
import ConsentForm from './Components/ConsentForm';
import BirthSelector from './Components/BirthSelector';
import QuizForm from './Components/QuizForm';
import { GameType } from './enums/GameType';
import SuspenceGame from './Components/SuspenseGame';
import { BirthConditionType } from './enums/BirthConditionType';

export const App: React.FC = () => {
  const [fullScreen, setFullScreen] = useState(false);
  const [consentFormAgreed, setConsentFormAgreed] = useState(false);
  const [birthOption, setBirthOption] = useState<BirthConditionType | null>(null);
  const [quizFormCompleted, setQuizFormCompleted] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState('');
  const [gameName, setGameName] = useState<GameType>(GameType.firstGame);

  // This states includes values that needs to be pushed to JATOS
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
      {quizFormCompleted && gameName === GameType.firstGame && (<SuspenceGame gameName={gameName} setNewGame={setGameName} condition={birthOption as BirthConditionType}  />)}
      {gameName === GameType.secondGame && (<SuspenceGame gameName={gameName} setNewGame={setGameName} condition={birthOption as BirthConditionType}  />)}
    </div>
  )
}

export default App;
