import { Navigate } from "react-router-dom"


export function PrivateRoute({children}){
    const GITHUB_STORAGE_KEY = 'KEY_GITHUB'
    const key = localStorage.getItem(GITHUB_STORAGE_KEY)

    
    return key ? children : <Navigate to="/"/>
}