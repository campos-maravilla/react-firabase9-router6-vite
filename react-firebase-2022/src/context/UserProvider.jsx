import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(false)

    //los va a traer el user autenticado
    useEffect(() => {
        const onsuscribe = onAuthStateChanged(auth, (user) => {
            console.log(user);
            if (user) {
                const { email, photoURL, displayName, uid } = user
                setUser(email, photoURL, displayName, uid)
            } else {
                setUser(null)
            }
        })

        return () => onsuscribe()
    }, [])

    const registerUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);

    const loginUser = (email, password) => signInWithEmailAndPassword(auth, email, password)

    const signOutUser = () => signOut(auth)


    return (

        <UserContext.Provider value={{ user, setUser, registerUser, loginUser, signOutUser }}>
            {children}
        </UserContext.Provider>
    )

}


export default UserProvider;