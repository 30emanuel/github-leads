import './global.scss'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Main } from "./pages/Main";
import { Search } from "./pages/Search";



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/search/:owner/:repository/:token' element={<Search/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
