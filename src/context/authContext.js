import { useContext, createContext, useEffect, useState } from 'react'
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
 } from 'firebase/auth'
import { auth } from '../firebase'

const authContext = createContext()

export const useAuth = () => {
  const context = useContext(authContext)
  if(!context) throw new Error("There is not auth provider")
  return context
}

export function AuthProvider({children}) {

  const [user, setUser] = useState(null)

  const [loading, setLoading] = useState(true)

  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = () => {
    return signOut(auth)
  }

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider()
    return signInWithPopup(auth, googleProvider)
  }

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email)
  }

  useEffect(() => {
    //console.log('Auth provider loaded')
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      setLoading(false)
    })
    return () => unsubscribe()
  },[])

  return (
    <authContext.Provider 
      value={{ register, login, user, logout, loading, loginWithGoogle, resetPassword }}
    >
      {children}
    </authContext.Provider>
  )
}