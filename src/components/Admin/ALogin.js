import React,{useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../theAuth/context';

const ALogin = () => {

    const navigate = useNavigate()

    const {setAdmDet} = useContext(AuthContext)
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

    const Authenticate = async() =>{

        fetch('http://127.0.0.1:5000/admlogin', {
            method: 'POST',
            headers: {
              //Header Defination
              'Accept':'application/json',
              'Content-Type':'application/json',
            },
            body: JSON.stringify({
              "user_name": state.uname,
              "user_psw": state.psw,
            })
          })
          .then((response) => response.json())
          .then((response) => {
            
            if (response.status === 'User Authenticated') {

                setAdmDet(response.user_det)
              // setResponse(response.status)
            //   alert(response.status)
            //   setState({cCode: "", cTitle: ""})
            //   setQandN([])
                navigateHome()
              
            } else {  
              alert(response.status)
              console.log(response.status)              
            }
          })
          .catch((error) => {
            alert(error)
            console.error(error);
            
          });
    }

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
                <button className='lgBtn' type="submit" onClick={()=>Authenticate()}>Login</button>
            </div>
        </form>
    </div>
  )
}

export default ALogin;