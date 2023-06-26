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

    const fetchExamScripts =()=>{
      dispatch(fetchExamQns(stuMatNo))
        // fetch('http://127.0.0.1:5000/getquestions', {
        //   method: 'POST',
        //   headers: {
        //     //Header Defination
        //     'Accept':'application/json',
        //     'Content-Type':'application/json',
        //   },
        //   body: JSON.stringify({
        //     "mat_no": state.psw,
        //   })
        // })
        // .then((response) => response.json())
        // .then((response) => {
        // if(response.status === 'Collection Successful!'){
        //     setFetchedScript([...response.qns.qandn]);
        //     setScriptCridentials({course_title:response.qns.course_title, course_code:response.qns.course_code})
        //     setStudentName(state.uname)
        //     setMatNo(state.psw)
        //     setExmLoggedIn(true)
        //     navigateHome()
        // }
        // else if(response.status === 'Collection loaded'){
        //     setFetchedScript([...response.qns.qandn]);
        //     setScriptCridentials({course_title:response.qns.course_title, course_code:response.qns.course_code})
        //     setStudentName(response.qns.name)
        //     setMatNo(response.qns.mat_no)
        //     setTimeLeft(response.qns.timeLeft)
        //     setExmLoggedIn(true)
        //     navigateHome()
        // }
        // })
        // .catch((error) => {
        //         alert(error)
        //         console.error(error);
        //     });
    }

    if(!loading && qns.length && loggedIn){
      navigate('/sexam');
    }
    // const navigateHome = () => {
    //     // 👇️ navigate to /
    //     navigate('/sexam');
    //     console.log(state)
    //   };

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
                  dispatch(addName({name:e.target.value}))
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
                  dispatch(addMatNo({mat_no: e.target.value}))
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