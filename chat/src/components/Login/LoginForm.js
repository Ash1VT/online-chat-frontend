import React, { useContext } from 'react'
import { useRef } from 'react';
import "../Login/Login.css";
import AuthService from '../../services/AuthService';
import AuthContext from '../../contexts/auth/AuthContext';
import useRequest from '../../hooks/useRequest';
import { getUserInformationFromAccessToken } from '../../utils/user';

const LoginForm = () => {
    const username = useRef() // ссылка на username 
    const password = useRef() // ссылка на пароль
    
    const {authContextData} = useContext(AuthContext)
    
    const [isLoading, login] = useRequest(async (username, password) => {
        const response = await AuthService.login(username, password)

        if(!response.correct){
            if(response.status === 400)
                alert(`username: ${response.data.username} password: ${response.data.password}`)
            else {
                alert(response.data.detail)
            }
            return
        }

        const userData = getUserInformationFromAccessToken()

        authContextData.setIsAuth(response.correct)
        authContextData.setUsername(userData.username)
        authContextData.setUserId(userData.userId)
    })

    const handleSubmit = async (event) => {       //обработка нажатия кнопки регистрации
        event.preventDefault();

        const usernameValue = username.current.value
        const passwordValue = password.current.value

        await login(usernameValue, passwordValue)
    }
    


    return (
        <div className="container-center-horizontal x3 screen">
            <form onSubmit={handleSubmit}>
                <div className='login-form'>
                    <div className="username-group group abel-normal-baltic-sea-20px">
                        <span className="abel-normal-baltic-sea-20px">Login</span>
                        <input 
                            type="text" 
                            className="input-1" 
                            ref={username}
                            required/> 
                    </div>
                    

                    <div className="password-group group abel-normal-baltic-sea-20px">
                        <span className="abel-normal-baltic-sea-20px">Password</span>
                        <input 
                            type="password" 
                            className="input-2" 
                            ref={password}
                            required/>
                    </div>
                    
                    <button type="submit" className="button-1 valign-text-middle">
                        <span className="abel-normal-white-20px">Login</span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm