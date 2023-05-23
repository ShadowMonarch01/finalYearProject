import React,{createContext, useState} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{

    const [studentName, setStudentName] = useState('')
    const [matNo, setMatNo] = useState('')
    const [admName, setAdmName] = useState('')


    return(
        <AuthContext.Provider
            value={{
                studentName,
                setStudentName,
                matNo,
                setMatNo,
                admName,
                setAdmName
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
