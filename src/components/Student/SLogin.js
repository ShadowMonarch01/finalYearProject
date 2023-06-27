import React,{useState, useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../theAuth/context';

// Adding redux
import { fetchExamQns } from '../../rtkSlices/stuexSlice';
import { useSelector, useDispatch } from 'react-redux';

import { addName, addMatNo } from '../../rtkSlices/stuexSlice';

const SLogin = () => {

    const dispatch = useDispatch()
    const {stuMatNo, loading, error, loggedIn,qns} = useSelector((state) => state.student);

    const navigate = useNavigate()
    const {setStudentName,setMatNo, fetchedScript, setFetchedScript, exmLoggedIn, setExmLoggedIn, scriptCridentials, setScriptCridentials, timeLeft, setTimeLeft} = useContext(AuthContext)

    useEffect(()=>{
        // setExmLoggedIn((prev)=>!prev)
        console.log('Login for exam')
    },[])

    const [state, setState] = useState({
        uname: "",
        psw: ""
      });
    
    const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
        ...prevProps,
        [name]: value
    }));
    };

    // Random number function
    const randomStepper =(maxNr)=>{
      let haveIt = []
  
      function generateUniqueRandom(maxNr) {
          //Generate random number
          let random = (Math.floor(Math.random() * maxNr) + 1).toFixed();
  
          //Coerce to number by boxing
          random = Number(random);
  
          if(!haveIt.includes(random)) {
              haveIt.push(random);
              return random;
          } else {
              if(haveIt.length < maxNr ) {
              //Recursively generate number
              return  generateUniqueRandom(maxNr);
              } else {
              console.log('No more numbers available.')
              return false;
             }
          }
      }
  
      for(let i = 0; i<maxNr; i++){
          generateUniqueRandom(maxNr)
      }
  
      return haveIt;
  }

    const fetchExamScripts =()=>{
        fetch('http://127.0.0.1:5000/getquestions', {
          method: 'POST',
          headers: {
            //Header Defination
            'Accept':'application/json',
            'Content-Type':'application/json',
          },
          body: JSON.stringify({
            "mat_no": state.psw,
          })
        })
        .then((response) => response.json())
        .then((response) => {
        if(response.status === 'Collection Successful!'){
            
            setScriptCridentials({course_title:response.qns.course_title, course_code:response.qns.course_code})
            setStudentName(state.uname)
            setMatNo(state.psw)
            setExmLoggedIn(true)

            // get random numbers for the questions
            let randomArr = [...randomStepper(response.qns.qandn.length)]

            //  create a temporaty array
            let tempArrQuestions = [...response.qns.qandn]

            //  map the questions to the random numbers
            for(let i =0; i < tempArrQuestions.length; i++){
                tempArrQuestions[i]["randq"] = randomArr[i]
            }
            // sort the array in order of the random number
            tempArrQuestions.sort(function(a, b){
                return a.randq - b.randq
            })

            setFetchedScript([...tempArrQuestions]);
            
            navigateHome()
        }
        else if(response.status === 'Collection loaded'){
            setFetchedScript([...response.qns.qandn]);
            setScriptCridentials({course_title:response.qns.course_title, course_code:response.qns.course_code})
            setStudentName(response.qns.name)
            setMatNo(response.qns.mat_no)
            setTimeLeft(response.qns.timeLeft)
            setExmLoggedIn(true)
            navigateHome()
        }
        })
        .catch((error) => {
                alert(error)
                console.error(error);
            });
    }

    if(!loading && qns.length && loggedIn){
      navigate('/sexam');
    }
    const navigateHome = () => {
        // 👇️ navigate to /
        navigate('/sexam');
        console.log(state)
      };

  return (
    <div className='authpg'>

        <form className='fromContainer' onSubmit={(event)=>{
                                                            event.preventDefault()
                                                            
                                                            // navigateHome()
                                                            }}>
            <h3>Student Exam Portal</h3>

            <div className='colDiv'>
                <label htmlFor="uname"><b>Username</b></label>
                <input type="text" 
                 placeholder="Enter Username" 
                 name="uname" 
                 value={state.uname}
                 onChange={(e)=>{
                  // dispatch(addName({name:e.target.value}))
                  handleInputChange(e)
                 }}
                 required
                />
            </div>

            <div className='colDiv'>
                <label htmlFor="psw"><b>Password</b></label>
                <input 
                 type="text" 
                 placeholder="Mat.No" 
                 name="psw"
                 value={state.psw}
                 onChange={(e)=>{
                  // dispatch(addMatNo({mat_no: e.target.value}))
                  handleInputChange(e)
                 }}
                 required
                />
            </div>

            <div className='subDiv'>
                <button className='lgBtn' type="submit" onClick={()=>fetchExamScripts()}>Login</button>
            </div>
        </form>
    </div>
  )
}

export default SLogin