import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { UserContext } from '../context/UserProvider'

const Login = () => {

    const [email, setEmail] = useState('mauromaravilla@gmail.com');
    const [password, setPassword] = useState('123123')

    const { loginUser } = useContext(UserContext)

    const navegate = useNavigate();

    const handlerSubmit = async (e) => {
        e.preventDefault();
        console.log('procesando form: ', email, password);
        try {
            await loginUser(email, password);
            console.log('Usuario logueado');
            navegate("/")
        } catch (error) {
            console.log(error.code);

        }
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handlerSubmit}>
                <input type="email"
                    placeholder="Ingrese email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input type="password"
                    placeholder="Ingrese password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login