/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState, useEffect } from 'react'
import { useNavigation } from 'src/hooks/useNavigation'
import { Inventory } from 'src/@types/inventory'
import { auth, firebase } from 'src/services/firebase'

export const AuthContext = createContext({} as Inventory.AuthContextData)

export function AuthProvider({ children }: Inventory.ProviderProps) {
    const { changeCurrentComponent } = useNavigation()
    const [user, setUser] = useState<Inventory.User>()

    async function handleLogout() {
        if (user) {
            await firebase.auth().signOut()
            setUser(undefined)
            changeCurrentComponent('Login')
        }
    }

    async function handleLoginWithGoogle() {
        const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
        const { user } = await auth.signInWithPopup(googleAuthProvider)

        if (user) {
            const { uid, displayName, photoURL } = user
            
            if(!displayName || !photoURL) throw new Error('Invalid user')

            setUser({
                id: uid,
                avatar: photoURL,
                name: displayName
            })

            changeCurrentComponent('ProductList')
        }
    }

    // async function handleLoginWithGithub() {
    //     const githubAuthProvider = new firebase.auth.GithubAuthProvider()
    //     const { user } = await auth.signInWithPopup(githubAuthProvider)

    //     if (user) {
    //         const { uid, displayName, photoURL } = user
                
    //         if(!displayName || !photoURL) throw new Error('Invalid user')

    //         setUser({
    //             id: uid,
    //             avatar: photoURL,
    //             name: displayName
    //         })
    //
    //         changeCurrentComponent('ProductList')
    //     }
    // }

    async function handleSignUpWithEmailAndPassword(email: string, password: string) {
        const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password)
        
        if (user) {
            const { uid, displayName, photoURL } = user
            
            if(!displayName || !photoURL) {
                throw new Error('Invalid user')
            }

            setUser({
                id: uid,
                avatar: photoURL,
                name: displayName
            })

            changeCurrentComponent('ProductList')

        }
    }

    async function handleLoginWithEmailAndPassword(email: string, password: string) {
        const { user } = await auth.signInWithEmailAndPassword(email, password)

        if (user) {
            const { uid, displayName, photoURL } = user
            
            if(!displayName || !photoURL) throw new Error('Invalid user')

            setUser({
                id: uid,
                avatar: photoURL,
                name: displayName
            })

            changeCurrentComponent('ProductList')

        }
    }
    
    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user=> {
            if (user) {
                const { uid, displayName, photoURL } = user
                
                if(!displayName || !photoURL) throw new Error('Invalid user')

                setUser({
                    id: uid,
                    avatar: photoURL,
                    name: displayName
                })

                changeCurrentComponent('ProductList')
                
            }
        })

        return ()=>{
            unsubscribe()
        }
    }, [])

    return (
        <AuthContext.Provider value={{
            user,
            handleLoginWithGoogle,
            // handleLoginWithGithub,
            handleLoginWithEmailAndPassword,
            handleSignUpWithEmailAndPassword,
            handleLogout
        }}>
            {children}
        </AuthContext.Provider>
    )
}