import React, { useState, useEffect, useContext} from "react";
import "./Student.css";
import CountdownTimer from "../CountdownTimer";
// import { PadData } from "../PData";
import { AuthContext } from "../../theAuth/context";
import { useNavigate } from "react-router-dom"

// Adding Redux
import { useSelector, useDispatch } from "react-redux";
import { selectAllQuestions } from "../../rtkSlices/stuexSlice";
import { addANswer } from "../../rtkSlices/stuexSlice";
import { original, current } from "@reduxjs/toolkit";

const SExam = () => {

  // Applying Redux
  const dispatch = useDispatch()
  const Questions = useSelector(selectAllQuestions);
  const {stuName, stuMatNo, course_code, course_title, timeLeft1, qns} = useSelector((state)=>state.student)

  const navigate = useNavigate();
  const { studentName, matNo, fetchedScript, setFetchedScript, exmLoggedIn, setExmLoggedIn, scriptCridentials, setScriptCridentials, timeLeft, setTimeLeft } = useContext(AuthContext);

  const [tData, setTData] = useState([...Questions]);
  // const [todosPerPage, setTodosPerPage] = useState(1)
  const [currentPage, setCurrentPage] = useState(1);

  // const [course, setCourse] = useState({course_code:"", course_title:""});


  const numOfTotalPages = Math.ceil(Questions.length / 1);
  const pages = [...Array(numOfTotalPages + 1).keys()].slice(1);

  
  useEffect(() => {
    const interval = setInterval(()=>{
      // let Checker = [...current(qns)]
      // console.log(current(qns))
      fetch('http://127.0.0.1:5000/updatescript', {
          method: 'POST',
          headers: {
            //Header Defination
            'Accept':'application/json',
            'Content-Type':'application/json',
          },
          body: JSON.stringify({
            "name": stuName,
            "mat_no": stuMatNo,
            "stuqandn": Questions,
            "course_code":course_code,
            "course_title":course_title,
            "timeLeft":timeLeft
          })
        })
          .then((response) => response.json())
          .then((response) => {
            
            if (response.status === 'Upload Successful!') {
              console.log('Hi')
              // navigate('/slogin')
              // setResponse(response.status)
              // thSubmit()
              
            } else {  
              alert(response.status)
              console.log(response.status)              
            }
          })
          .catch((error) => {
            alert(error)
            console.error(error);
            
          });
    }, 2000);

    return () => clearInterval(interval)
  }, []);

  const prevHandler = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextHandler = () => {
    if (currentPage !== numOfTotalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // const handleInputChange = (event, idx) => {
  //   // const value = event;

  //   let tempData = [...tData];
  //   tData[idx].answer1 = event;
  //   setTData(tempData);

  //   console.log("Temp Data");
  //   console.log(tempData);

  //   console.log("Set Data");
  //   console.log(tData);
  // };


  const handleTimeExpired = async() => {
    console.log('Time has expired!');
    fetch('http://127.0.0.1:5000/submitexam', {
          method: 'POST',
          headers: {
            //Header Defination
            'Accept':'application/json',
            'Content-Type':'application/json',
          },
          body: JSON.stringify({
            "name": stuName,
            "mat_no": stuMatNo,
            "stuqandn": Questions,
            "course_code":course_code,
            "course_title":course_title,
            "timeLeft":timeLeft1
          })
        })
          .then((response) => response.json())
          .then((response) => {
            
            if (response.status === 'Upload Successful!') {
              // setExmLoggedIn(false)
              navigate('/slogin')
              // setResponse(response.status)
              // thSubmit()
              
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

  return (
    <div className="eXcontainer">
      <div className="justify-between pt-3 header">
        <div className="flex flex-row">
          <div className="mx-10 text-2xl text-white">
            <p>{stuName}</p>
            <p>{stuMatNo}</p>
          </div>

          <div className="mx-10 text-2xl text-white">
            <p>{course_code}: {course_title}</p>
          </div>
        </div>

        <div className="mr-10">
          <CountdownTimer timeLimit={timeLeft} onTimeExpired={handleTimeExpired} />
        </div>
      </div>

      <div className="body">
        {/* <div className='flex flex-row w-full'> */}
        <div className="flex items-center mr-8 ">
          <button
            className="w-16 h-16 text-white bg-blue-400 rounded-full"
            onClick={prevHandler}
            docume
          >
            <h1>{`<`}</h1>
          </button>
        </div>

        <div className="flex flex-col items-center qContainer">
          <div className="w-4/5 p-2 mt-4 overflow-y-scroll bg-white h-44">
            {<p>{Questions[currentPage - 1]?.QUESTION}</p>}
          </div>

          <div className="w-4/5 mt-4 bg-white h-1/4">
            <textarea
              onInput={(e) =>{
                dispatch(addANswer({aIndex:currentPage - 1,stuAnswer: e.target.value}))
                // handleInputChange(e.target.value, )
              }}
              placeholder="Answer"
              className="w-full p-1"
              rows={5}
              name="answer"
              id="answer"
              value={Questions[currentPage - 1]?.answer1}
              // ref={inputRef}
            ></textarea>
          </div>
        </div>

        <div className="flex items-center ml-8 ">
          <button
            className="w-16 h-16 text-white bg-blue-400 rounded-full"
            onClick={nextHandler}
          >
            <h1 className="">{`>`}</h1>
          </button>
        </div>
        {/* </div> */}
      </div>

      <div className="flex justify-center footer">
        {/* Footer */}

        <div className="mt-2 paginationWidth">
          <nav className="block">
            <ul className="flex flex-wrap pl-0 list-none rounded">
              <li>
                {pages.map((page, index) => (
                  <span
                    key={index}
                    onClick={() => {
                      setCurrentPage(page);
                    }}
                    // href='#'
                    className={
                      currentPage === page
                        ? "bg-blue-400 border-red-300 text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                        : "bg-white border-gray-300 text-gray-500 hover:bg-blue-200 relative inline-flex items-center px-4 py-2 border text-sm font-medium pgBtnSpacing"
                    }
                  >
                    {page}
                  </span>
                ))}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SExam;