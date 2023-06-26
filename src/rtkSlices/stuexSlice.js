import { createSlice, createAsyncThunk, original } from "@reduxjs/toolkit";

export const fetchExamQns = createAsyncThunk("questions/getQuestions", async (stuMatNo)=>{
    console.log(stuMatNo)
    return fetch('http://127.0.0.1:5000/getquestions', {
        method: 'POST',
        headers: {
          //Header Defination
          'Accept':'application/json',
          'Content-Type':'application/json',
        },
        body: JSON.stringify({
          "mat_no": stuMatNo,
        })
      })
      .then((response) => response.json())
})

const randomStepper =(maxNr)=>{
    let haveIt = []

    function generateUniqueRandom(maxNr) {
        //Generate random number
        let random = (Math.floor(Math.random() * maxNr) + 1).toFixed();

        //Coerce to number by boxing
        random = Number(random);

        if(!haveIt.includes(random)) {
            haveIt.push(random);
            return random;
        } else {
            if(haveIt.length < maxNr ) {
            //Recursively generate number
            return  generateUniqueRandom(maxNr);
            } else {
            console.log('No more numbers available.')
            return false;
           }
        }
    }

    for(let i = 0; i<maxNr; i++){
        generateUniqueRandom(maxNr)
    }

    return haveIt;
}

const studentSlice = createSlice(({
    name:"student",
    initialState:{
       qns:[],
       stuName:"",
       stuMatNo:"",
       course_code:"",
       course_title:"",
       timeLeft1:0,
       loading:false,
       error:null,
       loggedIn:false
    },
    reducers:{
        addName(state,action){
            state.stuName = action.payload.name
            console.log(state.stuName)
            return state
        },
        addMatNo(state,action){
            state.stuMatNo = action.payload.mat_no
            return state
        },
        addANswer(state,action){
            state.qns[action.payload.aIndex].answer1 = action.payload.stuAnswer
            // console.log(original(state.qns))
            return state
        },
        updateTimeLeft(state,action){
            state.timeLeft1 = action.payload
            console.log(action.payload)
            return state
        }
    },
    extraReducers:{
        [fetchExamQns.pending]:(state, action) =>{
            state.loading = true;
        },
        [fetchExamQns.fulfilled]:(state, action) =>{
            state.loading = false;
            if(action.payload.status === 'Collection Successful!'){
                state.course_code = action.payload.qns.course_code
                state.course_title = action.payload.qns.course_title
                state.timeLeft = action.payload.qns.timeLeft

                // get random numbers for the questions
                let randomArr = [...randomStepper(action.payload.qns.qandn.length)]

                //  create a temporaty array
                let tempArrQuestions = [...action.payload.qns.qandn]

                //  map the questions to the random numbers
                for(let i =0; i < tempArrQuestions.length; i++){
                    tempArrQuestions[i]["randq"] = randomArr[i]
                }
                // sort the array in order of the random number
                tempArrQuestions.sort(function(a, b){
                    return a.randq - b.randq
                })

                state.qns = tempArrQuestions

                state.loggedIn = true

                return state
            }
            else if(action.payload.status === 'Collection loaded'){
                state.stuName = action.payload.qns.name
                state.stuMatNo = action.payload.qns.mat_no
                state.course_code = action.payload.qns.course_code
                state.course_title = action.payload.qns.course_title
                state.timeLeft = action.payload.qns.timeLeft

                // get random numbers for the questions
                let randomArr = [...randomStepper(action.payload.qns.qandn.length)]

                //  create a temporaty array
                let tempArrQuestions = [...action.payload.qns.qandn]

                //  map the questions to the random numbers
                for(let i =0; i < tempArrQuestions.length; i++){
                    tempArrQuestions[i]["randq"] = randomArr[i]
                }
                // sort the array in order of the random number
                tempArrQuestions.sort(function(a, b){
                    return a.randq - b.randq
                })

                state.qns = tempArrQuestions

                state.loggedIn = true
                
                return state;
            }
        },
        [fetchExamQns.rejected]:(state, action) =>{
            state.loading = false;
        },
    }
}))

// Export all questions
export const selectAllQuestions = (state) => state.student.qns;

// Functions from the slice
export const {addName, addMatNo, addANswer, updateTimeLeft} = studentSlice.actions;

export default studentSlice.reducer;