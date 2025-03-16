'use client'
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { decodeJWT } from "@/lib/jwtDecoded";
import { useAuthContext } from "@/context/AuthContext";

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const {dispatch} = useAuthContext();

    useEffect(() => {
        const accessToken = Cookies.get("accessToken");
        if (!accessToken) {
            setIsAuthenticated(false);
        } else {
            const decoded = decodeJWT(accessToken as string);
            if (decoded) {
                dispatch({ type: "SET_AUTH", payload: { id: decoded.userId, email: decoded.email } });
                setIsAuthenticated(true);
            }
        }
    }, [dispatch]);

    return isAuthenticated;
};

export default useAuth; 