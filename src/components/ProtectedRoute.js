import { useAuth } from '../context/authContext'
import { Navigate } from 'react-router-dom'

export function ProtectedRoute({children}) {

  const { user, loading } = useAuth()

  if(loading) 
    return (
      <div className='bg-white w-full max-w-xs m-auto text-center px-3 py-4 rounded'>
        <h1 className='font-bold'>Loading</h1>
      </div>
    )

  if(!user) return <Navigate to={'/login'} />

  return <>{children}</>
}
