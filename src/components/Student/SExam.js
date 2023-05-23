import React, { useState, useEffect, useContext} from "react";
import "./Student.css";
import CountdownTimer from "../CountdownTimer";
import { PadData } from "../PData";
import { AuthContext } from "../../theAuth/context";

const SExam = () => {
  const [tData, setTData] = useState([]);
  // const [todosPerPage, setTodosPerPage] = useState(1)
  const [currentPage, setCurrentPage] = useState(1);

  const { studentName, matNo } = useContext(AuthContext);

  const numOfTotalPages = Math.ceil(tData.length / 1);
  const pages = [...Array(numOfTotalPages + 1).keys()].slice(1);

  useEffect(() => {
    setTData([...PadData]);
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

  const handleInputChange = (event, idx) => {
    // const value = event;

    let tempData = [...tData];
    tData[idx].answer = event;
    setTData(tempData);

    console.log("Temp Data");
    console.log(tempData);

    console.log("Set Data");
    console.log(tData);
  };

  return (
    <div className="eXcontainer">
      <div className="justify-between pt-3 header">
        <div className="flex flex-row">
          <div className="mx-10 text-2xl text-white">
            <p>{studentName}</p>
            <p>{matNo}</p>
          </div>

          <div className="mx-10 text-2xl text-white">
            <p>Course</p>
          </div>
        </div>

        <div className="mr-10">
          <CountdownTimer timeLimit={800} />
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
            {<p>{tData[currentPage - 1]?.question}</p>}
          </div>

          <div className="w-4/5 mt-4 bg-white h-1/4">
            <textarea
              onInput={(e) =>
                handleInputChange(e.target.value, currentPage - 1)
              }
              placeholder="Answer"
              className="w-full p-1"
              rows={5}
              name="answer"
              id="answer"
              value={tData[currentPage - 1]?.answer}
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