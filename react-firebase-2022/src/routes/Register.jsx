import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router';
import { UserContext } from '../context/UserProvider';
import { useForm } from 'react-hook-form';
import { erroresFirebase } from '../utils/erroresFirebase';
import { formValidate } from '../utils/formvalidate';

import FormError from '../components/FormError';
import FormInput from '../components/FormInput';

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
            setError("firebase", {
                message: erroresFirebase(error.code),
            })
        }
    }

    return (
        <>
            <h1>Register</h1>
            <FormError error={errors.firebase} />
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    type="email"
                    placeholder="Ingrese email"
                    {...register("email", {
                        required,
                        pattern: patternEmail,
                    })}
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
                >
                    <FormError error={errors.password} />
                </FormInput>
                <FormInput
                    type="password"
                    placeholder="Ingrese repassword"
                    {...register("repassword", {
                        validate: validateEquals(getValues),
                    })}
                >
                    <FormError error={errors.repassword} />
                </FormInput>
                <button type="submit">Register</button>
            </form>
        </>
    )
}

export default Register