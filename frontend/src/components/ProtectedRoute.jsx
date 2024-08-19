import { useEffect } from "react"
import { Navigate} from "react-router-dom"
import axios from "axios"
import { useState } from "react";
import { backendUrl } from "../utils/backend";





const ProtectedRoute = ({children}) =>{

    const [isAdmin,setAdmin] = useState(false)
    const [loading, setLoad] = useState(true)

    const hasCookie = async () =>{
        try{
            const token = localStorage.getItem("jwtToken");
            const api = axios.create({
                headers: {
                    "Content-type": "application/json",
                },
            });
            
            // changing to post to not deal with auth
            const checkCookie = await api.post(`${backendUrl}/api/has-permission`, {token: `${token}`})
            const result = checkCookie.data;
            setAdmin(result.authenticated)
            setLoad(false)

        }catch(err){
            console.log(err)

        }
    }

    useEffect(() => {
        hasCookie()
    }, [])
    
    if(loading){
        return
    }

    return(
        isAdmin ? children : <Navigate to="/login" replace/>
    )


}

export default ProtectedRoute
