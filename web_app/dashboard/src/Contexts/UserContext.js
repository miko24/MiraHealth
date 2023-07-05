import React, {createContext, useEffect, useState} from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(()=>{
        if (localStorage.getItem("user")) {
            return JSON.parse(localStorage.getItem("user"));
        }else {
            return null;
        }
    });

    // useEffect(() => {
    //     if (localStorage.getItem("user")) {
    //         setCurrentUser(JSON.parse(localStorage.getItem("user")));
    //     }
    // }, []);

    const updateUser = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        setCurrentUser(user);
    };

    const logout = ()=>{
        localStorage.removeItem("user");
        setCurrentUser(null);
    }

    return (
        <UserContext.Provider value={{ currentUser, updateUser,logout }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
