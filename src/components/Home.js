import { useAuth } from '../context/authContext'

export function Home() {

  const { user, logout, loading } = useAuth()

  console.log(user)

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.log(error)
    }
  }

  if(loading) return <h1>Loading</h1>

  return (
    <div>
      <h2>Home</h2>
      <p>Welcome: {user.displayName || user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )

}