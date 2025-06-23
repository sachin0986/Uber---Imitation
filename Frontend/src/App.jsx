import { Routes, Route } from "react-router-dom";
import Start from './pages/Start';
import UserSignup from './pages/UserSignup';
import UserLogin from './pages/UserLogin';
import CaptainLogin from './pages/CaptainLogin';
import CaptainSignup from './pages/CaptainSignup';
import Home from "./pages/Home";
import UserProtectedWrapper from "./pages/UserProtectedWrapper";



const App = () => {
  return(
    <div>
      <Routes>
          <Route path="/start" element={<Start />}/>
          <Route path="/user-login" element={<UserLogin />}/>
          <Route path="/user-signup" element={<UserSignup />}/>
          <Route path="/captain-login" element={<CaptainLogin />}/>
          <Route path="/captain-signup" element={<CaptainSignup />}/>
          <Route path="/home" element={<UserProtectedWrapper>
            <Home />
          </UserProtectedWrapper>}/>
      </Routes>
    </div>
  )
}

export default App;