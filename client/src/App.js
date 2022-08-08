import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./auth/login";
import Signup from "./auth/signup";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
