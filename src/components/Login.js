import { useState } from 'react'
import { useAuth } from '../context/authContext'
import { useNavigate } from 'react-router-dom'
import { Alert } from './Alert'

export function Login() {

  const [user, setUser] = useState({
    email: '', password: ''
  })

  const [error, setError] = useState()

  const { login, loginWithGoogle } = useAuth()

  const navigate = useNavigate()

  const handleChange = ({target: {name, value}}) => {
    setUser({...user, [name]: value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      console.log(user.email, user.password)
      await login(user.email, user.password)
      navigate("/")
    } catch (error) {
      console.log(error.code)
      if(error.code === 'auth/invalid-email')
        setError("Correo invalido")
      else if(error.code === 'auth/weak-password')
        setError("Password menor de 6 caracteres")
      else setError(error.message)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      //throw new Error("google error")
      await loginWithGoogle()
      navigate("/")
    } catch (error) {
      setError(error.message)
    }
  }

  return(
    <div>
      <h2>Login</h2>
      {error && <Alert message={error}/>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input 
          type="email" name="email" 
          id="email" placeholder="email@example.com" 
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input 
          type="password" name="password" 
          id="password" placeholder="******" 
          onChange={handleChange}
        />
        <button>Login</button>
      </form>

      <button onClick={handleGoogleLogin}>Google Login</button>

    </div>
  )
}