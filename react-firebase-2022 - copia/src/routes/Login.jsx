import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import { UserContext } from '../context/UserProvider'

const Login = () => {

    const { user, setUser } = useContext(UserContext)

    const navegate = useNavigate();
    const handleClickLogin = () => {
        setUser(true);
        navegate("/");
    }
    return (
        <div>
            <h1>Login</h1>
            <h2>
                {user ? "En linea" : "offline"}

            </h2>
            <button onClick={handleClickLogin}>Acceder</button>
        </div>
    )
}

export default Login