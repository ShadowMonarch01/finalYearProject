import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

const ALogin = () => {

    const navigate = useNavigate()
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
        navigate('/ahome');
        console.log(state)
      };

  return (
    <div className='authpg'>

        <form className='fromContainer' onSubmit={(event)=>{
                                                            event.preventDefault()
                                                            
                                                            // navigateHome()
                                                            }}>

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
                 type="password" 
                 placeholder="Enter Password" 
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

export default ALogin;