import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router';
import { UserContext } from '../context/UserProvider';

const Register = () => {

    const [email, setEmail] = useState('mauromaravilla@gmail.com');
    const [password, setPassword] = useState('123123')

    const navegate = useNavigate();

    const { registerUser } = useContext(UserContext);

    const handlerSubmit = async (e) => {
        e.preventDefault();
        console.log('procesando form: ', email, password);
        try {
            await registerUser(email, password);
            console.log('Usuario creado');
            navegate("/")
        } catch (error) {
            console.log(error.code);
            alert('Este email ya esta registrado')
        }
    }

    return (
        <>
            <h1>Register</h1>
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
                <button type="submit">Register</button>
            </form>
        </>
    )
}

export default Register