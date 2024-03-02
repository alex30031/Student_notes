import "./App.css";
import LoginSignup from "./Components/LoginSignup/LoginSignup";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<LoginSignup />} />
      </Routes>
    </Router>
  );
}

export default App;
