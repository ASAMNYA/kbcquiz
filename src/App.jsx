import { useEffect, useMemo, useState } from 'react';
import './app.css'
import Trivia from './components/Trivia';
import Timer from './components/Timer';
import Start from './components/Start';
import qdata from './data';

function App() {
  const [username,setUsername]=useState(null)
  const [questionNumber, setQuestionNumber] = useState(1)
  const [timeStop,SetTimeStop]=useState(false)
  const [earned,setEarned]=useState("$ 0")

  const moneyPyramid = useMemo(()=>
    [
      { id: 1, amount: '$100' },
      { id: 2, amount: '$200' },
      { id: 3, amount: '$300' },
      { id: 4, amount: '$400' },
      { id: 5, amount: '$500' },
      { id: 6, amount: '$1,000' },
      { id: 7, amount: '$2,000' },
      { id: 8, amount: '$4,000' },
      { id: 9, amount: '$8,000' },
      { id: 10, amount: '$16,000' },
      { id: 11, amount: '$50,000' },
      { id: 12, amount: '$100,000' },
    ].reverse(),
  []) 
  useEffect(() => {
    questionNumber>1 && setEarned(
      moneyPyramid.find(m=>m.id === questionNumber-1).amount)
  }, [moneyPyramid,questionNumber])
  
  return (
    <div className="app">
      {username ? (
      <>
       <div className="main">
        {timeStop ? <h1 className='endText'>You Lose! Git Gud.You Earned {earned }</h1>: (
        <>
          <div className="top">
          
          <div className="timer">
            <Timer setTimeStop={SetTimeStop} questionNumber={questionNumber} />
          </div>
        </div>
        <div className="bottom">
          <Trivia data={qdata}
          SetTimeStop={SetTimeStop} 
          questionNumber={questionNumber}
          setQuestionNumber={setQuestionNumber}
          />
        </div>
        </>
        )}
      
      </div>
      <div className="pyramid">
        <ul className="moneyList">
          {moneyPyramid.map((m) => (
            <li className={questionNumber === m.id ? "moneyListItem active" : "moneyListItem"} key={m.id}>
              <span className="moneyListItemNumber">{m.id}</span>
              <span className="moneyListItemAmount">{m.amount}</span>
            </li>
          ))}

        </ul>
      </div>
      </>
      ): <Start setUsername={setUsername}/> }
     
    </div>
  );
}

export default App;
