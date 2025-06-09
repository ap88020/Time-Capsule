import { useContext , createContext, Children, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({Children}) => {
    const [user, setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    const backendurl = import.meta.env.BACKEND_URL;

    const login = async (email,password) => {
        const res = await axios.post(backendurl+'/api/user/login',{email,password});
        setUser(res.data.user);
        console.log(res);
        console.log(res.data.user);
    }

    const register = async (userData) => {
        const res = await axios.post(backendurl+'/api/user/login',userData);
        setUser(res.data.user);

    }

    const logout = async () => {
        await axios.post(backendurl+'api/user/logout');
        setUser(null);
    }

    const checkAuth = async () => {
        try {
            const res = await axios.get(backendurl+'api/user/check');
            setUser(res.data.user);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
      checkAuth();
    }, []);
    
    return (
        <AuthContext.Provider value={{user,login,register,logout,checkAuth,loading}}>
            {Children}
        </AuthContext.Provider>
    )
} 

export const useAuth = () => useContext(AuthContext);