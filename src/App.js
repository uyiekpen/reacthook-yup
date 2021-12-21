import Home from "./Comp/Home";
import {BrowserRouter ,Routes,Route} from "react-router-dom"
import RegisterComp from "./Comp/RegisterComp";
import Header from "./Comp/Header";

function App() {
  return (
    <BrowserRouter>
        <Header/>
      <Routes>
        <Route path ="/" element={<Home/>}/>
        <Route path="/register" element={<RegisterComp/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
