import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router';
import { UserContext } from '../context/UserProvider';
import { useForm } from 'react-hook-form';

const Register = () => {

    /*  const [email, setEmail] = useState('mauromaravilla@gmail.com');
     const [password, setPassword] = useState('123123') */

    const navegate = useNavigate();
    const { registerUser } = useContext(UserContext);
    const { register, handleSubmit, formState: { errors },
        getValues,
        setError
    } = useForm();

    const onSubmit = async ({ email, password }) => {
        console.log(email, password);
        //console.log(data);
        /*  e.preventDefault();
         console.log('procesando form: ', email, password); */
        try {
            await registerUser(email, password);
            console.log('Usuario creado');
            navegate("/")
        } catch (error) {
            console.log(error.code);
            switch (error.code) {
                case "auth/email-already-in-use":

                    setError("email", {
                        message: "Usuario ya registrado"
                    })
                    break;
                case "auth/invalid-email":
                    setError("email", {
                        message: "Formato email no valido"
                    });
                    break;
                default:
                    console.log("Ocurrio un error en el server");
            }
        }
    }

    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="email"
                    placeholder="Ingrese email"
                    {...register("email", {
                        required: {
                            value: true,
                            message: 'Campo obligatorio'
                        },
                        pattern: {
                            value: /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
                            message: "Formato de email incorrecto"
                        }
                    })}
                />
                {errors.email && <p>{errors.email.message}</p>}
                <input type="password"
                    placeholder="Ingrese password"
                    {...register("password", {
                        setValueAs: v => v.trim(),
                        minLength: {
                            value: 6,
                            message: 'Minimo 6 carácteres',
                        },
                        validate: {
                            trim: (v) => {
                                if (!v.trim()) return "No seas payaso🤡, escribe algo"
                                true
                            }
                        },
                    })}
                />
                {errors.password && <p>{errors.password.message}</p>}
                <input type="password"
                    placeholder="Ingrese repassword"
                    {...register("repassword", {
                        setValueAs: v => v.trim(),
                        validate: {
                            equals: (v) =>
                                v === getValues("password") || "No coinciden las contraseñas",

                        },
                    })}
                />
                {
                    errors.repassword && <p>{errors.repassword.message}</p>
                }
                <button type="submit">Register</button>
            </form>
        </>
    )
}

export default Register