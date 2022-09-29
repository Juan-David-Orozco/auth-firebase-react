import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Register } from "./components/Register";

export default function App() {
  return (
    <div className="container bg-secondary text-white">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={ <Register/>}/>
        </Routes>
      </AuthProvider>
    </div>
  )
}
