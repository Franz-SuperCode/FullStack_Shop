import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./AuthForm.css"

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


    }
    return (
      <div class="container">
        <div class="brand-logo"></div>
        <div class="brand-title">Hotel Shop</div>
        <div class="inputs">
          <label>EMAIL</label>
          <input
            type="email"
            placeholder="z.B. batman@gotham.de"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>PASSWORT</label>
          <input
            type="password"
            placeholder="sicheres Passwort"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={sendAuthentification}>
            {register ? "Registrieren" : "Login"}
          </button>
          <p className="text_acc" onClick={() => setRegister((prev) => !prev)}>
            {register
              ? "Account vorhanden?"
              : "Noch keinen Account?"}
          </p>
        </div>
      </div>
    );
}

export default AuthForm