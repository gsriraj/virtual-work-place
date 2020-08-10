import React, { useState, createContext, useReducer } from "react";

export const AuthContext = createContext<any>({});

const authReducer = (state: any, action: any) => {
    if (action.type === 'Login') {
        return true
    } else return false
}

export const AuthContextProvider = (props: any) => {

    const [isAuthenticated, dispatch] = useReducer<any>(authReducer, localStorage.getItem("access_token") ? true : false)

    return (
        <AuthContext.Provider value={{ isAuthenticated, dispatch }}>
            {props.children}
        </AuthContext.Provider>
    )

}