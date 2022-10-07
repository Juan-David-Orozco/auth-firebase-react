import { useState } from 'react'

export function Register() {

  const [user, setUser] = useState({
    email: '', password: ''
  })

  const handleChange = ({target: {name, value}}) => {
    console.log(name, value)
    setUser({...user, [name]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(user)
  }

  return(
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input 
          type="email" name="email" 
          id="email" placeholder="email@example.com" 
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input 
          type="password" name="password" id="password" 
          onChange={handleChange}
        />
        <button>Register</button>
      </form>
    </div>
  )
}