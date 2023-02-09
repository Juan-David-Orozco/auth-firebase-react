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
    <div className='w-full max-w-xs m-auto'>
      <div className="bg-white rounded shadow-md px-8 py-6 mb-4">
        <h1 className="mb-4 px-2 py-4">Welcome: {user.displayName || user.email}</h1>
        <button onClick={handleLogout} className='bg-red-300 hover:bg-red-500 rounded-md 
        p-2  text-sm w-full focus:outline-none focus:shadow-outline'>Logout</button>  
      </div>
    </div>
  )

}