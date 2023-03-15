import { useState } from "react"
import { useNavigate } from "react-router-dom"

const AuthForm = (props) => {

    const [register, setRegister] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const sendAuthentification = async () => {
        const baseUrl = "http://localhost:9999/api"
        const endPoint = register ? '/register' : '/login'

        const response = await fetch(baseUrl + endPoint, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ email, password })
        })

        if (response.ok) register ? setRegister(false) : navigate('/dashboard')

        // fetch(`${process.env.REACT_APP_BACKEND_URL}/${register?'register':'login'}`)
    }
    return (
        <div>
            <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="z.B. batman@gotham.gcpd" />
            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="sicheres Password" />
            <button onClick={sendAuthentification}>{register ? 'Registrieren' : 'Login'}</button>
            <p onClick={() => setRegister(prev => !prev)}>{register ? 'Du willst dich lieber einloggen?' : 'Magst du dich registrieren?'}</p>
        </div>
    )
}

export default AuthForm