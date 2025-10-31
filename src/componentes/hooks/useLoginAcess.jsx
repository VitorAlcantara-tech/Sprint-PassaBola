import { useState } from "react";

const useLoginAcess = () => {
    const [user, setUser] = useState(false)
    
    const login = (email, senha) => {
        const profiles = JSON.parse(localStorage.getItem("profiles") || "[]");
        let userFound = false
        console.log(profiles)

        if (email == 'admin@gmail.com' && senha == 'admin'){
            userFound = null
        } else {if (profiles.find((p) => p.email === email && p.senha === senha)) {userFound=true}}
        
        setUser(userFound)
        return userFound
    }
    return { user, login }
}

export default useLoginAcess