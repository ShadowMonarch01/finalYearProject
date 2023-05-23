import React,{useState} from 'react'
import {read, utils } from 'xlsx'

const Upload = () => {

  const [state, setState] = useState({
    cCode: "",
    cTitle: ""
  });
  

  const handleInputChange = (event) => {
  const { name, value } = event.target;
  setState((prevProps) => ({
      ...prevProps,
      [name]: value
  }));
  };

  const handleFile = async(e)=>{
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    /* data is an ArrayBuffer */
    const wb = read(data);

    const ws = wb.Sheets[wb.SheetNames[0]]; // get the first worksheet
    const Ndata = utils.sheet_to_json(ws); // generate objects
    console.log(Ndata);
  }

  return (
    <div className='viewScreen'>
      {/* <h1>Parse XL</h1>

        <br/>

      <input type='file' onChange={(e)=>handleFile(e)}/> */}

      <div className=' w-full mx-10 my-10 grid grid-cols-3 gap-3'>
        <div className=' rounded h-40 bg-gray-300 p-2 col-span-1'>
          <p className='text-xl'>Excel File Format</p>
        </div>
        <div className=' rounded h-40 bg-gray-300 p-2 col-start-2 col-span-1'>
          <p className='text-xl'>First row of each column should be used to indicate what that column Contains</p>
        </div>
        <div className=' rounded h-40 bg-gray-300 p-2 col-start-3 col-span-1'>
          <p className='text-xl'>Each Question or Answer should take only one cell</p>
        </div>
        <div className=' rounded px-4 h-80 flex flex-col item-center justify-center  bg-gray-300 col-start-2'>
          {/* <input className='bg-red-500' type='file' onChange={(e)=>handleFile(e)} /> */}

          <input className='h-10 px-1 rounded' 
            type='text' 
            placeholder='Course Code'
            name="cCode" 
            value={state.cCode}
            onChange={handleInputChange}
          />
          <br/>
          <input className='h-10 px-1 rounded' 
            type='text' 
            placeholder='Course Title'
            name="cTitle" 
            value={state.cTitle}
            onChange={handleInputChange}
          />
          <br/>
          <div className="file-input">
            <input type="file" id="file" className="file" onChange={(e)=>handleFile(e)}/>
            <label htmlFor="file">Select file</label>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Upload;