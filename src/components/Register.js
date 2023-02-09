import { useState } from 'react'
import { useAuth } from '../context/authContext'
import { Link, useNavigate } from 'react-router-dom'
import { Alert } from './Alert'

export function Register() {

  const [user, setUser] = useState({
    email: '', password: ''
  })

  const [error, setError] = useState()

  const { register } = useAuth()

  const navigate = useNavigate()

  const handleChange = ({target: {name, value}}) => {
    setUser({...user, [name]: value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      console.log(user.email, user.password)
      await register(user.email, user.password)
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

  return(
    <div className='w-full max-w-xs m-auto'>
      <h1 className='text-center font-bold my-2'>Register</h1>
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
        
        <button className='bg-gray-400 hover:bg-gray-700 rounded-md p-2 
        text-sm w-full focus:outline-none focus:shadow-outline'>Register</button>

        <p className='mt-6 text-sm flex justify-between px-3'>
          Already have and Account?<Link to={'/login'}>Login</Link>
        </p>
      </form>
    </div>
  )
}