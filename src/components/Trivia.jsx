import { useState, useEffect } from "react"
import useSound from "use-sound"
import mainsong from '../assets/main.mp3'
import correct from '../assets/correct.mp3'
import wrong from '../assets/wrong.mp3'


export default function Trivia({
  data,
  setQuestionNumber,
  questionNumber,
  SetTimeStop
}) {
  const [question, setQuestion] = useState(null)
  const [selectedAnswer,setSelectedAnswer]=useState(null)
  const [makeClassName,setMakeClassName]=useState("answer")
  const [playMain,setPlayMain]=useSound(mainsong)
  const [playCorrect,setPlayCorrect]=useSound(correct)
  const [playWrong,setPlayWrong]=useSound(wrong)

  // useEffect(()=>{
  //   playMain()
  // },[playMain])


  useEffect(() => {
    setQuestion(data[questionNumber - 1])
  }, [data, questionNumber])

const delay=(duration,callback)=>{
  setTimeout(()=>{
    callback()
  },duration)
}

  const handleClick=(a)=>{
    setSelectedAnswer(a)
    setMakeClassName("answer active")
    delay(3000,()=>setMakeClassName(a.correct?"answer correct":"answer wrong"))
    delay(5000,()=>{
      if(a.correct){
        playCorrect()
        delay(1000,()=>{
          setQuestionNumber((prev)=>prev+1)
          setSelectedAnswer(null)
        })
      }else{
        playWrong()
        delay(1000,()=>{
          SetTimeStop(true)
        })
      }
    })
   
  }



  return (
    <div className="trivia">
      <div className="question">
        {question?.question}
      </div>
      <div className="answers"> 
        {question?.answers.map((a) => (
          <div key={a.id} className={selectedAnswer === a ? makeClassName:'answer'} onClick={()=>handleClick(a)}>{a.option}</div>
        ))}
      </div>
    </div>
  )
}
