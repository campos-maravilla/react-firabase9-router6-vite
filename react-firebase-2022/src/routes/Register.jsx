import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router';
import { UserContext } from '../context/UserProvider';
import { useForm } from 'react-hook-form';
import { erroresFirebase } from '../utils/erroresFirebase';
import { formValidate } from '../utils/formvalidate';

import FormError from '../components/FormError';
import FormInput from '../components/FormInput';
import Title from '../components/Title';
import Button from '../components/Buttons';

const Register = () => {

    /*  const [email, setEmail] = useState('mauromaravilla@gmail.com');
     const [password, setPassword] = useState('123123') */

    const navegate = useNavigate();
    const { registerUser } = useContext(UserContext);
    const { required, patternEmail, minLength, validateTrim, validateEquals } = formValidate();

    const { register, handleSubmit, formState: { errors },
        getValues,
        setError,
    } = useForm();

    const onSubmit = async ({ email, password }) => {

        try {
            await registerUser(email, password);

            navegate("/")
        } catch (error) {
            console.log(error.code);
            const { code, message } = erroresFirebase(error.code);
            setError(code, { message });
        }
    }

    return (
        <>
            <Title text="Register" />
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    type="email"
                    placeholder="Ingrese email"
                    {...register("email", {
                        required,
                        pattern: patternEmail,
                    })}
                    label="Ingresa tu correo"
                    error={errors.email}
                >
                    <FormError error={errors.email} />
                </FormInput>
                <FormInput
                    type="password"
                    placeholder="Ingrese password"
                    {...register("password", {
                        minLength,
                        validate: validateTrim,
                    })}
                    label="Ingresa tu password"
                    error={errors.password}
                >
                    <FormError error={errors.password} />
                </FormInput>
                <FormInput
                    type="password"
                    placeholder="Ingrese repassword"
                    {...register("repassword", {
                        validate: validateEquals(getValues("password")),
                    })}
                    label="Repite contraseña"
                    error={errors.repassword}
                >
                    <FormError error={errors.repassword} />
                </FormInput>
                <Button text="Register" type="submit" />
            </form>
        </>
    )
}

export default Register