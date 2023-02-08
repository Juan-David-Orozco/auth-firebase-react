import { useAuth } from '../context/authContext'

export function Home() {

  const { user, logout, loading } = useAuth()

  const handleLogout = async () => {
    await logout()
  }

  if(loading) return <h1>Loading</h1>

  return (
    <div>
      <h2>Home</h2>
      <p>Welcome: {user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )

}