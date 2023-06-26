import React, { useState, useEffect, useContext} from 'react';
import { AuthContext } from '../theAuth/context';
import { useDispatch } from 'react-redux';
import { updateTimeLeft } from '../rtkSlices/stuexSlice';

const CountdownTimer = ({ timeLimit, onTimeExpired }) => {
  const dispatch = useDispatch()
  const {setTimeLeft} = useContext(AuthContext)
  const [timeRemaining, setTimeRemaining] = useState(timeLimit);
  const [shouldAlert, setShouldAlert] = useState(true)

  
  
  useEffect(() => {
    let timerId
    if (timeRemaining > 0) {
      setShouldAlert(true)
      timerId = setTimeout(async() => {
        await setTimeLeft(0)
        await setTimeLeft(timeRemaining-1)
        await setTimeRemaining((prevTimer) => prevTimer - 1);
        // setTimeLeft((prevTimer) => prevTimer - 1)
        
      }, 1000);
    } else {
      if(shouldAlert){
        alert('Your Time is Up!')
      }
      setTimeRemaining(timeRemaining)
      dispatch(updateTimeLeft(timeRemaining))
      onTimeExpired();
      
      return
    }
    return () => clearTimeout(timerId);
  }, [timeRemaining, onTimeExpired,shouldAlert]);

  
  

  

  const getTime=(timeRemaining1)=>{
    const minutes = Math.floor(timeRemaining1 / 60);
    const seconds = timeRemaining1 % 60;

    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  const handleSubmit =(e)=>{
    e.preventDefault();
    setShouldAlert(false)
    setTimeRemaining(0)
  }

  return (
    <div className='flex flex-row'>
      <p className='mt-2 mr-4 text-2xl text-white'>Time remaining: {getTime(timeRemaining)}</p>

       <button className='bg-blue-400 h-10 mt-1 px-4 rounded-xl text-white text-2xl' type='submit' form='news' onClick={handleSubmit}>
          Submit
        </button>
 
    </div>
 );
};

export default CountdownTimer;