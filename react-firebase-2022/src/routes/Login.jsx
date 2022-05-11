import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import Button from '../components/Buttons'
import FormError from '../components/FormError'
import FormInput from '../components/FormInput'
import Title from '../components/Title'
import { UserContext } from '../context/UserProvider'
import { erroresFirebase } from '../utils/erroresFirebase'
import { formValidate } from '../utils/formvalidate'

const Login = () => {



    const { loginUser } = useContext(UserContext)

    const navegate = useNavigate();
    const { required, patternEmail, minLength, validateTrim } = formValidate();

    const { register, handleSubmit, formState: { errors },

        setError,
    } = useForm();

    const onSubmit = async ({ email, password }) => {

        try {
            await loginUser(email, password);

            navegate("/")
        } catch (error) {
            console.log(error.code);
            const { code, message } = erroresFirebase(error.code);
            setError(code, { message });
        }
    }

    return (
        <div>
            <Title text="Login" />
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    label="Ingresa tu correo"
                    type="email"
                    placeholder="Ingrese email"
                    {...register("email", {
                        required,
                        pattern: patternEmail,
                    })}
                    error={errors.email}
                >
                    <FormError error={errors.email} />
                </FormInput>
                <FormInput
                    label="Ingresa tu contraseña"
                    type="password"
                    placeholder="Ingrese password"
                    {...register("password", {
                        minLength,
                        validate: validateTrim,
                    })}
                    error={errors.password}
                >
                    <FormError error={errors.password} />
                </FormInput>
                <Button text="Login" type="submit" />
            </form>
        </div>
    )
}

export default Login