import React,{useState, useContext} from 'react'
import '../../Admin.css'
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { AuthContext } from '../../../../theAuth/context';

const ExamScript =()=> {

  const {stuScripts,stuIdx, setStuScripts} =useContext(AuthContext)

  const [all_Students_Array, set_All_Students_Array] = useState([...stuScripts])
  const [single_Student_Script, set_Single_Student_Script] = useState([...stuScripts[stuIdx].qandn])

  // Question currently being viewed
  const [vQuestion, setVQuestion] = useState(0)

  const [isCorrect, setIsCorrect] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);

  const nextQuestion =()=>{
    let max = single_Student_Script.length
    if(vQuestion < max - 1){
      setVQuestion((prev)=> prev + 1)
      setIsCorrect(false)
      setIsIncorrect(false)
    }
  }

  const prevQuestion =()=>{
    if(vQuestion > 0){
      setVQuestion((prev)=> prev - 1)
      setIsCorrect(false)
      setIsIncorrect(false)
    }
  }


  const changeMArk = (value, qIdx)=>{
    let temForMarking = [...single_Student_Script]

    let tempAllStudents = [...all_Students_Array]

    if(value === true){
      temForMarking[qIdx].admm = 't'
      temForMarking[qIdx].autom = 't'

      for(let i = 0; i < tempAllStudents.length; i++){
        if(tempAllStudents[i].qandn[qIdx].answer1 === temForMarking[qIdx].answer1){
          tempAllStudents[i].qandn[qIdx].admm = 't'
          tempAllStudents[i].qandn[qIdx].autom = 't'
        }
      }
    } else if(value === false){
      temForMarking[qIdx].admm = 'f'
      temForMarking[qIdx].autom = 'f'

      for(let i = 0; i < tempAllStudents.length; i++){
        if(tempAllStudents[i].qandn[qIdx].answer1.toUpperCase() === temForMarking[qIdx].answer1.toUpperCase()){
          tempAllStudents[i].qandn[qIdx].admm = 'f'
          tempAllStudents[i].qandn[qIdx].autom = 'f'
        }
      }
    }
    // set_Single_Student_Script(temForMarking)

    tempAllStudents[qIdx].qandn = temForMarking

    setStuScripts(tempAllStudents)
    
    // single_Student_Script[vQuestion].answer1
}

  // correct
  const handleChange =()=>{
    
      console.log('Its true')
      setIsCorrect(true)
      setIsIncorrect(false)
      changeMArk(true, vQuestion)

    
    
  }

  // incorrect
  const handleChange1 =()=>{
    
    console.log('Its true')
    setIsIncorrect(true)
    setIsCorrect(false)
    changeMArk(false, vQuestion)
  
  // let temForMarking = [...single_Student_Script]
  
  // single_Student_Script[vQuestion].answer1
}



  return (
    <div className='viewScreen'>
      <div className='bg-red-200 w-screen'>

        <div className='scriptsTop'>
          <div>
            <p>Name: {stuScripts[stuIdx].name}</p>
          </div>

          <div>
            <p>Mat_N0: {stuScripts[stuIdx].mat_no}</p>
          </div>

          <div>
            <p>Course: {stuScripts[stuIdx].course_code}</p>
          </div>

          <div>
            <p>Course_Code: {stuScripts[stuIdx].course_title}</p>
          </div>
        </div>

        <div className='flex'>
          
          <div className='flex-col flex-1'>
            <p className='cardTitle'>Question</p>

            <div className='rectangle4 overflow-y-scroll pl-1 pr-1 pt-1'>
              <p>
                {single_Student_Script[vQuestion].QUESTION}    
                {/* Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias earum numquam perferendis, dolorem eaque itaque, reprehenderit culpa tempore odio a dicta atque ratione ea quod sit quia in incidunt aperiam?  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias earum numquam perferendis, dolorem eaque itaque, reprehenderit culpa tempore odio a dicta atque ratione ea quod sit quia in incidunt aperiam? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias earum numquam perferendis, dolorem eaque itaque, reprehenderit culpa tempore odio a dicta atque ratione ea quod sit quia in incidunt aperiam?  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias earum numquam perferendis, dolorem eaque itaque, reprehenderit culpa tempore odio a dicta atque ratione ea quod sit quia in incidunt aperiam? */}
              </p>
            </div>
          </div>

          <div className='flex-col flex-1'>
            <p className='cardTitle'>Answer</p>

            <div className='rectangle4 overflow-y-scroll pl-1 pr-1 pt-1'>
              <p>{single_Student_Script[vQuestion].ANSWER}</p>
            </div>
          </div>

          <div className='flex-col flex-1'>
            <p className='cardTitle'>Student Answer</p>

            <div className='rectangle4 overflow-y-scroll pl-1 pr-1 pt-1'>
              <p>{single_Student_Script[vQuestion].answer1}</p>
            </div>
          </div>
        </div>

        <div className='flex mt-4 justify-end pr-16'>

          <div className='flex items-center'>
            <p className='text-black text-2xl'>Correct</p>
            <input type="checkbox"
              name='correct' 
              className='bg-gray-400 w-10 h-16 mr-3 ml-3 rounded-xl'
              checked={isCorrect}
              onChange={handleChange}
            />
          </div>

          <div className='flex items-center'>
            <p className='text-black text-2xl'>InCorrect</p>
            <input type="checkbox"
              name='inCorrect' 
              className='bg-gray-400 w-10 h-16 mr-3 ml-3 rounded-xl'
              checked={isIncorrect}
              onChange={handleChange1}
            />
          </div>
          
        </div>

        <div className='flex justify-center'>
          <button onClick={()=>prevQuestion()} className='bg-gray-400 w-16 h-14 mr-3 rounded-xl flex items-center justify-center'>
            <FaChevronLeft size={30}/>
          </button>

          <button onClick={()=>nextQuestion()} className='bg-gray-400 w-16 h-14 ml-3 rounded-xl flex items-center justify-center'>
            <FaChevronRight size={30}/>
          </button>
        </div>


        {/* <div className='bg-slate-500 w-full h-full'>
        <div className=' rounded h-40 bg-gray-300 p-2 w-64 m-4 flex-grow'>
            <p className='text-xl'>Marked</p>
          </div>
          
        </div> */}
        {/*  */}
      </div>
    </div>
  )
}

export default ExamScript