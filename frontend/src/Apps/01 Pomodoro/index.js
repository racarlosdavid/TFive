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

  useEffect(() => {
    let interval = null;
    if (time !== 0 && isActive) {
      interval = setInterval(() => {
        /*
        const minutes = parseInt(time / 60,10)
        const seconds = parseInt(time % 60,10)
        const m = minutes < 10 ? "0" + minutes : minutes ;
        const s = seconds < 10 ? "0" + seconds : seconds ;
        setDisplayTime(`${m}:${s}`)
        */
        setTime((time) => --time);
      },800);
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
      
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive,time,log,play]);

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
            
            <div className="container">
              <div className="d-flex justify-content-around">
                <div className="card" >
                  <button type="button" disabled={ countdownType === "" ? false : true } className="btn btn-outline-success btn-lg" onClick={() => startCountdown(25,types.pomodoro)}>Pomodoro<br></br>(25min)</button>
                </div>
                <br></br>
                <div className="card" >
                  <button type="button" disabled={countdownType === "" ? false : true} className="btn btn-outline-info btn-lg" onClick={() => startCountdown(5,types.short_break)}>Descanso corto<br></br>(5min)</button>
                </div>
                <br></br>
                <div className="card" >
                  <button type="button" disabled={countdownType === "" ? false : true} className="btn btn-outline-info btn-lg" onClick={() => startCountdown(15,types.long_break)}>Descanso largo<br></br>(15min)</button>
                </div>
              </div>
            </div>
            <br></br>
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
        </div>
      </div>
      <div>
     
      
   
    </div>
    </>
    
  );
}

export default PomodoroApp;
