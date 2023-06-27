import React,{useState, useLayoutEffect} from 'react'
import {read, utils } from 'xlsx'
import Select from 'react-select';

// const options = [
//   { id:1, value: 'Dr Charles', label: 'Dr Charles' },
//   { id:2, value: 'Engineer Ezekiel', label: 'Engineer Ezekiel' },
//   { id:3, value: 'Mr Tallent', label: 'Mr Tallent' },
// ];

const Upload = () => {

  const [state, setState] = useState({
    cCode: "",
    cTitle: ""
  });

  const [qandN, setQandN] = useState([])

  const [selectedOption, setSelectedOption] = useState(null);

  const [options, setOptions] = useState([])
  

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
    const chkName = e.target.files[0].name.toString();// file name
    const chkName2 = (chkName.replace(".xlsx","")).split('_')
    const Ndata = utils.sheet_to_json(ws); // generate objects
    let tempArr = [...Ndata]
    tempArr.forEach((element, index)=>{ 
      element.answer1 = ""
      element.autom = "f"
      element.admm = ""
      element.serialIndex = index + 1
    }) // add a key property for students answer
    setQandN(tempArr)
    setState({cCode:chkName2[1], cTitle:chkName2[0]})
    console.log(tempArr);
    console.log(`Tried getting sheet Name: ${state}`)
  }

  const getLecturers = async() =>{
    fetch('http://127.0.0.1:5000/getalllecturers',{
      method: 'GET',
          headers: {
            //Header Defination
            'Accept':'application/json',
            'Content-Type':'application/json',
          },
    })
    .then((response) => response.json())
          .then((response) => {
            
            if (response.status === 'Collection Successful') {
              // setResponse(response.status)
              let tempArray = [...response.adm_list]
              let tempArr2 = []

              for(let i =0; i < tempArray.length; i++){
                  tempArr2.push({ id:tempArray[i]._id, uid: tempArray[i].uid, value: tempArray[i].name, label: tempArray[i].name })
              }

              setOptions(tempArr2)

              // setState({cCode: "", cTitle: ""})
              // setQandN([]) 
              
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

  const handleFileUpload = async() => {
    // console.log('Time has expired!');
    fetch('http://127.0.0.1:5000/uploadquestions', {
          method: 'POST',
          headers: {
            //Header Defination
            'Accept':'application/json',
            'Content-Type':'application/json',
          },
          body: JSON.stringify({
            "course_code": state.cCode,
            "course_title": state.cTitle,
            "qandn": qandN,
            "lec_id":selectedOption.uid,
            "lec_name":selectedOption.value
          })
        })
          .then((response) => response.json())
          .then((response) => {
            
            if (response.status === 'Upload Successful!') {
              // setResponse(response.status)
              alert(response.status)
              setState({cCode: "", cTitle: ""})
              setSelectedOption(null)
              setQandN([]) 
              
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

  useLayoutEffect(()=>{
    getLecturers()
  },[])

  return (
    <div className='viewScreen'>

      <div className='flex flex-col w-full'>
        <div className='bg-red-200 w-full'>
          <div className='flex flex-wrap bg-slate-500'>
            <div className=' rounded h-40 bg-gray-300 p-2 w-64 m-4 flex-grow max-w-lg'>
              <p className='text-xl'>Excel File Format</p>
            </div>

            <div className=' rounded h-40 bg-gray-300 p-2 w-64 m-4 flex-grow max-w-lg'>
              <p className='text-xl'>First row of each column should be used to indicate what that column Contains</p>
            </div>

            <div className=' rounded h-40 bg-gray-300 p-2 w-64 m-4 flex-grow max-w-lg'>
              <p className='text-xl'>Each Question or Answer should take only one cell</p>
            </div>

            <div className=' rounded h-40 bg-gray-300 p-2 w-64 m-4 flex-grow max-w-lg'>
              <p className='text-xl'>The heading of each row should be in capital letters</p>
            </div>

          </div>
          {/*  */}
        </div>

        <div className='flex justify-center mt-4 h-96'>
          <div className=' rounded px-4 h-96 w-80 flex flex-col item-center justify-center  bg-gray-300'>
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
              <Select
                placeholder='Lecturer'
                defaultValue={selectedOption}
                onChange={(e)=>setSelectedOption(e)}
                options={options}
              />
              <br/>
              <div className="file-input">
                <input type="file" id="file" className="file" onChange={(e)=>{
                                                                            if(e?.target?.files.length >0){
                                                                                        handleFile(e)
                                                                            }
                                                                        }}/>
                <label htmlFor="file">Select file</label>
              </div>
              <br/>
              {
                selectedOption && state.cCode && state.cTitle ?
                  <button onClick={()=>{
                          if(state.cCode && state.cTitle && qandN.length > 0){
                            handleFileUpload()
                          }
                    }} className=' bg-gray-600 rounded h-12 pt-2.5 justify-center items-center'>
                  <p className='text-center font-bold text-white'>Submit file</p>
                </button>
                : null
              }

          </div>
        </div>
      </div>
      {/* <h1>Parse XL</h1>

        <br/>

      <input type='file' onChange={(e)=>handleFile(e)}/> */}


      {/* <div className=' w-full mx-10 my-10 grid grid-cols-3 gap-3'>
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
          <input className='bg-red-500' type='file' onChange={(e)=>handleFile(e)} />

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
            <input type="file" id="file" className="file" onChange={(e)=>{
                                                                        if(e?.target?.files.length >0){
                                                                                    handleFile(e)
                                                                        }
                                                                    }}/>
            <label htmlFor="file">Select file</label>
          </div>
          <br/>
          <button onClick={()=>{
                    if(state.cCode && state.cTitle && qandN.length > 0){
                      handleFileUpload()
                    }
              }} className='bg-gray-400 rounded'>
            <p className='text-center'>SUbmit file</p>
          </button>

        </div>
      </div> */}
    </div>
  )
}

export default Upload;