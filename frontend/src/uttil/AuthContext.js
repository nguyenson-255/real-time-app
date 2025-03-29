import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    // Save token in localStorage when it changes
    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }, [token]);

    // Login function
    const loginToken = (newToken) => {
        setToken(newToken);
    };

    // Logout function
    const logoutToken = () => {
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, loginToken, logoutToken }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for easy access
export const useAuth = () => useContext(AuthContext);
