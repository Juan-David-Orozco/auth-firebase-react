import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { ProtectedRoute } from "./components/ProtectedRoute";

export default function App() {
  return (
    <div className="bg-slate-500 h-screen text-black flex">
      <AuthProvider>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>
          }/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </AuthProvider>
    </div>
  )
}
