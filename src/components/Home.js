import React,{useState} from 'react';
import CountdownTimer from './CountdownTimer';
import '../App.css'

const Home = () => {

  const [state, setState] = useState({
    email: "",
    password: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const [response, setResponse] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value
    }));
  };

  const handleTimeExpired = async() => {
    // console.log('Time has expired!');
    fetch('http://127.0.0.1:5000/adduser', {
          method: 'POST',
          headers: {
            //Header Defination
            'Accept':'application/json',
            'Content-Type':'application/json',
          },
          body: JSON.stringify({
            "email": state.email,
            "password": state.password
          })
        })
          .then((response) => response.json())
          .then((response) => {
            
            if (response.status === 'Upload Successful!') {
              setResponse(response.status)
              thSubmit()
              
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

  
  const thSubmit = ()=>{
    console.log(state);
    setState({
      email: "",
      password: ""
    })
    setSubmitted(true)
  }


  return (
    <div className='bg-gray'>
      {submitted ?(
        <>
          <h2>Form submitted!</h2>
          <h3>{response}</h3>
        </>
      ):(
        <>
        <h1>Quiz</h1>
        <h1 className="text-3xl font-bold underline text-red-600">
      Hello world!
    </h1>

        <CountdownTimer 
          timeLimit={60} 
          onTimeExpired={handleTimeExpired} 
        />
        <form id='news' className='testForm' onSubmit={(event) => event.preventDefault()}>
            <div className="form-control">
              <label>Email</label>
              <input
                type="text"
                name="email"
                value={state.email}
                onChange={handleInputChange} />
            </div>
            <div className="form-control">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={state.password}
                onChange={handleInputChange} />
            </div>

          </form>
        </>
      )
      }

    </div>
  );
};

export default Home;
