import { useEffect,useState } from "react"

export default function Timer({setTimeStop,questionNumber}) {
    const [clockTimer,setClockTimer]=useState(30)

    useEffect(() => {
        if(clockTimer===0) return setTimeStop(true)
      const interval=setInterval(()=>{
        setClockTimer((prev)=>prev-1)
      },1000)
      return ()=>clearInterval(interval)
    },[setTimeStop,clockTimer])
useEffect(()=>{
    setClockTimer(30)
},[questionNumber])
    
  return clockTimer
}
