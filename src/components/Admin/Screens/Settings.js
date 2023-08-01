import React,{useState} from 'react'
import Select from 'react-select';
const Settings = () => {

  const [selectedOption, setSelectedOption] = useState(null);

  const [options, setOptions] = useState([]);

  return (
    <div className='viewScreen'>
      <div className='bg-red-200 w-full'>
        <div className='flex flex-wrap bg-slate-500'>
          
          <div className=' rounded h-40 bg-gray-300 p-2 w-64 m-4 flex-grow'>
            <p className='text-xl'>Add Lecturer</p>
          </div>

          <div className=' rounded h-40 bg-gray-300 p-2 w-64 m-4 flex-grow'>
            <p className='text-xl'>Update Lecturer Status</p>
          </div>

          <div className=' rounded h-40 bg-gray-300 p-2 w-64 m-4 flex-grow'>
            <p className='text-xl'>Edit All User's Status</p>
          </div>

          {/* <div className=' rounded h-40 bg-gray-300 p-2 w-64 m-4 flex-grow'>
            <p className='text-xl'>Scores</p>
          </div>

          <div className=' rounded h-40 bg-gray-300 p-2 w-64 m-4 flex-grow'>
            <p className='text-xl'>Scores</p>
          </div>

          <div className=' rounded h-40 bg-gray-300 p-2 w-64 m-4 flex-grow'>
            <p className='text-xl'>Scores</p>
          </div>

          <div className=' rounded h-40 bg-gray-300 p-2 w-64 m-4 flex-grow'>
            <p className='text-xl'>Scores</p>
          </div> */}

          
        </div>
            
        {/*  */}
        <div className="form-popup" id="myForm">
              <form action="" className="form-container">
                  <h1>Add Admin</h1>

                  <label for="email"><b>Full Name</b></label>
                  <input type="text" placeholder="Enter Full Name" name="fname" required/>

                  <label form="email"><b>Email</b></label>
                  <input type="text" placeholder="Enter Email" name="email" required/>

                  <label form="psw"><b>Password</b></label>
                  <input type="password" placeholder="Enter Password" name="psw" required/>

                  <button type="submit" className="btn">Login</button>
                  <button type="button" className="btn cancel" onclick="closeForm()">Close</button>
              </form>

              <div class="form-container1">
                  <h1>Set Course</h1>

                  <Select
                    placeholder='Course'
                    defaultValue={selectedOption}
                    onChange={(e)=>setSelectedOption(e)}
                    options={options}
                    // styles={{}}
                    className='mt-1 mb-4'
                  />

                  <button type="submit" className="btn">Set Exam</button>
                  <button type="button" className="btn cancel" onclick="closeForm()">Close</button>
              </div>

              <div class="form-container2">
                  <h1>Lecturer Status</h1>

                  <Select
                    placeholder='Lecturer'
                    defaultValue={selectedOption}
                    onChange={(e)=>setSelectedOption(e)}
                    options={options}
                    // styles={{}}
                    className='mt-1 mb-4'
                  />

                  <Select
                    placeholder='Status'
                    defaultValue={selectedOption}
                    onChange={(e)=>setSelectedOption(e)}
                    options={options}
                    // styles={{}}
                    className='mt-1 mb-4'
                  />

                  <button type="submit" className="btn">Set Status</button>
                  <button type="button" className="btn cancel" onclick="closeForm()">Close</button>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Settings;