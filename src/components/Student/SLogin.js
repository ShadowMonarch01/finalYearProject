import React,{useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../theAuth/context';

const SLogin = () => {
    const navigate = useNavigate()

    const {setStudentName,setMatNo} = useContext(AuthContext)

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

    const navigateHome = () => {
        // 👇️ navigate to /
        setStudentName(state.uname)
        setMatNo(state.psw)
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
                 onChange={handleInputChange}
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
                 onChange={handleInputChange}
                 required
                />
            </div>

            <div className='subDiv'>
                <button className='lgBtn' type="submit" onClick={()=>navigateHome()}>Login</button>
            </div>
        </form>
    </div>
  )
}

export default SLogin