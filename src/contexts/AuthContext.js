import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase'
import {db} from '../firebase'
import { ref, set } from "firebase/database";
const AuthContext = React.createContext()

// This useAuth hook allows you to use AuthContext created above
export const useAuth = () => {
    return useContext(AuthContext)
    }

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    
    const signup = (email, password, name) => {
        return auth.createUserWithEmailAndPassword(email, password).then(function(result) {
            set(ref(db, 'users/'+ result.user.uid), {email:result.user.email, name:name})
            return result.user.updateProfile({displayName: name})
        })
    }

    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)
    }

    const logout = () => {
        return auth.signOut()
    }

    const resetPassword = (email) => {
        return auth.sendPasswordResetEmail(email)
    }

    useEffect(()=> {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const value = {currentUser, signup, login, logout, resetPassword }



return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}