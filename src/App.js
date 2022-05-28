import logo from "./logo.svg";
import "./App.css";
import { createBrowserHistory } from "history";
import Home from "./components/Home";
import {
  BrowserRouter,
  Link,
  Route,
  Router,
  Routes,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";

let history = createBrowserHistory();

function App() {
  return (
    // <BrowserRouter >
    //   <div>
    //     <Routes>
    //       <Route path="/" element={<HomePage/>} />
    //     </Routes>
    //   </div>
    // </BrowserRouter>
    <HomePage/>
    
  );
}

function HomePage(){
  return (
    <div className="App">
      <Home/>
    </div>
  )
}

export default App;
