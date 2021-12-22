import {BrowserRouter ,Routes,Route} from "react-router-dom"
import RegisterComp from "./Comp/RegisterComp";
import Header from "./Comp/Header";
import Signin from "./Comp/Signin";
import PrivateRoute from "./Comp/PrivateRoute";
import MainPage from "./Comp/MainPage";

function App() {
  return (
    <BrowserRouter>
        <Header/>
      <Routes>
        <Route path="/" element={<PrivateRoute>
          <MainPage/>
        </PrivateRoute>}/>

        <Route path="/register" element={<RegisterComp/>}/>
        <Route path="/Signin" element={<Signin/>}/>
       


        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
