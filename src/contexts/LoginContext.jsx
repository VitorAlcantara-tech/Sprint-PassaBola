import {createContext} from "react"
import useLoginAcess from '@/componentes/hooks/useLoginAcess'

export const LoginContext = createContext()

export function LoginProvider({children}) {
    const {user, login} = useLoginAcess()
    return (
        <LoginContext.Provider value={{user, login}}>
            {children}
        </LoginContext.Provider>
    )
}
