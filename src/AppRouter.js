import React, {useContext} from 'react'
import AuthContext from "./contexts/auth/AuthContext";
import {BrowserRouter, HashRouter, Navigate, Route, Routes} from "react-router-dom";
import { privateRoutes, publicRoutes } from './routes';

const AppRouter = () => {

    const {authContextData} = useContext(AuthContext)

    return (
        <HashRouter>{
            authContextData.isAuth
                ?
                <Routes>
                    {privateRoutes.map(route => 
                        <Route element={route.element} path={route.path} key={route.path}/>
                    )}
                    <Route path='*' element={<Navigate to="/chat"/>}></Route>
                </Routes>
                :
                <Routes>    
                    {publicRoutes.map(route => 
                        <Route element={route.element} path={route.path} key={route.path}/>
                    )}
                    <Route path='*' element={<Navigate to="/login"/>}></Route>
                </Routes>
            }
        </HashRouter>
    )
}

export default AppRouter