import React,{createContext, useState} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{

    const [studentName, setStudentName] = useState('')
    const [matNo, setMatNo] = useState('')
    const [admDet, setAdmDet] = useState({})
    const [stuScripts, setStuScripts] = useState([])
    // For Exam
    const [fetchedScript, setFetchedScript] = useState([])
    const [scriptCridentials, setScriptCridentials] = useState({course_title:'', course_code:''})
    const [exmLoggedIn, setExmLoggedIn] = useState(false)
    const [timeLeft, setTimeLeft] = useState(0)
    const [timeLeft1, setTimeLeft1] = useState(0)


    return(
        <AuthContext.Provider
            value={{
                studentName,
                setStudentName,
                matNo,
                setMatNo,
                admDet, 
                setAdmDet,
                stuScripts, 
                setStuScripts,
                fetchedScript, 
                setFetchedScript,
                exmLoggedIn, 
                setExmLoggedIn,
                scriptCridentials, 
                setScriptCridentials,
                timeLeft, setTimeLeft,
                timeLeft1, setTimeLeft1,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
