import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import {Parsexl} from './components/Parsexl';
import ALogin from './components/Admin/ALogin';
import AHome from './components/Admin/AHome';
import SLogin from './components/Student/SLogin';
import SExam from './components/Student/SExam';
import { AuthProvider } from './theAuth/context';
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/parse-xl' element={<Parsexl/>}/>
        <Route path='/alogin' element={<ALogin/>}/>
        <Route path='/ahome/*' element={<AHome/>}/>
        <Route path='/slogin' element={<SLogin/>}/>
        <Route path='/sexam' element={<SExam/>}/>
      </Routes>
    </AuthProvider>
  );
}

export default App;
