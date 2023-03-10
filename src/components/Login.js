import { useState } from 'react'
import { useAuth } from '../context/authContext'
import { Link, useNavigate } from 'react-router-dom'
import { Alert } from './Alert'

export function Login() {

  const [user, setUser] = useState({
    email: '', password: ''
  })

  const [error, setError] = useState()

  const { login, loginWithGoogle, resetPassword } = useAuth()

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

  const handleResetPassword = async () => {
    if(!user.email) return setError("Please insert your password")
    try {
      await resetPassword(user.email)
      setError('We sent you an email with a link to reset your password')
    } catch (error) {
      setError(error.message)
    }
  }

  return(
    <div className='w-full max-w-xs m-auto'>
      <h1 className='text-center font-bold my-2'>Login</h1>
      {error && <Alert message={error}/>}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 py-6 mb-4">
        <div className="mb-4">
          <label htmlFor="email" className='block text-gray-700 text-sm font-bold'>Email</label>
          <input 
            type="email" name="email" 
            id="email" placeholder="email@example.com" 
            className="shadow appearance-none border rouded w-full py-2 px-3
            text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className='block text-gray-700 text-sm font-bold'>Password</label>
          <input 
            type="password" name="password" 
            id="password" placeholder="******" 
            className="shadow appearance-none border rouded w-full py-2 px-3
            text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleChange}
          />
        </div>
       <div className='flex items-center justify-between'>
          <button className='bg-indigo-400 hover:bg-indigo-700 rounded-md py-2 
          px-4 text-sm focus:outline-none focus:shadow-outline'>Login</button>

          <a onClick={handleResetPassword} href="#!"
          className='inline-block align-baseline font-bold text-sm 
          text-blue-500 hover:text-blue-700'>Forgot Password?</a>
       </div>

        <p className='mt-6 text-sm flex justify-between px-3'>Don't have an Account? <Link to={'/register'}>Register</Link></p>
      </form>

      <button onClick={handleGoogleLogin} className="bg-slate-50 hover:bg-slate-200 
      rounded px-4 py-2 my-1 border-2 border-gray-200 shadow-md w-full">Google Login</button>

    </div>
  )
}