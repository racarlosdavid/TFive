import React, { useState, useEffect } from 'react';
import "./styles.css";
import Navbar from '../../Home/Navbar';
import useSound from 'use-sound';
import soundfx from './sounds/BellTransition.mp3';

function PomodoroApp() {
  const [play] = useSound(soundfx);
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);
  const [countdownType, setcountdownType] = useState('');
  const [memory, setMemory] = useState([]);
  const [start, setStart] = useState(Date.now());
  const [init_time, setInit_time] = useState(0);
  const [log,setLog] = useState({
    type: '',
    date: '',
    start: '', 
    end: ''
  });

  const types = {
    pomodoro: 'Pomodoro (25 min)',
    short_break: 'Descanso Corto (5 min)',
    long_break: 'Descanso Largo (15 min)'
  }

  useEffect(()=>{
    const pomodoroSaved = sessionStorage.getItem("pomodoro") === null ? [] : JSON.parse(sessionStorage.getItem("pomodoro"));
    //console.log(pomodoroSaved)
    setMemory(pomodoroSaved);
  },[])

  useEffect(()=>{
    sessionStorage.setItem("pomodoro", JSON.stringify(memory));
  },[memory])

  useEffect(() => {
    let interval = null;
    if (time !== 0 && isActive) {
      interval = setInterval(() => {
        /*
        //const minutes = parseInt(time / 60,10)
        //const seconds = parseInt(time % 60,10)
        //const m = minutes < 10 ? "0" + minutes : minutes ;
        //const s = seconds < 10 ? "0" + seconds : seconds ;
        //setDisplayTime(`${m}:${s}`)
        */
       //console.log(start)
       //console.log(init_time)
        let delta = Date.now() - start; // milliseconds elapsed since start
        let delta_t = Math.floor(delta / 1000);
        setTime(init_time-delta_t);
      },1000);
      /*
      interval = setInterval(() => {
        const minutes = parseInt(((time / 60000) % 60),10)
        const seconds = parseInt(((time / 1000) % 60),10)
        const mseconds = parseInt(((time / 10) % 100),10)
        const m = minutes < 10 ? "0" + minutes : minutes ;
        const s = seconds < 10 ? "0" + seconds : seconds ;
        const milis = mseconds < 10 ? "0" + mseconds : mseconds ;
        setDisplayTime(`${m}:${s}:${milis}`)
        setTime((time) => time-10);
      },10);
      */
    } else if (time === 0 && isActive){ 
      //console.log('Countdown finalizado')
      //setLog({...log,end:getCurrentTime()}) <- is hago esto no actualiza el log
      setMemory(memory => [...memory,{...log,end:getCurrentTime()}])
      setTime(0);
      setIsActive(false)
      setcountdownType('')
      play()
      clearInterval(interval);
      
      //pomodoroSaved.push(log)
      //sessionStorage.setItem("pomodoro", pomodoroSaved);
      //sessionStorage.setItem("pomodoro", JSON.stringify(memory));
      //sessionStorage.setItem("pomodoros", memory);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive,time,init_time,start,log,play]);

  function getCurrentTime(){
    const date =  new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const h = hours < 10 ? "0" + hours : hours ;
    const m = minutes < 10 ? "0" + minutes : minutes ;
    const s = seconds < 10 ? "0" + seconds : seconds ;
    return `${h}:${m}:${s}`
  }

  function getCurrentDate(){
    const date =  new Date();
    return `${date.toDateString()}`
  }

  function startCountdown(task_time,task_type){ 
    setIsActive(true)
    setTime(task_time*60)
    setInit_time(task_time*60)
    setStart(Date.now())
    setcountdownType(task_type)
    setLog({
      ...log,
      type: task_type,
      date: getCurrentDate(),
      start: getCurrentTime(),
    })
  }

  return (
    <>
      <Navbar></Navbar>
      <div className="d-flex justify-content-center">
        <div className="form-group col-md-7">

            <div className="container">
              <div className="d-flex justify-content-center">
                <div>
                  <h1 className="text-danger">
                    {`${countdownType}`}
                  </h1>
                </div>
                <br></br>
              </div>
            </div>
            
            <div className="container">
              <div className="d-flex justify-content-center">
                <div>
                  <h1 className="text-danger">
                    {time === 0 ? '' : `${parseInt(time / 60,10) < 10 ? "0" + parseInt(time / 60,10) : parseInt(time / 60,10)}:${parseInt(time % 60,10) < 10 ? "0" + parseInt(time % 60,10) : parseInt(time % 60,10)}`}
                  </h1>
                </div>
              </div>
            </div>
            <br></br>
            
{/** */}
<div className="container-fluid">
  <div className="row justify-content-around">
    <div className="col-4">
      <div className="card" >
        <img className="img-fluid" 
          src={`${process.env.PUBLIC_URL}/Cards/25min.png`} 
          alt="25min" onClick={() => countdownType === "" ? startCountdown(25,types.pomodoro) : false}
        />
      </div>
    </div>
    <div className="col-4">
      <div className="card" >
        <img className="img-fluid" 
          src={`${process.env.PUBLIC_URL}/Cards/5min.png`} 
          alt="5min" onClick={() => countdownType === "" ? startCountdown(5,types.pomodoro) : false}
        />
      </div>
    </div>
    <div className="col-4">
      <div className="card" >
        <img className="img-fluid" 
          src={`${process.env.PUBLIC_URL}/Cards/15min.png`} 
          alt="15min" onClick={() => countdownType === "" ? startCountdown(15,types.pomodoro) : false}
        />
      </div>
    </div>
  </div>

 
</div>
{/** */}
           
            <br></br>
            {memory.length > 0 ?

            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Type</th>
                  <th scope="col">Date</th>
                  <th scope="col">Start</th>
                  <th scope="col">End</th>
                </tr>
              </thead>
              <tbody>
                { memory.map((data,index) => (   
                  <tr key={index+1}>
                    <th scope="row">{index+1}</th>
                    <td>{data.type}</td>
                    <td>{data.date}</td>
                    <td>{data.start}</td>
                    <td>{data.end}</td>
                  </tr>
                )) }
              </tbody>
            </table>
            : null 
            }
        </div>
      </div>
      <div>
     
      
   
    </div>
    </>
    
  );
}

export default PomodoroApp;
